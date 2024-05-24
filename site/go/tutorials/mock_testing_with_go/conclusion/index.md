---
type: TutorialStep
date: 2024-05-24
title: "Conclusion"
topics:
  - go
  - testing
author: cb
subtitle: Where to Go from Here
thumbnail: ./thumbnail.png
---

Mock testing in Go is pretty easy, thanks to Go's interface mechanism. All techniques except the most specialized one make use of an interface type to replace the real functionality with a mock-up. Whether you implement the mock object manually or use a third-party package or code generator depends partly on the particular requirements of the project and partly on your personal taste.

Now that you've completed this tutorial, you have quite a few options available for testing I/O-heavy functions without actually doing any I/O.
