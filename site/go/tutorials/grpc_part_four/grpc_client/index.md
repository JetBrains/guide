---
type: TutorialStep
date: 2024-05-27
title: "gRPC Client"
topics:
  - go
author: ab
subtitle: ""
thumbnail: ./thumbnail.png
---

## Creating the gRPC Client

Creating the client is not complicated, as you'll directly call the methods on the server. To set up the client, you'll interact with `pb.TaskServiceClient`. When you call a method on this instance, it invokes the corresponding method with the same name on the server. For example, calling `GetTask` on the client will invoke the `GetTask` function on the server.

### Calling the CreateTask Endpoint

Create a directory named `client` and a `client.go` file inside it. Start by importing the necessary module from `src/go`, then create a function to call the `CreateTask` function:

```go
package main

import (
    "context"
    pb "go-grpc-demo/src/go"
)

var createdTasks []string

func createTask(client pb.TaskServiceClient, createTaskRequest *pb.CreateTaskRequest) {

}
```

You can see that a `createdTasks` slice is also defined, which stores the IDs of the created tasks so that you can call the other endpoints on existing tasks.

The method is relatively straightforward, as you just need to call the `CreateTask` method on the client and pass it a `Context` and a `CreateTaskRequest`:

```go
func createTask(client pb.TaskServiceClient, createTaskRequest *pb.CreateTaskRequest) {
    log.Printf("Creating Task: { description: '%s', user_id: '%s', deadline: '%s' }", createTaskRequest.Description, createTaskRequest.UserId, createTaskRequest.Deadline)

    createdTask, err := client.CreateTask(context.Background(), createTaskRequest)

    if err == nil {
        log.Println(createdTask)
        createdTasks = append(createdTasks, createdTask.Id)
    }
}
```

Here, [`context.Background()`](https://pkg.go.dev/context#Background) has been used to provide an empty `Context`. This ensures this request is never canceled and has no timeout.

### Calling the GetTask Endpoint

Next, create a `getTask` function that invokes the `GetTask` endpoint, which simply calls the `GetTask` method of `client`:

```go
func getTask(client pb.TaskServiceClient, getTaskRequest *pb.GetTaskRequest) {

    task, err := client.GetTask(context.Background(), getTaskRequest)

    if err == nil {
        log.Println(task)
    }
}
```

### Calling the RecordTasks Endpoint

You'll now tackle your first streaming endpoint. Let's start with the `RecordTasks` endpoint, a client-side streaming endpoint. Being a streaming endpoint, the `client.RecordTasks` method only takes a `Context` and returns a stream that can be used to send data to the server. Start by defining a `runRecordTasks` function that creates between two and ten tasks (chosen randomly). For each task, the deadline is chosen randomly between the current date and a hundred days later. The appropriate `CreateTaskRequest` entries are stored in a slice:

```go
func runRecordTasks(client pb.TaskServiceClient) {
    r := rand.New(rand.NewSource(time.Now().UnixNano()))
    tasksCount := int(r.Int31n(10)) + 2
    var createTaskRequests []*pb.CreateTaskRequest
    for i := 0; i < tasksCount; i++ {
        deadlineDaysAfter := int(r.Int31n(100))
        createTaskRequests = append(createTaskRequests, &pb.CreateTaskRequest{
            Description: "Task " + strconv.Itoa(i),
            UserId:      "1",
            Deadline:    timestamppb.New(time.Now().AddDate(0, 0, deadlineDaysAfter)),
        })
    }
}
```

Since this is a streaming endpoint, it's a good idea to use a context with a timeout so that the requests can be canceled in case they are not finished within a certain time:

```go
log.Printf("Recording %d tasks", tasksCount)
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second) // Cancel after 10 seconds
defer cancel()
```

Call the `RecordTasks` method on `client` to receive a stream:

```go
stream, err := client.RecordTasks(ctx)
if err != nil {
    log.Fatalf("error %v", err)
}
```

Iterate over `createTaskRequests` and send each `CreateTaskRequest` to the stream. Finally, call `CloseAndRecv` to close the stream and receive the `TaskSummary` response from the server:

```go
for _, createTaskRequest := range createTaskRequests {
    if err := stream.Send(createTaskRequest); err != nil {
        log.Fatalf("stream.Send(%v) failed: %v", createTaskRequest, err)
    }
}
reply, err := stream.CloseAndRecv()
if err != nil {
    log.Fatalf("error %v", err)
}
log.Printf("Tasks summary: %s tasks created", reply.NoOfTasksCreated)
```

Here's the full function:

```go
func runRecordTasks(client pb.TaskServiceClient) {
    r := rand.New(rand.NewSource(time.Now().UnixNano()))
    tasksCount := int(r.Int31n(10)) + 2
    var createTaskRequests []*pb.CreateTaskRequest
    for i := 0; i < tasksCount; i++ {
        deadlineDaysAfter := int(r.Int31n(100))
        createTaskRequests = append(createTaskRequests, &pb.CreateTaskRequest{
            Description: "Task " + strconv.Itoa(i),
            UserId:      "1",
            Deadline:    timestamppb.New(time.Now().AddDate(0, 0, deadlineDaysAfter)),
        })
    }

    log.Printf("Recording %d tasks", tasksCount)
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    stream, err := client.RecordTasks(ctx)
    if err != nil {
        log.Fatalf("error %v", err)
    }

    for _, createTaskRequest := range createTaskRequests {
        if err := stream.Send(createTaskRequest); err != nil {
            log.Fatalf("stream.Send(%v) failed: %v", createTaskRequest, err)
        }
    }
    reply, err := stream.CloseAndRecv()
    if err != nil {
        log.Fatalf("error %v", err)
    }
    log.Printf("Tasks summary: %s tasks created", reply.NoOfTasksCreated)
}
```

### Calling the ListTasks Endpoint

The next streaming endpoint you'll call is `ListTasks`, a server-side streaming endpoint. This time, calling `client.ListTasks` will give you a stream through which you can call the `Recv` method to read data:

```go
func listTasks(client pb.TaskServiceClient, userId string, deadline string) {
    log.Printf("Listing all tasks of User %s with deadline within %s", userId, deadline)

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    deadlineTime, err := time.Parse(time.RFC3339, deadline)
    if err != nil {
        log.Fatalf("error parsing time: %v", err)
    }
    stream, err := client.ListTasks(ctx, &pb.ListTasksRequest{
        UserId:   userId,
        Deadline: timestamppb.New(deadlineTime),
    })

    for {
        task, err := stream.Recv()
        if err == io.EOF {
            break
        }
        if err != nil {
            log.Fatalf("error %v", err)
        }
        log.Printf(
            "Task: { Id: %s, Description: '%s', Status: '%s', Deadline: '%s'  }",
            task.Id, task.Description, task.Status, task.Deadline.AsTime().Format(time.RFC3339))
    }
}
```

### Calling the TaskChat Endpoint

The last call is the `TaskChat` endpoint. Create a `runTaskChat` function and prepare a bunch of `TaskComment`s:

```go
func runTaskChat(client pb.TaskServiceClient) {
    comments := []*pb.TaskComment{
        {UserId: "1", TaskId: createdTasks[0], Comment: "Comment 1", CreatedAt: timestamppb.Now()},
        {UserId: "2", TaskId: createdTasks[0], Comment: "Comment 2", CreatedAt: timestamppb.Now()},
        {UserId: "1", TaskId: createdTasks[0], Comment: "Comment 3", CreatedAt: timestamppb.Now()},
        {UserId: "1", TaskId: createdTasks[0], Comment: "Comment 4", CreatedAt: timestamppb.Now()},
        {UserId: "3", TaskId: createdTasks[0], Comment: "Comment 5", CreatedAt: timestamppb.Now()},
        {UserId: "2", TaskId: createdTasks[0], Comment: "Comment 6", CreatedAt: timestamppb.Now()},
        {UserId: "3", TaskId: createdTasks[0], Comment: "Comment 7", CreatedAt: timestamppb.Now()},
    }
}
```

As with the other streaming endpoints, calling `client.TaskChat` will give you a stream:

```go
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

stream, err := client.TaskChat(ctx)
if err != nil {
    log.Fatalf("error: %v", err)
}
```

To read the comments, you'll create a goroutine that will call the `Recv` method of the stream and print the received comments:

```go
wc := make(chan struct{})
go func() {
    for {
        in, err := stream.Recv()
        if err == io.EOF {
            close(wc)
            return
        }
        if err != nil {
            log.Fatalf("error: %v", err)
        }
        log.Printf("Got comment at task %s by user %s", in.TaskId, in.UserId)
    }
}()
```

In the main thread, you'll use `stream.Send` to send the comments to the server. Once finished, call the `CloseSend` method to close the stream:

```go
for _, comment := range comments {
    if err := stream.Send(comment); err != nil {
        log.Fatalf("Send failed %v", err)
    }
}
stream.CloseSend()
<-wc
```

The whole function looks like this:

```go
func runTaskChat(client pb.TaskServiceClient) {
    comments := []*pb.TaskComment{
        {UserId: "1", TaskId: createdTasks[0], Comment: "Comment 1", CreatedAt: timestamppb.Now()},
        {UserId: "2", TaskId: createdTasks[0], Comment: "Comment 2", CreatedAt: timestamppb.Now()},
        {UserId: "1", TaskId: createdTasks[0], Comment: "Comment 3", CreatedAt: timestamppb.Now()},
        {UserId: "1", TaskId: createdTasks[0], Comment: "Comment 4", CreatedAt: timestamppb.Now()},
        {UserId: "3", TaskId: createdTasks[0], Comment: "Comment 5", CreatedAt: timestamppb.Now()},
        {UserId: "2", TaskId: createdTasks[0], Comment: "Comment 6", CreatedAt: timestamppb.Now()},
        {UserId: "3", TaskId: createdTasks[0], Comment: "Comment 7", CreatedAt: timestamppb.Now()},
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    stream, err := client.TaskChat(ctx)
    if err != nil {
        log.Fatalf("error: %v", err)
    }

    wc := make(chan struct{})
    go func() {
        for {
            in, err := stream.Recv()
            if err == io.EOF {
                close(wc)
                return
            }
            if err != nil {
                log.Fatalf("error: %v", err)
            }
            log.Printf("Got comment at task %s by user %s", in.TaskId, in.UserId)
        }
    }()

    for _, comment := range comments {
        if err := stream.Send(comment); err != nil {
            log.Fatalf("Send failed %v", err)
        }
    }
    stream.CloseSend()
    <-wc
}
```
