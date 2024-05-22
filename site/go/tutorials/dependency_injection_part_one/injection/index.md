---
type: TutorialStep
date: 2024-05-20
title: "Injection During Initialization"
topics:
  - go
author: iu
subtitle: DI - The Key to Efficient Object Creation
thumbnail: ./thumbnail.png
---

With this, dependencies are provided to an object when it’s initialized. A function is used to initialize the object and the dependencies are declared as the parameters of this function.

In the example below, `UserService` depends on `Database`, which is injected via the `NewUserService` function:

```go
type Database struct {
    // ...
}

type UserService struct {
    db *Database
}

func NewUserService(db *Database) *UserService {
    return &UserService{
        db: db,
    }
}
```

### Property Injection

With property injection, the dependencies are set after the object is created, and dependencies are provided by setting the properties of an object.

Here's an implementation of property injection using the previous `UserService` and `Database` example:

```go
type Database struct {
    // ...
}

type UserService struct {
    db *Database
}

func (u *UserService) SetDatabase(db *Database) {
    u.db = db
}
```

### Interface Injection

Interface injection is also known as method injection. Here, the dependency is represented by an interface that the object depends on. The dependency is then set by providing the implementation of that interface, as shown below:

```go
type Database interface {
    // ...
}

type UserService struct {
    db Database
}

func (u *UserService) SetDatabase(db Database) {
    u.db = db
}
```
