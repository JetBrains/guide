---
type: TutorialStep
date: 2024-04-22
title: "Best Practices"
topics:
  - go
  - databases
  - redis
author: chrisberger
subtitle: ""
thumbnail: ./thumbnail.png
---

To round off this tutorial, let's look into some best practices to keep in mind when working with Redis and Go.

### Prefer Using Transactions

More often than not, you will need to store complex data structures in Redis, spread across multiple keys. If inserting or updating such data requires multiple write operations, you will almost always want to use transactions for this in order to ensure data integrity.

### Use Pipelines

If you find your code updating large amounts of data in a loop, consider using a pipeline to maximize throughput.

### Consider Using Connection Pooling

Connections to databases are expensive to establish and consume resources. The number of open connections is typically limited by the Redis server through the `maxclients` setting. So, it's a good idea to maximize the use of an open connection through connection pooling.

If you use `go-redis`, this best practice is already [built into the library](https://redis.uptrace.dev/guide/go-redis-debugging.html#connection-pool-size), but other Redis packages might not provide this level of convenience. In this case, you need to set up a connection pool, request a connection from the pool, and return a connection to the pool when it's not needed anymore.

### Set Appropriate Key Expiration Times

If you use Redis as a cache, you can and should avoid using persistent keys. The main memory is typically much smaller than the disk space where the original data resides, which means the cache can only hold a fraction of the data. To limit memory use, you have two options:

- **Set a timeout for every key:** After the specified time, the key will be removed from memory. Optionally, you can have every read operation refresh the expiration time so that frequently used keys remain in memory for longer.
- **Configure Redis as a cache:** This is an alternative to using expiring keys. To [enable cache mode](https://redis.io/docs/management/config/#configuring-redis-as-a-cache), you configure a memory limit and a [key eviction policy](https://redis.io/docs/reference/eviction/) (such as least-recently-used or least-frequently-used).

### Prefer Lua Scripts for Complex Operations

Transactions allow you to treat multiple updates in an atomic way—that is, either all updates inside a transaction succeed or the transaction as a whole gets canceled. If you need to handle greater complexity than that, consider using [Lua scripts](https://redis.io/docs/interact/programmability/eval-intro/). Redis can execute Lua scripts on the server. Like transactions, scripts are guaranteed to have atomic execution. That is, either all effects of a Lua script happen or none happen. Furthermore, Lua scripts execute where the data lives and thus reduce expensive network operations.

The `go-redis` package allows Go code to manage and interact with Redis Lua scripts. Introducing Lua scripting in detail is beyond the scope of this article, but you can get a quick introduction [here](https://redis.uptrace.dev/guide/lua-scripting.html).

### Up Monitoring

Performance is crucial for database and cache systems, and running Redis without monitoring is like flying a plane with a blindfold on. `go-redis` comes with a package called [`redisotel`](https://pkg.go.dev/github.com/redis/go-redis/extra/redisotel/v9) for integrating with the OpenTelemetry observability framework.

Using `redisotel`, you can enable tracing and metrics instrumentation for your Go client; more information [here](https://redis.uptrace.dev/guide/go-redis-monitoring.html).
