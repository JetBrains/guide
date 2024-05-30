---
resourceType: tutorial
layout: resources/tutorial/TutorialLayout.11ty.tsx
date: 2024-05-27
title: Building a gRPC API in Go - Part Four
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

In [part one](URL), you wrote the Protobuf definitions and generated Go code stubs. You also wrote the reverse proxy for REST clients.

In [part two](URL), you connected your app to a PostgreSQL database and wrote the non-streaming endpoints of the gRPC server.

In [part three](URL), you wrote the streaming endpoints and finished the server.

In this last installment, you'll write the gRPC client and test the whole app.
