---
date: 2024-07-09
title: Run inspection
topics:
  - java
  - security
  - inspections
author: md
subtitle: Run inspection by name. For example, run Vulnerable API usage to see where the vulnerable API of external dependencies is used in your code.
thumbnail: ./thumbnail.png
seealso:
  - title: (documentation) IntelliJ IDEA Help - Run inspections
    href: "https://www.jetbrains.com/help/idea/running-inspections.html"
  - title: (documentation) IntelliJ IDEA Help - Find vulnerable APIs
    href: "https://www.jetbrains.com/help/idea/package-analysis.html#find-vulnerable-api"
  - title: (documentation) IntelliJ IDEA Help - Analyze code to find all vulnerable dependencies
    href: "https://www.jetbrains.com/help/idea/package-analysis.html#find-vulnerable-api"
  - title: (video) Is your code vulnerable?
    href: "https://www.youtube.com/watch?v=4iD5Q3tFiEI"
  - title: "(video) Enhance Code Safety: Unveiling IntelliJ IDEA’s New Exploitable Path Feature"
    href: "https://www.youtube.com/watch?v=eLKsm0OpwN8"
video: "https://youtu.be/RX9ZRIrs9yU"
---

When dependencies in your project have known vulnerabilities, how do you know whether you're actually using the vulnerable part of a dependency? Use IntelliJ IDEA's Vulnerable API Usages inspection to find out!

We can run the Vulnerable API usage inspection manually to get a report about all vulnerable APIs usages in our project. To run an inspection by name, we can go to **Code | Analyze Code | Run Inspection by Name** in the main menu, or use the shortcut <kbd>⌘⌥⇧I</kbd> (macOS) / <kbd>Ctrl+Alt+Shift+I</kbd> (Windows/Linux).
Or we can use **Find Action** <kbd>⌘⇧A</kbd> (macOS) / <kbd>Ctrl+Shift+A</kbd> (Windows/Linux) to find the action **Run Inspection by Name**.

In the **Enter inspection name** popup that opens, type the name of the inspection you want to run, for example, “Vulnerable API usage”.
Next, select the scope you want to run this inspection on.

The results of the inspection will open in a tab in the _Problems tool window_.

The results will be shown on the left. Click one of the results to open a preview of that result on the right. This gives you the option to **Go to file with declared dependency**, which will navigate to the place in the build file where the relevant dependency is declared, and we can upgrade the dependency to the unaffected version from there. Alternatively, double-click the result to navigate to the affected code in the editor, to see exactly where and how the vulnerable API is used.
