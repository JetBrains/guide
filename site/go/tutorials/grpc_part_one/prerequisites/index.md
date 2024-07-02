---
type: TutorialStep
date: 2024-06-12
title: "Prerequisites"
topics:
  - go
author: ab
subtitle: Prepare Your Software for a Task Management App Build.
thumbnail: ./thumbnail.png
---

## What You Will Build

In this tutorial, you'll build a simple task management app. The app will use a database to store tasks and have simple gRPC endpoints to create and list tasks. You'll also write an HTTP reverse proxy using the [`grpc-gateway`](https://github.com/grpc-ecosystem/grpc-gateway) plugin, which will let REST clients connect to the API as well. Finally, you'll write a gRPC client to consume the API.

To follow along with the tutorial, you'll need:

1. The latest version of [Go](https://go.dev/) installed and set up properly (this article uses Go 1.20.6)
2. The [Protobuf compiler](https://github.com/protocolbuffers/protobuf#protobuf-compiler-installation) (`protoc`) installed (this article uses `protoc` v3.21.12)
3. The [GoLand IDE](https://www.jetbrains.com/go/) (this article uses GoLand 2023.2)

You'll also need basic knowledge of Go and Protobuf.
