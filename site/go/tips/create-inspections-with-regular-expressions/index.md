---
date: 2023-03-09
title: Create Inspections with Regular Expressions
topics:
  - editing
  - go
  - quick-fixes
author: ap
subtitle: Use regular expressions to create your own search and replace inspections.
seealso:
  - title: (documentation) GoLand Help - Create custom inspections
    href: "https://www.jetbrains.com/help/go/creating-custom-inspections.html"
thumbnail: ./thumbnail.png
screenshot: ./screenshot.png
---

Open settings, go to _Editor | Inspections_, and press **Add**. Select **Add RegExp Search Inspection…** from the list and you will be directed to a dialog where you can set up your new inspection. Select the desired language, use hints from the panel on the left to build a RegExp, and designate the required replacement. You can also specify the severity of how the IDE should highlight found cases in the project.
