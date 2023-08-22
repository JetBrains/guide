# Helm - The Package Manager for Kubernetes

[Helm](https://helm.sh/) helps you manage Kubernetes applications — Helm Charts help you define, install, and upgrade even the most complex Kubernetes application.

Follow the official documentation for installing Helm.

All files are located under `deployment/helm` directory.

## Dry Run

If you receive YAML files as output without any errors, then you are good to proceed.

FORMAT

This the format you need to follow.

```
helm install <APP_NAME> <CHART_NAME>
```

```bash
cd deployment/helm
helm install --dry-run guide ./guide-charts
```

- You can follow the same pattern for `staging` and `production`.

## Installing Helm Charts

### Local Machine

- This is going to install the application in the default namespace.

```bash
helm install guide ./guide-charts
```

- Installing on different namespace
- `--create-namespace` will create a new namespace if it doesn't exist.

```bash
helm install guide ./guide-charts -n jetbrains-guide  --create-namespace
```

### Staging Server

- Installing App with `staging` specific credentials.

```bash
helm install guide -f env/stage.yaml ./guide-charts
```

If you're using custom `redirects` for configuring NGINX

```bash
helm install guide --set-file guideRedirect=<path-to-file>.conf -f env/stage.yaml ./guide-charts
```

### Production Server

- Installing App with `production` specific credentials.

```bash
helm install guide -f env/prod.yaml ./guide-charts
```

If you're using custom `redirects` for configuring NGINX

```bash
helm install guide --set-file guideRedirect=<path-to-file>.conf -f env/prod.yaml ./guide-charts
```
