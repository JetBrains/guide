---
type: TutorialStep
date: 2024-04-22
title: "Pipelines: Running Redis Commands in Batches"
topics:
  - go
  - databases
  - redis
author: chrisberger
subtitle: Efficiency in Bulk - Maximizing Performance with Redis Pipelines
thumbnail: ./thumbnail.png
---

Redis runs as a server, and the client sends all commands over a network connection, even if both server and client are on the same machine. If you have a larger number of commands to execute, the time to send each command to Redis and receive the result can quickly add up and make the whole operation inefficient.

To reduce these roundtrip times to a minimum, Redis provides pipelines. If you have a set of commands where none of the commands depend on the output of a previous one, you can send them in a single batch and receive all the results in a single response.

For example, if a team has successfully completed a challenge, you want to update the `score` and `challenges_completed` fields of all players on that team. To waste no time, you want to send all the commands in a batch.

To do this, use the method [`Pipelined()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.Pipelined) to create a Redis pipeline:

```go
func pipeline(client *redis.Client) error {
    ctx := context.Background()

    _, err := client.Pipelined(ctx, func(pipe redis.Pipeliner) error {
       err := pipe.HSet(ctx, "player:7", "score", 15, "challenges_completed", 1).Err()
       if err != nil {
          return err
       }
       err = pipe.HSet(ctx, "player:8", "score", 18, "challenges_completed", 1).Err()
       if err != nil {
          return err
       }
       err = pipe.HSet(ctx, "player:9", "score", 12, "challenges_completed", 1).Err()

       return err
    })
    if err != nil {
       return fmt.Errorf("pipelined failed: %w", err)
    }

    fmt.Printf("Player 7's score: %s, challenges completed: %s\n",
       client.HGet(ctx, "player:7", "score").Val(),
       client.HGet(ctx, "player:7", "challenges_completed").Val())
    fmt.Printf("Player 8's score: %s, challenges completed: %s\n",
       client.HGet(ctx, "player:8", "score").Val(),
       client.HGet(ctx, "player:8", "challenges_completed").Val())
    fmt.Printf("Player 9's score: %s, challenges completed: %s\n",
       client.HGet(ctx, "player:9", "score").Val(),
       client.HGet(ctx, "player:9", "challenges_completed").Val())

    return nil
}
```

`Pipelined()` expects a function of type `func(pipe redis.Pipeliner) error` that you can implement as an anonymous function inside the call to `Pipelined`.

The anonymous function receives an argument `pipe` of type [`redis.Pipeliner`](https://pkg.go.dev/github.com/redis/go-redis/v9#Pipeliner) that can run Redis commands in pipeline mode.

The players are stored as hash tables. Instead of calling `client.HSet()`, you simply call `pipe.HSet()` to add this command to the pipeline. The enclosing `Pipelined()` method takes care of processing the pipeline you build inside the anonymous function.

The `fmt.Printf()` statements exist for inspection purposes, but you are welcome to turn them into another pipeline as an exercise.

#### Pipeline Efficiency

How much time does a pipeline save? Is it worth bothering with constructing a pipeline, especially if the Redis database runs on the same machine as the application?

Go's built-in benchmarking saves you from doing guesswork. The code in `pipeline_test.go` increments the scores of `player:1` and `player:2` through a thousand `HIncrBy()` calls. The [`HIncrBy`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.HIncrBy) method increments a given field of a hash map by one. It's important to note that the field's value must represent a numeric value.

The `HIncrBy()` calls for `player:1` are run inside a pipeline, whereas those for `player:2` are executed individually.

Run this benchmark through the run configuration `RedisDemo: pipeline benchmark`. In the run configuration menu, it appears separate from the other run configurations because it's a "Go Test" configuration.

This is the code in `pipeline_test.go`:

```go
func incrementScorePipe(client *redis.Client, player string) error {
    ctx := context.Background()
    client.Pipelined(ctx, func(pipe redis.Pipeliner) error {
       for i := 0; i < 1000; i++ {
          err := pipe.HIncrBy(ctx, player, "score", 1).Err()
          if err != nil {
             return fmt.Errorf("cannot increment score for player %s to %d: %w", player, i, err)
          }
       }
       pipe.HSet(ctx, player, "score", 1)
       return nil
    })
    return nil
}

func incrementScoreNoPipe(client *redis.Client, player string) error {
    ctx := context.Background()
    for i := 0; i < 1000; i++ {
       err := client.HIncrBy(ctx, player, "score", 1).Err()
       if err != nil {
          return fmt.Errorf("cannot increment score for player %s to %d: %w", player, i, err)
       }
    }
    client.HSet(ctx, player, "score", 1)
    return nil
}

func BenchmarkPipeline(b *testing.B) {
    client := newClient("localhost:6379", 0)
    b.Run("PipelinedHIncrBy", func(b *testing.B) {
       for i := 0; i < b.N; i++ {
          incrementScorePipe(client, "player:1")
       }
    })
}

func BenchmarkNoPipeline(b *testing.B) {
    client := newClient("localhost:6379", 0)
    b.Run("HIncrBy", func(b *testing.B) {
       for i := 0; i < b.N; i++ {
          incrementScoreNoPipe(client, "player:2")
       }
    })
}
```

The benchmark output should look similar to the one below:

```
BenchmarkPipeline
BenchmarkPipeline/PipelinedHIncrBy
BenchmarkPipeline/PipelinedHIncrBy-12         	    1468	    696864 ns/op
BenchmarkNoPipeline
BenchmarkNoPipeline/HIncrBy
BenchmarkNoPipeline/HIncrBy-12                	      50	  23708302 ns/op
PASS
```

The actual numbers depend on the machine used for benchmarking and thus will differ from these figures, but you should see a significant difference between the timings.

The roundtrip time of a command is consumed not only by network transmission but also by system calls. The pipeline reduces transmission time as well as the number of syscalls needed, which is why the speed gain is quite dramatic even if Redis runs on the same machine as the client.
