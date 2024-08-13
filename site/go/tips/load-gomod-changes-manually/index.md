---
date: 2021-07-06
title: Load go.mod Changes Manually
topics:
  - editing
  - go
author: dlsniper
subtitle: Take control of when go.mod files are refreshed.
thumbnail: ./thumbnail.png
video: >-
  https://www.youtube.com/watch?v=wynrU83Ajns&list=PLQ176FUIyIUZrbrlz4AY1V8VzBJKZyVlW&index=52
---

_Make all your changes then run **go list** at the push of a button._

Navigate to **Settings/Preferences | Build, Execution, Deployment | Build Tools** and select **External changes** instead of **Any changes**.

Then, edit your `go.mod` file, and when you are done, press the button in the top-right corner of the editor to refresh these changes.
