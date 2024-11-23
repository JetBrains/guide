---
date: 2024-10-16
title: "AWS SDK Kotlin Series - Upload a file to S3 - Unit Test"
topics:
  - kotlin
author: isabelgarrido
subtitle: "Part three of three"
thumbnail: ./thumbnail.jpg
linkURL: "https://isabeliita90.hashnode.dev/uploading-a-file-to-s3-integration-test"
---

If you missed them, check out [part one](../upload-a-file-to-s3/) and [part two](../upload-a-file-to-s3-unit-test/) of this blog post series first.

In this blog post, Isabel explains how to perform integration testing for uploading files to Amazon S3 using AWS SDK for Kotlin. The post is part of a series designed to teach developers how to integrate Kotlin applications with AWS using the new Kotlin AWS SDK.

Before diving into the code, the author outlines two important libraries—TestContainers (for running test environments in containers) and Localstack (for mocking AWS services). She provides detailed configuration instructions for both libraries, making it easy for readers to replicate the example.

Isabel then walks through writing integration tests, which involve creating an actual AWS S3 client and performing operations within a framework like JUnit. Code snippets demonstrate how to upload a file to an S3 bucket and verify the upload by checking the bucket's content.

Overall, the blog post serves as a comprehensive guide to conducting integration tests for file uploads to Amazon S3 using the AWS SDK for Kotlin. It offers clear instructions, useful code examples, and best practices to help developers ensure their applications work seamlessly with AWS S3.
