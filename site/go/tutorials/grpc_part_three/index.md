---
resourceType: tutorial
layout: resources/tutorial/TutorialLayout.11ty.tsx
date: 2024-06-12
title: Building a gRPC API in Go - Part Three
topics:
  - go
author: ab
subtitle: ""
thumbnail: ./thumbnail.png
tutorialItems:
  - ./grpc_client/
  - ./hooking_up/
  - ./testing/
  - ./conclusion/
---

Welcome back to the fourth and final part of the "gRPC with Go" series. Before proceeding with the rest of the app, let's have a quick recap of what you've done so far:

In [part one](../grpc_part_one/), you wrote the Protobuf definitions and generated Go code stubs. You also wrote the reverse proxy for REST clients.

In [part two](../grpc_part_two/), you connected your app to a PostgreSQL database and wrote the non-streaming endpoints of the gRPC server, and you wrote the [streaming](../grpc_part_two/comments_table/) endpoints and completed the server.

In this last installment, you'll write the gRPC client and test the whole app.
