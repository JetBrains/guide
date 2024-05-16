---
type: TutorialStep
date: 2024-04-22
title: "Learn Redis by Coding"
topics:
  - go
  - databases
  - redis
author: chrisberger
subtitle: Unlocking Key Concepts Through Six Interactive Demos
thumbnail: ./thumbnail.png
---

Now that you've set up and tested the data, you're probably wondering what all these funny player and team names are about. The data set simulates a role-playing game where several players gather into teams to go on a quest to rescue a group of chickens that have been taken hostage by a group of evil goblins. (See the string items `quest` and `description`.) The quest is named (drumroll) "The Chicken Coop Catastrophe."

This scenario requires the use of four different Redis data types: strings, hash tables, sets, and sorted sets.

The title and the description of the quest are saved as [string values](https://redis.io/docs/data-types/strings/).

Players are [hash tables](https://redis.io/docs/data-types/hashes/) that contain four field-value pairs:

- The player's name
- Their score
- The number of completed challenges
- The team they're on

Teams are [sets](https://redis.io/docs/data-types/sets/) of player names. There is some redundancy here because there is already a `team` key in each `player` table, but this was done intentionally to demonstrate the use of transactions later.

The quest consists of five challenges that are stored as a [sorted set](https://redis.io/docs/data-types/sorted-sets/) because the sequence of the challenges matters.

The rest of the tutorial uses this data set to walk you through the Redis tasks mentioned in the introduction.

Finally, you'll learn some best practices for using Redis with Go.

### The Chicken Coop Catastrophe

You've initialized the Redis database with the "chicken" quest and set up the GoLand IDE. Now you can move on to the code!

First, open `main.go` and briefly inspect the function `run()`. This function runs all the tutorial code. For each demo, `run()` calls a function defined in a separate file.

To know which demo to run, the `run()` function reads the first command line argument (if any), so you can run each demo by its name:

```go
run *.go ping
```

You can also run the demos through the project's run configurations, as demonstrated earlier.

### Creating a New Redis Client

As a basis for the subsequent Redis demos, you need to establish a connection to your Redis instance using `redis.NewClient()`:

```go
import "github.com/redis/go-redis/v9"

func newClient(conn string, db int) *redis.Client {
    return redis.NewClient(&redis.Options{
       Addr:     conn,
       DB:       db,
       Password: "",
    })
}
```

This function calls `redis.NewClient()` and fills the `Addr` and `DB` options accordingly. It can be found in `redisclient.go`.

`main.go` calls this function at the start of `run()`:

```go
client := newClient("localhost:6379", 0)
```

### Testing the Connection

The first demo is a connection test. The code in `ping.go` executes two client methods:

- [`Ping()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.Ping) for testing the connection. Redis should respond with `PONG`.
- [`ClientInfo()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.ClientInfo) for retrieving a [`ClientInfo struct`](https://pkg.go.dev/github.com/redis/go-redis/v9#ClientInfo) with information about the current Redis client.

All client methods require a `context.Context` as the first argument. In production code, the context should provide cancel or timeout options to handle broken connections gracefully, but for this tutorial, a background context is sufficient.

You can find this demo in `ping.go`. Select the run configuration `RedisDemo 1: ping` to run the code:

```go
func ping(client *redis.Client) error {
    // For the demo, you only need a background context
    ctx := context.Background()
    // Ping the Redis server, which should respond with PONG
    fmt.Println(client.Ping(ctx))

    // Get the client info
    info, err := client.ClientInfo(ctx).Result()
    if err != nil {
       return fmt.Errorf("method ClientInfo failed: %w", err)
    }

    fmt.Printf("%#v\n", info)
    return nil
}
```

You'll get an output similar to the following:

```
Ping: Ping the redis server
ping: PONG
&redis.ClientInfo{ID:154, Addr:"[::1]:55416", LAddr:"[::1]:6379", FD:15, Name:"", Age:0, Idle:0, Flags:0x0, DB:0, Sub:0, PSub:0, SSub:0, Multi:-1, QueryBuf:26, QueryBufFree:16864, ArgvMem:10, MultiMem:0, BufferSize:16384, BufferPeak:147, OutputBufferLength:0, OutputListLength:0, OutputMemory:0, TotalMemory:34058, Events:"r", LastCmd:"client|info", User:"default", Redir:-1, Resp:3, LibName:"", LibVer:""}
```
