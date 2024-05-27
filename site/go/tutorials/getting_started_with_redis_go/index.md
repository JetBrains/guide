---
resourceType: tutorial
layout: resources/tutorial/TutorialLayout.11ty.tsx
date: 2024-05-12
title: Getting Started with Redis in Go
topics:
  - go
  - databases
  - redis
author: cb
subtitle: Using Redis in a Go Project
thumbnail: ./thumbnail.png
tutorialItems:
  - ./introduction/
  - ./prerequisites/
  - ./new_project/
  - ./connect_goland_redis/
  - ./demo_one/
  - ./demo_two/
  - ./demo_three/
  - ./demo_four/
  - ./demo_five/
  - ./demo_six/
  - ./best_practices/
  - ./conclusion/
---

Are you looking for an in-memory, persistent database? A fast cache? A streaming engine? Or a message broker?

[Redis](https://redis.io/) is all of this. Being a key-value store at its base, Redis can take on a variety of tasks that go beyond the functionality of a classic database. With tested-and-proven Go packages like `redis/go-redis` or `redigo/redis` and native support from the GoLand IDE, you can use Redis in your Go projects with almost no effort.

This tutorial introduces you to the key features of Redis and how to use them in a Go project. At the end of the tutorial, you will know how to:

- Create a GoLand project
- Connect to Redis
- Store and retrieve string values
- Run Redis commands in batches for optimal performance
- Use transactions to retain data consistency
- Set up a pub-sub system
- Help a team of fearless heroes rescue a group of chickens that are held hostage by evil goblins
