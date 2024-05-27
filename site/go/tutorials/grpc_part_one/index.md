---
resourceType: tutorial
layout: resources/tutorial/TutorialLayout.11ty.tsx
date: 2024-05-27
title: Building a gRPC API in Go - Part One
topics:
  - go
author: ab
subtitle: ""
thumbnail: ./thumbnail.png
tutorialItems:
  - ./prerequisites/
  - ./grpc_in_go/
  - ./reverse_proxy/
  - ./conclusion/
---

Remote procedure call (RPC) is a technique that allows a client to invoke a procedure on a remote system as if it were a local procedure. If you're familiar with traditional REST APIs, you know that the API endpoints need to be mapped to procedures on a server, which can be complicated and time-consuming. RPC eliminates the need for complex mapping by letting the client invoke procedures on the server.

[gRPC](https://grpc.io/docs/what-is-grpc/introduction/) was developed by Google as a modern take on RPC. The 'g' in gRPC stands for [many things](https://github.com/grpc/grpc/blob/master/doc/g_stands_for.md). gRPC uses HTTP/2 as the transport mechanism for efficient performance with multiplexing and [Protocol Buffers](https://protobuf.dev/overview/) (Protobuf) as the data exchange format for compact data storage and fast parsing.

This series will help you write a complete gRPC application in Go. In the first part of this series, you'll learn how to define gRPC endpoints, generate gRPC stubs using the Protobuf compiler, and create an HTTP reverse proxy for adding REST endpoints.
