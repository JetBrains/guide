---
date: 2018-11-06
title: One Import Per Line Preference
topics:
  - editing
author: pwe
subtitle: >-
  Tell PyCharm to put each import on a separate line when it cleans up your imports.
seealso:
  - title: Code Style Preferences for Python Imports
    href: >-
      https://www.jetbrains.com/help/pycharm/2018.3/code-style-python.html#imports
  - title: Optimize Imports
    href: >-
      https://www.jetbrains.com/help/pycharm/2018.3/creating-and-optimizing-imports.html#optimize-imports-in-project
  - title: YouTrack Feature Ticket for One-Per-Line
    href: "https://youtrack.jetbrains.com/issue/PY-20100"
thumbnail: ./thumbnail.png
video: "https://youtu.be/XB4SnJ4XmUs"
callToAction:
  title: "Interested in optimizing your imports?"
  url: "/python/tips/optimize-imports/"
  message: "Keeping your imports clean and tidy is a great code readability tip. Check it out!"
---

Writing Python code means importing stuff. Lots of code can mean lots of imports. Python is pretty picky about style, and so are you, which can mean lots of tedious manual gardening of your imports.

PyCharm's Optimize Imports acts as your import janitor and it has settings which let you specify some options on style import. PyCharm 2018.3 adds a preference: "One Import Per Line". With this setting in place, PyCharms Optimize Imports action will rewrite lines like this:

```python
from project.models import Item, User, Account
```

...into lines like this:

```python
from project.models import Account
from project.models import Item
from project.models import User
```

Don't forget, PyCharm can also run the Optimize Imports action, with options such as _Only VCS changed files_, across all the files in your project. Also, check out the other ways to customize import styles.

{% cta %}
