---
type: TutorialStep
date: 2024-05-08
title: Introduction
topics:
  - go
  - web
author: mm
subtitle: Introducing Gin, the high-performance web framework, written in Go
thumbnail: ./thumbnail.png
---

Go has become very popular for web development, particularly for high-performance REST APIs.
Recently, Gin has become a well-known Go framework for REST APIs.
Through this guide, we'll concentrate on the development of a web application with Gin.
We'll start with a brief introduction.

## Go

<img alt="golang" src="./images/golang.svg" height="400" width="400">

[Go](https://go.dev/), (also known as Golang) is a statically typed, compiled programming language.
Go is characterized by its simplicity, efficiency, and focus on concurrency.

Here are some key features and aspects of Go:

- **Simplicity**: Go was designed to be straightforward and convenient to learn. Its syntax is clean and minimalistic, making it approachable for both new and experienced programmers.
- **Concurrency**: Go has built-in support for concurrency through goroutines and channels.
- **Efficiency**: Go compiles to machine code, resulting in high-performance executable files.
- **Static Typing**: Go is statically typed, meaning that variable types are checked at compile time.
- **Standard Library**: Go comes with a rich standard library that provides support for various tasks such as networking, encryption, HTTP servers, and more. This eliminates the need for third-party libraries for many common tasks.
- **Cross-Platform**: Go is designed to be portable and runs on multiple platforms.

Overall, Go is a versatile language suitable for a wide range of applications,
from web development to system programming, cloud services, and more. Its simplicity, efficiency,
and built-in concurrency support makes it an attractive choice for many developers and organizations.

## Gin

<img alt="gin" src="./images/golang_gin.png" height="300" width="300">

<br><br>

[Gin](https://gin-gonic.com/) is a popular web framework for the Go (Golang) programming language.
It is lightweight, fast, and feature-rich, making it a preferred choice for building web applications and APIs in Go.

According to the official documentation, these are the common features of Gin that make it stand out.

- **Fast** - Radix tree-based routing, small memory footprint. No reflection. Predictable API performance.
- **Middleware support** - An incoming HTTP request can be handled by a chain of middlewares and the final action. For example, Logger, Authorization, GZIP and finally post a message in the DB.
- **Crash-free** - Gin can catch a panic occurred during an HTTP request and recover it. This way, your server will always be available. As an example - it’s also possible to report this panic to Sentry!
- **JSON validation** - Gin can parse and validate the JSON of a request—for example, checking the existence of required values.
- **Routes grouping** - Organize your routes better. Authorization required vs non required, different API versions… In addition, the groups can be nested unlimitedly without degrading performance.
- **Error management** - Gin provides a convenient way to collect all the errors occurred during a HTTP request. Eventually, a middleware can write them to a log file, to a database and send them through the network.
- **Rendering built-in** - Gin provides an easy-to-use API for JSON, XML and HTML rendering.
- **Extendable** - Creating new middleware is so easy.
