---
date: 2024-10-16
title: "AWS SDK Kotlin Series - Upload a file to S3 - Unit Test"
topics:
  - ai
  - kotlin
author: isabelgarrido
subtitle: "Part two of three"
thumbnail: ./thumbnail.jpg
linkURL: "https://isabeliita90.hashnode.dev/upload-a-file-to-s3-unit-test"
---

If you missed it, check out [part one](../upload-a-file-to-s3/) of this blog post series first.

In the blog post Isabel focuses on the unit testing aspect of uploading files to Amazon S3 using the AWS SDK for Kotlin. This installment is part of a larger series aimed at teaching developers how to effectively use the AWS SDK with Kotlin.

The post begins by emphasizing the meaning of unit in unit test for the author, this creates the base for the rest of the content.

Using her own learning process, the author explains how to create a unit test for the happy path of upload a file, but also how easily testing coroutines, one of the key changes of Kotlin AWS SDK.

The core of the tutorial walks readers through creating test doubles and writing test cases. The author provides comprehensive code examples to illustrate the setup of those test double and the assertion of behavior.

Prominent test cases covered include confirming successful uploads, and handling error scenarios gracefully. The post includes snippets of Kotlin code for each test case, ensuring readers can follow along and implement similar tests in their projects.

Overall, this blog post serves as a practical guide for Kotlin developers looking to implement robust unit tests for file uploads to Amazon S3 using Kotlin AWS SDK, complete with detailed instructions, code examples, and best practices.

Check out [part three](../upload-a-file-to-s3-integration-test/) next.
