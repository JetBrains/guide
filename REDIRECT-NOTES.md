# Redirect All Content

We need to redirect all HTML content on the site to `https://www.jetbrains.com/guide/shutdown/`.

## Requirements

- All content should do a redirect
- Except requests to that `shutdown` page
- We should not redirect static asset requests such as CSS/JS/Images

## Notes from Mukul

1. Create a file named notify.yaml in the directory deployment/helm/guide-charts/templates/cm. The file should be similar to redirect.yaml—copy its contents, but replace redirect.conf with notify.conf and guideRedirect with NotifyRedirect.
2. Next, open values.yaml located at deployment/helm/guide-charts/values.yaml. You will see a variable named guideRedirect. Similarly, create a new variable called NotifyRedirect and add the Nginx redirection rules there.
3. Next, navigate to deployment/helm/env and update both prod.yaml and stage.yaml with the changes you made in step 2.
4. Everything is set up now. The next step is to test and ensure the redirection rules are working properly and that they do not conflict with the older redirect rules we fixed earlier, if you remember.

## Deployment Architecture

### How the site is served

- Static site built with Eleventy 3 + Vite, output to `_site/`
- Served by **nginx:stable-alpine** in Docker, deployed to **Kubernetes via Helm**
- Site lives at the `/guide` URL prefix (files at `/usr/share/nginx/html/guide` in the container)

### Nginx config chain (production)

Three Kubernetes ConfigMaps are mounted as volumes into the nginx container:

1. **nginx.conf** (main) — gzip settings, includes `conf.d/*.conf`
2. **default.conf** (server block) — location blocks + redirect includes
3. **redirect.conf** — existing rewrite rules from `guideRedirect` Helm value

The server block (`nginx-conf.yaml`) has two location blocks:

- `location ~* \.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf|svg|woff2)$` — static assets, served with 30-day cache headers, **never redirected**
- `location /` — everything else (HTML pages)
- `include /etc/nginx/extra/redirect.conf;` — existing redirect rules at server block level

### Existing redirect mechanism

The `guideRedirect` Helm value (a string) is rendered into `redirect.conf` and mounted into the container. Currently redirects `/product*` to a specific tutorial path in prod/stage.

### Key files

| File                                                                | Purpose                                                 |
| ------------------------------------------------------------------- | ------------------------------------------------------- |
| `deployment/helm/guide-charts/templates/cm/nginx-conf.yaml`         | Server block with location blocks and redirect includes |
| `deployment/helm/guide-charts/templates/cm/redirect.yaml`           | ConfigMap template for existing redirect.conf           |
| `deployment/helm/guide-charts/templates/cm/notify.yaml`             | ConfigMap template for new notify.conf                  |
| `deployment/helm/guide-charts/values.yaml`                          | Default values (local)                                  |
| `deployment/helm/env/prod.yaml`                                     | Production overrides                                    |
| `deployment/helm/env/stage.yaml`                                    | Staging overrides                                       |
| `deployment/helm/guide-charts/templates/deployment/deployment.yaml` | Volume mounts for nginx configs                         |

## Implementation Plan

### Step 1: Redirect a single path (proof of concept) — DONE

Implemented a separate `notify` config system alongside the existing `redirect` system, keeping existing rules untouched. Scoped to just `/guide/remote/` to prove the pipeline end-to-end before touching all content.

**Files changed:**

- `deployment/helm/guide-charts/templates/cm/notify.yaml` — new ConfigMap template for `notify.conf`
- `deployment/helm/guide-charts/values.yaml` — added `notifyRedirect` placeholder
- `deployment/helm/env/prod.yaml` — added `notifyRedirect` redirecting `/guide/remote/` → `/guide/shutdown/`
- `deployment/helm/env/stage.yaml` — same as prod
- `deployment/helm/guide-charts/templates/deployment/deployment.yaml` — added `notify` volume and volumeMount
- `deployment/helm/guide-charts/templates/cm/nginx-conf.yaml` — added `include /etc/nginx/extra/notify.conf;`

**To deploy:**

1. Helm dry-run: `cd deployment/helm && helm install --dry-run guide -f env/stage.yaml ./guide-charts`
2. Deploy to staging, verify `/guide/remote/` → 302 to `/guide/shutdown/`
3. Confirm other pages and static assets are unaffected
4. Deploy to prod

### Step 2: Redirect the full site — DONE

Updated only `prod.yaml` and `stage.yaml` — no new templates or infrastructure needed.

`notifyRedirect` in both env files:

```yaml
notifyRedirect: |
  if ($request_uri !~* "^/guide/shutdown") {
    return 301 https://www.jetbrains.com/guide/shutdown/;
  }
```

**Why this works:**

- The static asset `location ~*` block has higher nginx priority than `location /`, so CSS/JS/images are served normally and never reach the `if` block
- The `if` at server block level fires for all HTML requests, redirecting everything except `/guide/shutdown/`
- 301 (permanent) signals to search engines that the content has moved

**Edge cases verified:**

- `/guide/` homepage → redirects
- `/guide/remote/anything/nested/` → redirects
- `/guide/shutdown/` → loads normally (excluded by regex)
- `/guide/assets/main.abc123.css` → served normally (static asset location block)

**Health check note:** Kubernetes liveness/readiness probes hit `/guide/`. They will receive a 301, which K8s `httpGet` probes treat as success. Verify pods stay healthy on staging. If probes fail, change probe path to `/guide/shutdown/`.

**To deploy:**

1. Helm dry-run: `cd deployment/helm && helm install --dry-run guide -f env/stage.yaml ./guide-charts`
2. Stage: verify any content page redirects, `/guide/shutdown/` loads, assets load, existing `/product*` redirect still works
3. Prod after staging validation
