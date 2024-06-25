---
date: 2021-07-06
title: Configure Custom Namespaces Manually
topics:
  - kubernetes
author: dlsniper
subtitle: >-
  Use all the features you need even if the plugin cannot process the namespaces
  automatically
thumbnail: ./thumbnail.png
screenshot: ./screenshot.png
---

If the plugin cannot automatically infer the available Kubernetes namespaces, now you can configure them manually. This will solve the problem when the user does not have the required permissions to perform namespace listing.

Go to _Settings/Preferences | Build, Execution, Deployment | Kubernetes_ and configure the namespace in the corresponding section.

**Note:** You must have the <a href="https://plugins.jetbrains.com/plugin/10485-kubernetes">Kubernetes plugin</a> provided by JetBrains installed for this action to work.
