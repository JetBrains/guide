---
date: 2019-04-18
title: Speed Up Coverage with Configuration File
topics:
  - testing
author: pwe
subtitle: >-
  Speed up your "visual coverage" with a config file and correct working directory.
seealso:
  - title: Coverage configuration files
    href: "https://coverage.readthedocs.io/en/coverage-5.0.4/config.html"
thumbnail: ./thumbnail.png
video: "https://www.youtube.com/watch?v=OCH_gPfrvzw"
"callToAction":
  {
    "title": "Interested in viewing your coverage?",
    "url": "site/python/tips/spot-coverage-in-gutter/",
    "message": "You can quickly see your test coverage inside your IDE. Check it out!",
  }
---

Coverage is a boon: it lets you know how much of your code has tests and better, which lines in which files don't.

That comes at a price: instrumentation takes a while. You can speed up `coverage` by telling it to not look in places you don't care about: your virtual environment's dependencies, your project's `tests` directory itself, `.tox` directories, etc. You'll also get more accurate percentages.

This is done with a [`.coveragerc` configuration file](https://coverage.readthedocs.io/en/coverage-5.0.4/config.html), which has lots of options.

PyCharm though is finicky about this, hence this tip:

- Put your `.coveragerc` file in your project root

- Make a run configuration to run your tests, and...

- ...edit that run configuration's working directory to start at the root

{% cta %}
