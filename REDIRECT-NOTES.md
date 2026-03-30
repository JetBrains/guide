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

## First step

- Add some research in this document on the deployment architecture
- Look in git history for any commits related to the `deployment` directory
- Learn what you can about the use of Helm, our web server, and any standards we have set
- Recommend a small first step we can do as a deployment in production
  - For example, do a redirect only on the `/guide/remote/` site pat
