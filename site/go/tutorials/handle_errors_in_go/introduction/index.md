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

Error handling is one of the aspects in which Go differs from other popular languages like Java, C++, JavaScript, and Python. In Go, errors are values. While other languages move error handling out of the code flow, Go considers errors a natural part of the program flow. If a function encounters an error, it returns that error alongside other return values. The caller has the duty to check this error and handle it accordingly.

A typical Go package or app can encounter various types of errors at runtime, including logical errors, I/O errors, network errors, data validation errors, and more. Each of these types may require specific error handling. Go provides a set of tools and techniques to handle different types of errors.

This article explores several aspects of error handling in Go. You will learn error handling techniques and best practices, how to address specific types of errors, and how to avoid common mistakes in error handling.

But first, let's set up the source code for this guide.
