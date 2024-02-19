---
date: 2021-05-10
title: Use a lightweight inspection profile on commit
topics:
  - inspections
  - java
  - vcs
author: tg
subtitle: >-
  Fully customise the checks you must perform before you commit your changes to
  version control
thumbnail: ./thumbnail.png
seealso:
  - title: (documentation) IntelliJ IDEA Help - Configure profiles
    href: "https://www.jetbrains.com/help/idea/customizing-profiles.html"
video: "https://youtu.be/9i6EeC2OVqU"
---

You can select an inspection profile for running analysis before commit. Using an inspection profile with a much smaller number of checks, for example only Java errors and warnings, can run much faster than our full inspection profile and prevent us from committing breaking changes.
