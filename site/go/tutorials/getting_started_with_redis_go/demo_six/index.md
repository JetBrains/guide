---
type: TutorialStep
date: 2024-04-22
title: "Pub-Sub Messaging"
topics:
  - go
  - databases
  - redis
author: cb
subtitle: Simplifying Communication Between Applications.
thumbnail: ./thumbnail.png
---

The last feature that this tutorial explores is publish-subscribe messaging, or pub-sub for short. In the scenario, the teams must go through several challenges to rescue the chickens. The challenges are stored as a sorted set, where the "score" is used to define the sequence of the challenges.

To manage the challenges, an entity—let's call it the "dungeon master"—publishes each challenge to a dedicated channel that each of the teams subscribes to. If a team is ready for the next challenge, it fetches the next challenge from the channel in the order it was published.

#### Subscribing to a Channel

Each team manages its own client and pub-sub channel, which is best modeled using a struct:

```go
type Team struct {
    name    string
    client  *redis.Client
    channel *redis.PubSub
}
```

The project code (in file `pubsub.go`) fetches the team names from the database:

```go
func getTeams(client *redis.Client) []Team {
    teams := make([]Team, 3)
    for i, name := range []string{"team:Grumblebum", "team:Knucklewimp", "team:Snarkdumbthimble" } {
       teams[i].name = name
       // Each team uses its own client
       teams[i].client = newClient(dbconn, 0)
    }
    return teams
}
```

For brevity, this is only a dummy version of the code that creates a slice of teams and sets the `name` and `client` fields.

Each team subscribes to the `challenge` channel via [`client.Subscribe()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.Subscribe). But there is a small catch: `client.Subscribe()` does not wait for a response from Redis. Therefore, you need to call the [`pubsub.Receive()`](https://pkg.go.dev/github.com/redis/go-redis/v9#PubSub.Receive) method until it returns a message. Usually, the message type is `*client.Subscription`, which is a confirmation for the subscription. But if this is not the first subscription to that channel (in other words, the channel is already active), the `Receive()` call might return other messages or a `PONG` reply.

For these reasons, the `subscribe()` method for the `Team` struct is a bit more involved than you might expect:

```go
const (
    // The name of the pub-sub channel
    pubsubChan = "challenge"
)

func (team *Team) subscribe() error {
    ctx := context.Background()
    // Subscribe to the "challenge" channel
    pubSub := team.client.Subscribe(ctx, pubsubChan)

    // The first Subscribe() call creates the channel.
    // Until that point, any attempt to publish something fails.
    reply, err := pubSub.Receive(ctx)
    if err != nil {
       return fmt.Errorf("subscribing to channel '%s' failed: %w", pubsubChan, err)
    }
    // Expected response type is "*Subscription". Otherwise, something failed.
    switch reply.(type) {
    case *redis.Subscription:
       // Success!
    case *redis.Message:
       // The channel is already active and contains messages, hence also a success
    case *redis.Pong:
       // Let's call it a success
    default:
       return fmt.Errorf("subscribing to a channel failed: received a reply of type %T, expected: *redis.Subscription", reply)
    }

    team.channel = pubSub

    fmt.Printf("%s subscribed to channel '%s'\n", team.name, pubsubChan)
    return nil
}
```

#### Receiving Messages from a Subscribed Channel

After subscribing, the `Team` can receive messages. To allow for non-blocking operations, the `receive()` method in `pubsub.go` is designed for concurrent use. It enters an indefinite loop and sends all received messages to a result channel of type `Res`:

```go
type Res struct {
    result string
    err    error
}
```

The loop exits if the pub-sub channel is closed or if the context is done:

```go
func (team *Team) receive(ctx context.Context, resChan chan<- Res) {
    ch := team.channel.Channel()
    defer close(resChan)
    for {
       select {
       case msg, ok := <-ch:
          if !ok {
             // The pub-sub channel has been closed
             return
          }
          resChan <- Res{fmt.Sprintf("%s received challenge '%s'", team.name, msg.Payload), nil}
       case <-ctx.Done():
          resChan <- Res{"", ctx.Err()}
          return
       }
    }
}
```

#### Publishing Messages

Compared to subscribing to a channel and receiving messages, subscribing is rather straightforward. The method [`client.Publish()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.Publish) takes the name of the pub-sub channel and a message (of type `any`) and sends the message to the channel:

```go
func publish(client *redis.Client, challenge string) error {
    ctx := context.Background()
    return client.Publish(ctx, pubsubChan, challenge).Err()
}
```

### Wiring Up All the Pieces

There are only a few steps left to put everything together and provide the teams with challenges.

#### Subscribing Each Team to the Channel

This step is straightforward, thanks to the `subscribe()` method defined earlier:

```go
func pubsub(client *redis.Client) (err error) {
    ctx := context.Background()

    // Step 1: subscribe each team
    teams := getTeams(client)
    for i := 0; i < 3; i++ {
       err = teams[i].subscribe()
       if err != nil {
          return fmt.Errorf("subscribing failed: %w", err)
       }
    }
```

#### Publishing All Challenges in the Correct Sequence

Here, you have to fetch the challenges from the sorted set `challenges`:

```go
       for i := int64(0); i < 5; i++ {
       challenge := client.ZRange(ctx, "challenges", i, i).Val()[0]
       err = publish(client, challenge)
       if err != nil {
          return fmt.Errorf("cannot publish challenge %s: %w", challenge, err)
       }
    }
```

The [`ZRange()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.ZRange) method returns a specified range from a sorted set. In this case, the "Z" stands for "sorted set" because "S" is already taken. By setting the start and end of the range to the same value, you can use `ZRange` to return the challenges one by one. Then, call the `publish()` function to send each message to the `challenge` channel.

When a channel is not used anymore, it can be closed. This frees up resources, as the listening parties can detect that event and stop listening.

The Redis `client` type has no method for closing a channel, but the `pubsub` type does. Therefore, you can pick one of the `Team`s and call the [`pubsub.Close()`](https://pkg.go.dev/github.com/redis/go-redis/v9#PubSub.Close) method through its `channel` field.

For demonstration purposes, you can use a delayed call to `Close()`:

```go
    time.AfterFunc(time.Second, func() {
       teams[0].channel.Close()
       fmt.Println(`PubSub channel "challenges" closed`)
    })
```

#### Starting the Teams' Receive Methods Concurrently and Collecting the Results

Finally, you can start the teams' receive loops in a goroutine. The `receive()` methods receive a channel to which they send all messages they receive. You only need to collect the messages by ranging over that channel:

```go
    // Step 3: receive published messages
    rch := make(chan Res)
    for i := 0; i < 3; i++ {
       go teams[i].receive(ctx, rch)
    }
    for msg := range rch {
       if msg.err != nil {
          return fmt.Errorf("cannot receive challenge: %w", msg.err)
       }
       fmt.Println(msg.result)
    }

    return nil
}
```

### Result

Run the configuration `RedisDemo 6: pub/sub`. The output shows how the messages are sent to the channel, how the teams subscribe, and how they receive the messages:

```
Pub/Sub: Publish challenges to subscribed teams
team:Grumblebum subscribed to channel 'challenge'
team:Snarkdumbthimble subscribed to channel 'challenge'
team:Knucklewimp subscribed to channel 'challenge'
publishing challenge 'Enter the hidden dungeon'
publishing challenge 'Find the chicken coop'
publishing challenge 'Defeat the goblins'
publishing challenge 'Rescue the chickens'
publishing challenge 'Escape the dungeon'
team:Knucklewimp received challenge 'Enter the hidden dungeon'
team:Knucklewimp received challenge 'Find the chicken coop'
team:Knucklewimp received challenge 'Defeat the goblins'
team:Knucklewimp received challenge 'Rescue the chickens'
team:Knucklewimp received challenge 'Escape the dungeon'
team:Grumblebum received challenge 'Enter the hidden dungeon'
team:Grumblebum received challenge 'Find the chicken coop'
team:Grumblebum received challenge 'Defeat the goblins'
team:Grumblebum received challenge 'Rescue the chickens'
team:Grumblebum received challenge 'Escape the dungeon'
team:Snarkdumbthimble received challenge 'Enter the hidden dungeon'
team:Snarkdumbthimble received challenge 'Find the chicken coop'
team:Snarkdumbthimble received challenge 'Defeat the goblins'
team:Snarkdumbthimble received challenge 'Rescue the chickens'
team:Snarkdumbthimble received challenge 'Escape the dungeon'
PubSub channel "challenges" closed
```

If you made it this far, congratulations! You've learned a lot about Redis and can start your own Redis projects. More importantly, you now know how to organize a team of fearless heroes and send them on a noble quest!
