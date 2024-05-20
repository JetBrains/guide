---
type: TutorialStep
date: 2024-05-22
title: "Unit testing in Go is easy!"
topics:
  - go
  - testing
author: chrisberger
subtitle: ""
thumbnail: ./thumbnail.png
---

Simply write a test function that repeatedly calls the function to be tested with different inputs and compares the actual output against the expected output. Mission accomplished; time for a coffee.

This approach works well until the function interacts with external resources through I/O operations. This could be a file being read or written, a database being queried, or a remote service being called.

Now your test function has some serious problems:

1. The external resource can be slow to access, making the test run unacceptably long. (Remember, unit tests should be fast.)
2. The external resource might even be unavailable, making the test fail even if the function is correct.
3. The external resource may deliver different responses on each call, making tests unreliable.

It's perfectly valid to argue that such slow, I/O-based tests should belong to integration testing rather than unit testing. However, integration tests occur much more rarely than unit tests, which means that logical errors in a function may remain undetected until the team schedules another integration test. And as integration tests are naturally more complex than unit tests, it takes more time and effort to track down and fix a bug there compared to tracking and fixing a bug in a unit test. On the other hand, you would not want slow, I/O-based functions to slow down your unit tests.

But how can you unit test a function that contains I/O operations without actually triggering those I/O operations?

The answer is mock testing.

Mock testing is a testing approach where external resources are replaced by [mock objects](https://en.wikipedia.org/wiki/Mock_object) that simulate the behavior of their real counterparts to a certain extent without actually doing any I/O. Instead, the mock object returns results that are either predefined or calculated on the fly.

Imagine a function that fetches user data from a REST API and processes that user data. If you could somehow tell the function to mimic the REST call without doing I/O, you could avoid all three of the aforementioned problems.

This tutorial is going to discuss the "somehow" part. Based on a small sample project, you'll learn different techniques for replacing external resources with mock objects.

First, you'll learn how to use GoMock and the `mockgen` tool to generate mock objects from your source code. `mockgen` is provided by the Go team and is a versatile tool that can generate mock objects and [test stubs](https://en.wikipedia.org/wiki/Test_stub), either from a source file or from an import path. (Side note: The tutorial does not examine the differences and use cases of test stubs versus mock objects. The techniques for injecting mock objects are applicable to injecting test stubs as well.)

Then, you'll learn about other mock injection techniques that may be a good choice for specific use cases:

- Manual mock testing with interfaces
- Using `testify/mock`
- Making mock HTTP requests with `httptest`
- Mocking with higher-order functions
