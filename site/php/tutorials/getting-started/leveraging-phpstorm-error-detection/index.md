---
type: TutorialStep
date: 2024-11-22
title: PhpStorm's error detection and correction
topics: []
author: brentroose
subtitle: Here, we delve into PhpStorm's robust error detection and correction capabilities.
thumbnail: ./thumbnail.png
video: "https://youtu.be/8ruPytz5YCE"
canonical: https://www.jetbrains.com/phpstorm/getting-started/episode-3/
---

In this episode, you'll learn how to navigate and fix errors using intuitive keyboard shortcuts, scan your entire project for issues, and fine-tune inspection rules to match your coding standards.

---

PhpStorm’s deep knowledge of PHP allows it to detect and fix a wide range of errors for you.

From deprecation notices to syntax errors, from incompatible types to wrongly ordered arguments – PhpStorm will tell you all about them.

<video width="1366" height="768" controls loop autoplay muted>
  <source src="../e3-deprecations.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

PhpStorm will show you how many errors and warnings a file contains, and you can navigate between them by pressing <kbd>F2</kbd>. And remember, you can use the <kbd>Shift+Shift</kbd> menu to find the right shortcut if you don’t know it.

<video width="1366" height="768" controls loop autoplay muted>
  <source src="../e3-warnings.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

Besides telling you about errors, PhpStorm can fix many of them for you, too. All you have to do is press <kbd>Alt+Enter</kbd> – that’s that second keyboard shortcut I told you about before.

If that wasn’t enough, PhpStorm can also scan your whole project, or parts of it, all at once. Select a folder, press <kbd>Shift+Shift</kbd>, and search for Inspect; choose which folders to scan, press Analyze, and there you have it, a list of all errors within your code. You can scroll through them, and you can even press <kbd>Alt+Enter</kbd> within the preview window to fix the discovered errors. There’s no need to open any files.

<video width="1366" height="768" controls loop autoplay muted>
  <source src="../e3-scan-project.webm" type="video/webm">
  Your browser does not support the video tag.
</video>

Finally, PhpStorm has a huge amount of inspections – these are the rules that detect errors and warnings.

You can fine-tune all inspections by going to Settings | Editor | Inspections. You can change each inspection’s severity level and enable or disable specific rules. You can do all of this via the context menu: go to an error or warning that you want to change, press <kbd>Alt+Enter</kbd>, and then open the Options menu by pressing the three dots to the right of a suggested quick-fix. You’ll get a dedicated menu to finetune or disable this specific inspection.

<video width="1366" height="768" controls loop autoplay muted>
  <source src="../e3-inspections-720.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
