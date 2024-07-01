---
date: 2024-02-20
title: Three pytest features you will love
topics:
  - testing
  - pytest
author: hs
subtitle: One of the most popular frameworks for Python is pytest, and it comes with several cool features.
thumbnail: ./thumbnail.png
linkURL: "https://blog.jetbrains.com/pycharm/2024/02/pytest-features/"
---

In this blog post, Helen discusses three cool features of the pytest framework for Python: fixtures, markers, and parametrize. Fixtures allow you to set up and tear down resources and conditions for tests in a consistent and reusable way. By using the `@pytest.fixture` decorator, you can define fixtures that are used across multiple test functions. Markers in pytest are used to run or skip tests based on certain conditions. You can use built-in markers like `@pytest.mark.skip` or create custom markers with custom metadata. Markers can be used to skip tests based on operating system or minimum Python version.

The `@parametrize` decorator in pytest allows you to run the same test with different input parameters. This improves code readability and reduces code duplication. PyCharm provides full support for pytest, including a dedicated test runner, code completion, and code navigation. If you want to learn more about these features, the author recommends checking out resources like Brian Okken's pytest course and book, watching the pytest tutorial video on JetBrains Guide, and referring to the official [pytest documentation](https://docs.pytest.org/en/8.0.x/).
