---
type: TutorialStep
date: 2024-04-02
title: "Introduction"
topics:
  - go
  - web
author: mm
subtitle: "Introducing Gin, the high-performance web framework, written in Go"
thumbnail: ./thumbnail.png
---

Through this guide, we'll concentrate on the development of a web application with Gin, which is a well-known Go framework.

We'll start with a brief introduction.

## Go

<img alt="golang" src="./images/golang.svg" height="400" width="400">

Go,
also known as Golang, is a statically typed,
compiled programming language.
Go is characterized by its simplicity,
efficiency, and focus on concurrency.

Here are some key features and aspects of Go:

- **Simplicity**: Go was designed to be straightforward and convenient to learn. Its syntax is clean and minimalistic, making it approachable for both new and experienced programmers.
  <br><br>
- **Concurrency**: Go has built-in support for concurrency through goroutines and channels. Goroutines are lightweight threads of execution, and channels are a means of communication between goroutines. This makes it easy to write concurrent programs.
  <br><br>
- **Efficiency**: Go compiles to machine code, resulting in high-performance executable files. Its runtime is relatively small, and it has efficient garbage collection, making it suitable for building fast and scalable systems.
  <br><br>
- **Static Typing**: Go is statically typed, meaning that variable types are checked at compile time. This helps catch errors early in the development process and can lead to more robust code.
  <br><br>
- **Standard Library**: Go comes with a rich standard library that provides support for various tasks such as networking, encryption, HTTP servers, and more. This eliminates the need for third-party libraries for many common tasks.
  <br><br>
- **Cross-Platform**: Go is designed to be portable and runs on multiple platforms, including Linux, macOS, Windows, and more.

Overall, Go is a versatile language suitable for a wide range of applications,
from web development to system programming, cloud services, and more.Its simplicity, efficiency,
and built-in concurrency support make it an attractive choice for many developers and organizations.

## Gin

<img alt="gin" src="./images/golang_gin.png" height="300" width="300">

<br><br>

[Gin](https://gin-gonic.com/) is a popular web framework for Go (Golang) programming language.
It is lightweight, fast, and feature-rich, making it a preferred choice for building web applications and APIs in Go.

According to the official documentation, these are the common features of Gin that make it stand out.

- **Fast** - Radix tree-based routing, small memory footprint. No reflection. Predictable API performance.
  <br><br>
- **Middleware support** - An incoming HTTP request can be handled by a chain of middlewares and the final action. For example, Logger, Authorization, GZIP and finally post a message in the DB.
  <br><br>
- **Crash-free** - Gin can catch a panic occurred during an HTTP request and recover it. This way, your server will always be available. As an example - it’s also possible to report this panic to Sentry!
  <br><br>
- **JSON validation** - Gin can parse and validate the JSON of a request—for example, checking the existence of required values.
  <br><br>
- **Routes grouping** - Organize your routes better. Authorization required vs non required, different API versions… In addition, the groups can be nested unlimitedly without degrading performance.
  <br><br>
- **Error management** - Gin provides a convenient way to collect all the errors occurred during a HTTP request. Eventually, a middleware can write them to a log file, to a database and send them through the network.
  <br><br>
- **Rendering built-in** - Gin provides an easy-to-use API for JSON, XML and HTML rendering.
  <br><br>
- **Extendable** - Creating new middleware is so easy.
