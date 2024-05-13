---
type: TutorialStep
date: 2024-04-22
title: "Getting and Setting a Value"
topics:
  - go
  - databases
author: chrisberger
subtitle: ""
thumbnail: ./thumbnail.png
---

Let's start reading and updating the database. If you look into `setup.redis` or browse the database in the database tool, you'll see that the quest title is in all lowercase. A proper title, however, should be in title case! So first, you'll read the quest title, turn it into title case, and save it back to Redis.

The `quest` entry is a string type, so you can use the [`Get()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.Get) and [`Set()`](https://pkg.go.dev/github.com/redis/go-redis/v9#Client.Set) methods.

`Get()` is straightforward, and `Set()` almost equally so, except that `Set()` requires specifying an expiration time for the key. It's set to `0` here, which means the key does not expire. You'll learn more about expiring keys in the next demo. Run the demo code (`getandset.go`) through the run configuration `RedisDemo 2: get/set`:

```go
import (
    // ...
    "golang.org/x/text/cases"
    "golang.org/x/text/language"
)

func getAndSet(client *redis.Client) error {
    ctx := context.Background()

    quest, err := client.Get(ctx, "quest").Result()
    if err != nil {
       return fmt.Errorf("cannot get quest: %w", err)
    }

    quest = cases.Title(language.English).String(quest)

    err = client.Set(ctx, "quest", quest, 0).Err()
    if err != nil {
       return fmt.Errorf("cannot update quest: %w", err)
    }

    fmt.Printf("Quest is now: %s\n", client.Get(ctx, "quest").Val())

    return nil
}
```

The code should generate the following output:

```
Get/Set: Update the quest to title case
Quest is now: The Chicken Coop Catastrophe
```
