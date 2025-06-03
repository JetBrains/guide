---
date: 2025-05-07
title: Load go.mod Changes Manually
topics:
  - editing
  - go
author: dlsniper
subtitle: Take control of when go.mod files are refreshed.
thumbnail: ./thumbnail.png
video: "./gomod.webm"
---

_Make all your changes, then run **go list** at the push of a button._

Navigate to **Settings/Preferences | Build, Execution, Deployment | Build Tools** and select **External changes** instead of **Any changes**.

Then, edit your `go.mod` file, and when you are done, press the button in the top-right corner of the editor to refresh these changes.
