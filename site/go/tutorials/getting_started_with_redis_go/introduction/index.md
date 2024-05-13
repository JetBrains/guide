---
type: TutorialStep
date: 2024-04-22
title: "What Is Redis?"
topics:
  - go
  - databases
  - redis
author: chrisberger
subtitle: ""
thumbnail: ./thumbnail.png
---

You may have heard of Redis as an in-memory key-value store. In fact, it's more than that. Redis can store simple key-value pairs, but it also supports [data types](https://redis.io/docs/data-types/) like lists, sets, sorted sets, hashes, streams, geospatial data, and more. To achieve maximum performance, the data is primarily stored in main memory. Redis can [persist your data](https://redis.io/docs/management/persistence/) to disk if needed in order to survive system failures or planned reboots. You can choose to save snapshots of the data set at specific intervals or append every write operation to a persistence log file.

Besides persistence, a reliable database system must help ensure data consistency. Redis does this by supporting [transactions](https://redis.io/docs/manual/transactions/), which combine multiple write operations into a single, atomic update. A transaction only succeeds if all the individual operations succeed. Otherwise, the transaction is canceled, and the database remains unchanged.

An in-memory key-value database serves as an excellent base for creating a caching system. Redis supports this mode of operation by having keys [expire](https://redis.io/docs/data-types/tutorial/#key-expiration) after a specified time. Alternatively, you can enable [key eviction](https://redis.io/docs/reference/eviction/) to have keys removed automatically when reaching predefined memory limits.

Redis can also serve as a messaging queue with a [publish-subscribe (pub-sub) model](https://redis.io/docs/manual/pubsub/). In a pub-sub model, clients can subscribe to channels to listen for incoming messages. Other clients can send messages to a specific channel that all subscribers of this channel will receive. The delivery semantics are "at most once," which means that messages may get lost but will never be delivered multiple times.

For fine-grained control, Redis supports server-side [scripting with Lua](https://redis.io/docs/manual/programmability/eval-intro/) and stored procedures that build upon [Redis Functions](https://redis.io/docs/manual/programmability/functions-intro/). If you want to get closer to the bare metal, you can even implement new data types and commands via the [Redis modules API](https://redis.io/docs/reference/modules/).

At the architectural level, Redis databases can be [clustered](https://redis.io/docs/management/scaling/) to support horizontal scaling and [replicated](https://redis.io/docs/management/replication/) for high availability and failover support.

You can see that Redis aggregates quite a few features that are particularly useful in distributed, high-performance applications. Let's go ahead and explore a few of these features.

## Getting Started with Redis in Go and GoLand

Have your GoLand IDE ready! The tutorial starts right after the preflight check.
