---
type: TutorialStep
date: 2024-04-22
title: "Prerequisites"
topics:
  - go
  - databases
  - redis
author: chrisberger
subtitle: ""
thumbnail: ./thumbnail.png
---

- Ensure you have an up-to-date [Go](https://go.dev/doc/install) toolchain on your system.
- [Install Redis](https://redis.io/docs/getting-started/installation/). This tutorial assumes that you do so on your local machine. If you want to use a remote Redis instance for this tutorial, make sure to adjust the connection details accordingly. **Note:** Do not set a password for the database.
- Verify your Redis installation:
  - Start `redis-cli` in a terminal. It should automatically connect to the local Redis instance.
  - Then, type `ping` at the prompt and hit **Enter**. If the Redis instance is available, it will reply with `PONG`.
- Download and install the [GoLand IDE](https://www.jetbrains.com/go/download). There is a free trial available; if you are new to GoLand, don't miss the chance to test it out!
- Fork or clone the [code repository](https://github.com/JetBrains/go-code-samples) for this tutorial. For brevity, this tutorial shows only parts of the code, so be sure to have the repository available to follow along.

All items checked off? Then let's begin!

### Choosing a Redis Package

This tutorial uses the [`redis/go-redis`](https://pkg.go.dev/github.com/redis/go-redis/v9) package. This package is officially supported by the Redis team. However, it's not the only Redis package available. The second-most popular package is [`gomodule/redigo`](https://pkg.go.dev/github.com/gomodule/redigo). Either of the packages is a good choice when working with Redis, but this tutorial uses `go-redis` for a few reasons:

- It's [widely used](https://en.wikipedia.org/wiki/Redis#Popularity).
- It's [fast](https://levelup.gitconnected.com/fastest-redis-client-library-for-go-7993f618f5ab).
- It provides type-safe APIs.

The `go-redis` package provides a rich set of functions and types, so you'll want to keep the [package reference](https://pkg.go.dev/github.com/redis/go-redis/v9) open while moving through the tutorial.
