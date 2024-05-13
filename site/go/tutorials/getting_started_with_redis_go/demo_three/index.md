---
type: TutorialStep
date: 2024-04-22
title: "Expiring Keys"
topics:
  - go
  - databases
  - redis
author: chrisberger
subtitle: ""
thumbnail: ./thumbnail.png
---

While Redis can be seen as a sophisticated key-value database, it really excels as an in-memory caching service. Here is a typical use case for caching services: If an application uses a disk-based database and a performance analysis reveals that the application accesses a small part of the data over and over again, an in-memory cache can accelerate access to that subset of data.

This caching can be done in two ways:

1. Data fetched from the on-disk database is cached in Redis until a predefined memory limit is reached. The keys that are either least recently used or least frequently used are then removed from Redis.
2. Every key gets a timeout or time to live (TTL) assigned, after which the key expires and gets removed from Redis. Reading a key through `Get()` does not extend the timeout, but the [`GetEx()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.GetEx) and [`Expire()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.Expire) commands allow setting a new timeout for a key. This way, frequently used keys can remain in memory, whereas rarely used keys expire quickly.

Using the first method requires configuring a memory limit for Redis, which this tutorial does not explore.

Expiring keys, on the other hand, can be controlled by code. Imagine that you need to temporarily add a new player to the list of players. After a given time, the player shall leave the team. This can be achieved using an ephemeral key. To make a key ephemeral, some commands like `Get()` provide an extra argument to specify a `time.Duration` value.

A player is a hash table, so you need to use the [`HSet()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.HSet) method to create a new player. `HSet()` creates a hash table that can hold an arbitrary number of name-value pairs, similar to Go's `map` type. As an example, to add a tenth player with their name, score, team, and number of completed challenges, you call `HSet()` with a context and the name of the key, followed by further arguments that represent the name of a hash table key and the corresponding value, then another name and a value, and so on:

```go
client.HSet(ctx, "player:10", "name", "Crymyios", "score", 0, "team", "Knucklewimp", "challenges_completed", 0)
```

The number of name-value elements is unrestricted, so there is no room for a final parameter for setting a timeout. This is in contrast to the `Set()` function above, which has a timeout parameter. Instead, you first create a non-expiring key and then assign a timeout by calling `client.Expire()`.

The following code (`expiringkeys.go`) creates a key `player:10` with a timeout of one second, then fetches the key three times with a half-second delay between the `HGet()` calls:

```go
func expiringKeys(client *redis.Client) error {
    ctx := context.Background()

    // Add a temporary player
    err := client.HSet(ctx, "player:10", "name", "Crymyios", "score", 0, "team", "Knucklewimp", "challenges_completed", 0).Err()
    if err != nil {
       return fmt.Errorf("cannot set player:10: %w", err)
    }

    // Set an expiration time for player:10
    if !client.Expire(ctx, "player:10", time.Second).Val() {
       return fmt.Errorf("cannot set expiration time for player:10")
    }

    // Get player:10
    for i := 0; i < 3; i++ {
       val, err := client.HGet(ctx, "player:10", "name").Result()
       if err != nil {
          fmt.Printf("player:10 has expired: %v\n", err)
          return nil
       }
       fmt.Printf("player:10's name: %s\n", val)
       time.Sleep(500 * time.Millisecond)
    }
    return nil
}
```

When you run the code (through the run configuration `RedisDemo 3: expire`), you should see the following output:

```
Expire: Add a player temporarily
player:10's name: Crymyios
player:10's name: Crymyios
player:10 has expired: redis: nil
```

Your app can now refresh the key from its original source, such as a disk-based database or a remote database server.

Now let's look at some advanced Redis features: pipelines, transactions, and pub-sub messaging.
