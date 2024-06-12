---
type: TutorialStep
date: 2024-05-27
title: "Comments Table"
topics:
  - go
author: ab
subtitle: Finalizing the gRPC Server - Creating the Comments Table and Endpoints
thumbnail: ./thumbnail.png
---

## Creating the Comments Table

First, open the database console tab and execute the following query to create the `comments` table that will be used in the `TaskChat` endpoint:

```sql
CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    task_id INT,
    user_id INT,
    comment TEXT,
    created_at timestamptz,
    CONSTRAINT fk_task
                     FOREIGN KEY (task_id)
                     REFERENCES tasks(id)
);
```

Similar to `tasks`, the `comments` table mirrors the structure in `tasks.proto`. The `task_id` column is a foreign key referencing the `id` column of the `tasks` table.

## Finishing the gRPC Server

With the table in place, it's time to finish the rest of the server.

### The ListTasks Endpoint

The first streaming endpoint that you'll write is `ListTasks`. This is a unidirectional server-side streaming API, as indicated by the second parameter of the function being `pb.TaskService_ListTasksServer`. This is a stream with a `Send` method that can be used to stream data to the client:

```go
func (s *taskServiceServer) ListTasks(request *pb.ListTasksRequest, stream pb.TaskService_ListTasksServer) error {

}
```

The next step is to get a list of all tasks with the given user ID that have deadlines before the given deadline:

```go
func (s *taskServiceServer) ListTasks(request *pb.ListTasksRequest, stream pb.TaskService_ListTasksServer) error {
    query := `
        SELECT * FROM tasks WHERE user_id=$1 AND deadline < $2;
    `
    rows, err := db.Query(query, request.UserId, request.Deadline.AsTime())
    if err != nil {
        return err
    }
}
```

Now, you'll need to iterate over all rows and construct the `pb.Task` entity for each row:

```go
for rows.Next() {
    var (
        id          int
        description string
        user_id     int
        status      string
        deadline    string
        created_at  string
    )
    err = rows.Scan(&id, &description, &user_id, &status, &deadline, &created_at)
    if err != nil {
        return err
    }

    deadlineTime, err := time.Parse(time.RFC3339, deadline)
    if err != nil {
        log.Fatalf("Error: Invalid time for deadline: %v", err)
    }
    createdAtTime, err := time.Parse(time.RFC3339, created_at)
    if err != nil {
        log.Fatalf("Error: Invalid time for created_at: %v", err)
    }
    task := &pb.Task{
        Id:          strconv.Itoa(id),
        Description: description,
        UserId:      strconv.Itoa(user_id),
        Status:      pb.TaskStatus(pb.TaskStatus_value[status]),
        Deadline:    timestamppb.New(deadlineTime),
        CreatedAt:   timestamppb.New(createdAtTime),
    }
}
```

This code is very similar to the `GetTask` method, so you should already be familiar with what's happening in the code.

The last step is to call the `Send` method of `stream` and send the `Task`:

```go
err = stream.Send(task)
if err != nil {
    return err
}
```

The whole function looks like this:

```go
func (s *taskServiceServer) ListTasks(request *pb.ListTasksRequest, stream pb.TaskService_ListTasksServer) error {
    query := `
        SELECT * FROM tasks WHERE user_id=$1 AND deadline < $2;
    `
    rows, err := db.Query(query, request.UserId, request.Deadline.AsTime())
    if err != nil {
        return err
    }
    for rows.Next() {
        var (
            id          int
            description string
            user_id     int
            status      string
            deadline    string
            created_at  string
        )
        err = rows.Scan(&id, &description, &user_id, &status, &deadline, &created_at)
        if err != nil {
            return err
        }

        deadlineTime, err := time.Parse(time.RFC3339, deadline)
        if err != nil {
            log.Fatalf("Error: Invalid time for deadline: %v", err)
        }
        createdAtTime, err := time.Parse(time.RFC3339, created_at)
        if err != nil {
            log.Fatalf("Error: Invalid time for created_at: %v", err)
        }
        task := &pb.Task{
            Id:          strconv.Itoa(id),
            Description: description,
            UserId:      strconv.Itoa(user_id),
            Status:      pb.TaskStatus(pb.TaskStatus_value[status]),
            Deadline:    timestamppb.New(deadlineTime),
            CreatedAt:   timestamppb.New(createdAtTime),
        }
        err = stream.Send(task)
        if err != nil {
            return err
        }
    }
    return nil
}
```

### The RecordTasks Endpoint

Before proceeding with the `RecordTasks` endpoint, you can refactor the logic of creating `Task` from `CreateTaskRequest` and saving it into the database into a separate method since you'll be reusing the same code for the `RecordTasks` endpoint. Create the following `createTaskFromRequest`:

```go
func createTaskFromRequest(request *pb.CreateTaskRequest) (*pb.Task, error) {
    var task = &pb.Task{
        Description: request.Description,
        UserId:      request.UserId,
        Deadline:    request.Deadline,
        CreatedAt:   timestamppb.Now(),
        Status:      pb.TaskStatus_TASK_STATUS_INCOMPLETE,
    }

    var taskId int

    insertStmt := `
        INSERT INTO tasks("description", "user_id", "status", "deadline", "created_at")
        VALUES($1, $2, $3, $4, $5) RETURNING id;
    `
    err := db.QueryRow(insertStmt, task.Description, task.UserId, pb.TaskStatus_name[int32(task.Status)], task.Deadline.AsTime(), task.CreatedAt.AsTime()).Scan(&taskId)
    if err != nil {
        return nil, err
    }

    task.Id = strconv.Itoa(taskId)
    return task, nil
}
```

The `CreateTask` function now becomes a delegate for `createTaskFromRequest`:

```go
func (s *taskServiceServer) CreateTask(ctx context.Context, request *pb.CreateTaskRequest) (*pb.Task, error) {
    return createTaskFromRequest(request)
}
```

The `RecordTasks` endpoint is a unidirectional client-side streaming endpoint. This time, it receives a parameter of type `pb.TaskService_RecordTasksServer`:

```go
func (s *taskServiceServer) RecordTasks(stream pb.TaskService_RecordTasksServer) error {

}
```

This type has two methods that you'll use: `Recv` to receive the data from the stream and `SendAndClose` to send a response and close the stream.

You'll start by declaring the necessary variables, including `count` to store the number of tasks recorded, which will be returned in the response:

```go
func (s *taskServiceServer) RecordTasks(stream pb.TaskService_RecordTasksServer) error {
    var createTaskRequest *pb.CreateTaskRequest
    var err error
    count := 0
}
```

Then, you'll iterate in an infinite loop until you reach the end of the stream or encounter an error:

```go
for {
    createTaskRequest, err = stream.Recv()
    if err == io.EOF {
        return stream.SendAndClose(&pb.TaskSummary{
            NoOfTasksCreated: strconv.Itoa(count),
        })
    }
    if err != nil {
        return err
    }
}
```

Finally, save the task and increment `count`:

```go
_, err := createTaskFromRequest(createTaskRequest)
if err != nil {
    return err
}
count++
```

Here's the `RecordTasks` function in its entirety:

```go
func (s *taskServiceServer) RecordTasks(stream pb.TaskService_RecordTasksServer) error {
    var createTaskRequest *pb.CreateTaskRequest
    var err error
    count := 0
    for {
        createTaskRequest, err = stream.Recv()
        if err == io.EOF {
            return stream.SendAndClose(&pb.TaskSummary{
                NoOfTasksCreated: strconv.Itoa(count),
            })
        }
        if err != nil {
            return err
        }
        _, err := createTaskFromRequest(createTaskRequest)
        if err != nil {
            return err
        }
        count++
    }
}
```

### The TaskChat Endpoint

The final candidate for this part is the `TaskChat` function, a bidirectional streaming endpoint. It receives an instance of `pb.TaskService_TaskChatServer`, which has both `Recv` and `Send` methods for receiving and sending data, respectively:

```go
func (s *taskServiceServer) TaskChat(stream pb.TaskService_TaskChatServer) error {

}
```

As before, you start with an infinite loop that stops when the end of the stream is reached or until an error occurs:

```go
func (s *taskServiceServer) TaskChat(stream pb.TaskService_TaskChatServer) error {
    for {
        in, err := stream.Recv()
        if err == io.EOF {
            return nil
        }
        if err != nil {
            return err
        }
    }
}
```

Use the `Recv` method to read the input from the stream and save the comment in the database:

```go
taskId := in.TaskId
userId := in.UserId
comment := in.Comment

insertStmt := `INSERT INTO comments("task_id", "user_id", "comment") VALUES($1, $2, $3)`
_, err = db.Exec(insertStmt, taskId, userId, comment)
if err != nil {
    return err
}
```

Finally, construct an instance of `pb.TaskComment` and send it to the stream:

```go
taskComment := &pb.TaskComment{
    TaskId:    taskId,
    UserId:    userId,
    Comment:   comment,
    CreatedAt: timestamppb.Now(),
}

if err := stream.Send(taskComment); err != nil {
    return err
}
```

The entire function looks like this:

```go
func (s *taskServiceServer) TaskChat(stream pb.TaskService_TaskChatServer) error {
    for {
        in, err := stream.Recv()
        if err == io.EOF {
            return nil
        }
        if err != nil {
            return err
        }

        taskId := in.TaskId
        userId := in.UserId
        comment := in.Comment

        insertStmt := `INSERT INTO comments("task_id", "user_id", "comment") VALUES($1, $2, $3)`
        _, err = db.Exec(insertStmt, taskId, userId, comment)
        if err != nil {
            return err
        }

        taskComment := &pb.TaskComment{
            TaskId:    taskId,
            UserId:    userId,
            Comment:   comment,
            CreatedAt: timestamppb.Now(),
        }

        if err := stream.Send(taskComment); err != nil {
            return err
        }
    }
}
```

Here's the complete `server.go` code for your reference:

```go
package main

import (
    "context"
    "database/sql"
    "fmt"
    _ "github.com/lib/pq"
    pb "go-grpc-demo/src/go"
    "google.golang.org/grpc"
    "google.golang.org/protobuf/types/known/timestamppb"
    "io"
    "log"
    "net"
    "strconv"
    "time"
)

const (
    host     = "localhost"
    port     = 5432
    user     = "postgres"
    password = ""
    dbname   = "go_grpc_demo"
)

var db *sql.DB

func initDB() error {
    var err error

    connectionString := fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=disable", user, password, host, port, dbname)

    db, err = sql.Open("postgres", connectionString)

    if err != nil {
        return err
    }

    err = db.Ping()
    if err != nil {
        return err
    }
    return nil
}

type taskServiceServer struct {
    pb.UnimplementedTaskServiceServer
}

func createTaskFromRequest(request *pb.CreateTaskRequest) (*pb.Task, error) {
    var task = &pb.Task{
        Description: request.Description,
        UserId:      request.UserId,
        Deadline:    request.Deadline,
        CreatedAt:   timestamppb.Now(),
        Status:      pb.TaskStatus_TASK_STATUS_INCOMPLETE,
    }

    var taskId int

    insertStmt := `
        INSERT INTO tasks("description", "user_id", "status", "deadline", "created_at")
        VALUES($1, $2, $3, $4, $5) RETURNING id;
    `
    err := db.QueryRow(insertStmt, task.Description, task.UserId, pb.TaskStatus_name[int32(task.Status)], task.Deadline.AsTime(), task.CreatedAt.AsTime()).Scan(&taskId)
    if err != nil {
        return nil, err
    }

    task.Id = strconv.Itoa(taskId)
    return task, nil
}
func (s *taskServiceServer) CreateTask(ctx context.Context, request *pb.CreateTaskRequest) (*pb.Task, error) {
    return createTaskFromRequest(request)
}

func (s *taskServiceServer) GetTask(ctx context.Context, request *pb.GetTaskRequest) (*pb.Task, error) {
    var (
        id          int
        description string
        user_id     int
        status      string
        deadline    string
        created_at  string
    )
    err := db.QueryRow("SELECT * FROM tasks WHERE tasks.id = $1", request.TaskId).Scan(
        &id, &description, &user_id, &status, &deadline, &created_at)
    if err != nil {
        return nil, err
    }

    deadlineTime, err := time.Parse(time.RFC3339, deadline)
    if err != nil {
        log.Fatalf("Error: Invalid time for deadline: %v", err)
    }
    createdAtTime, err := time.Parse(time.RFC3339, created_at)
    if err != nil {
        log.Fatalf("Error: Invalid time for created_at: %v", err)
    }
    task := &pb.Task{
        Id:          strconv.Itoa(id),
        Description: description,
        UserId:      strconv.Itoa(user_id),
        Status:      pb.TaskStatus(pb.TaskStatus_value[status]),
        Deadline:    timestamppb.New(deadlineTime),
        CreatedAt:   timestamppb.New(createdAtTime),
    }
    return task, nil
}

func (s *taskServiceServer) ListTasks(request *pb.ListTasksRequest, stream pb.TaskService_ListTasksServer) error {
    query := `
        SELECT * FROM tasks WHERE user_id=$1 AND deadline < $2;
    `
    rows, err := db.Query(query, request.UserId, request.Deadline.AsTime())
    if err != nil {
        return err
    }
    for rows.Next() {
        var (
            id          int
            description string
            user_id     int
            status      string
            deadline    string
            created_at  string
        )
        err = rows.Scan(&id, &description, &user_id, &status, &deadline, &created_at)
        if err != nil {
            return err
        }

        deadlineTime, err := time.Parse(time.RFC3339, deadline)
        if err != nil {
            log.Fatalf("Error: Invalid time for deadline: %v", err)
        }
        createdAtTime, err := time.Parse(time.RFC3339, created_at)
        if err != nil {
            log.Fatalf("Error: Invalid time for created_at: %v", err)
        }
        task := &pb.Task{
            Id:          strconv.Itoa(id),
            Description: description,
            UserId:      strconv.Itoa(user_id),
            Status:      pb.TaskStatus(pb.TaskStatus_value[status]),
            Deadline:    timestamppb.New(deadlineTime),
            CreatedAt:   timestamppb.New(createdAtTime),
        }
        err = stream.Send(task)
        if err != nil {
            return err
        }
    }
    return nil
}

func (s *taskServiceServer) RecordTasks(stream pb.TaskService_RecordTasksServer) error {
    var createTaskRequest *pb.CreateTaskRequest
    var err error
    count := 0
    for {
        createTaskRequest, err = stream.Recv()
        if err == io.EOF {
            return stream.SendAndClose(&pb.TaskSummary{
                NoOfTasksCreated: strconv.Itoa(count),
            })
        }
        if err != nil {
            return err
        }
        _, err := createTaskFromRequest(createTaskRequest)
        if err != nil {
            return err
        }
        count++
    }
}

func (s *taskServiceServer) TaskChat(stream pb.TaskService_TaskChatServer) error {
    for {
        in, err := stream.Recv()
        if err == io.EOF {
            return nil
        }
        if err != nil {
            return err
        }

        taskId := in.TaskId
        userId := in.UserId
        comment := in.Comment

        insertStmt := `INSERT INTO comments("task_id", "user_id", "comment") VALUES($1, $2, $3)`
        _, err = db.Exec(insertStmt, taskId, userId, comment)
        if err != nil {
            return err
        }

        taskComment := &pb.TaskComment{
            TaskId:    taskId,
            UserId:    userId,
            Comment:   comment,
            CreatedAt: timestamppb.Now(),
        }

        if err := stream.Send(taskComment); err != nil {
            return err
        }
    }
}

func main() {
    err := initDB()
    if err != nil {
        log.Fatalf("Error initiating database: %v", err)
    }

    lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", 9090))
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }

    grpcServer := grpc.NewServer()
    pb.RegisterTaskServiceServer(grpcServer, &taskServiceServer{})
    err = grpcServer.Serve(lis)
    if err != nil {
        log.Fatalf("Error starting gRPC server: %v", err)
    }
}
```

The entire code so far can be found in the `part3` branch of [this GitHub repo](https://github.com/heraldofsolace/go-grpc-demo/tree/part3).

## Conclusion

With that, you've completed the server! Well done! Now, why not take a break? You might want to finish that cup of coffee before proceeding to the [final part](../../grpc_part_four/), where you'll write the client and test the whole app.
