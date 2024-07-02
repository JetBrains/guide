---
type: TutorialStep
date: 2024-05-20
title: "Getting Started"
topics:
  - go
author: iu
subtitle: Setting Up Components for Dependency Injection.
thumbnail: ./thumbnail.png
---

To complete this part, you'll need the following:

- Familiarity with the Go programming language and the Go package installed on your local machine. The [Go documentation](https://go.dev/doc/install) provides steps on how to set up Go on your device.
- [GoLand](https://www.jetbrains.com/go/) (or another editor or IDE with support for Go).

## Getting Started with Dependency Injection in Go with Wire

This section explains how to use the Wire framework to create a simple Go application that incorporates dependency injection.

### Creating a Go Application

Launch your GoLand IDE and initiate a new Go project. Specify your preferred project name and location on your device to ensure proper organization.

Following that, create a `main.go` file within the project directory. This file will act as the central hub for your project's codebase.

### Creating Components

Proceed to create all the independent modules and components along with their parameter dependencies using the following piece of code:

```go
package main

import "fmt"

type User struct {
    name string
}

// NewUser - Creates a new instance of User
func NewUser(name string) User {
    return User{name: name}
}

// NewUserName - Returns a string to provide the name of a new user
func NewUserName() string {
    return "James"
}

// Get - A method with user as dependency
func (u *User) Get(message string) string {
    return fmt.Sprintf("Hello %s - %s", u.name, message)
}

// Run - Depends on user and calls the Get method on User
func Run(user User) {
    result := user.Get("It's nice to meet you!")
    fmt.Println(result)
}

func main() {

}
```

As specified in the previous installment:

- The `User` struct represents a user entity with a `name` property, with the `NewUser` function to create new instances of the `User` struct.
- The `Get` method is defined on the `User` struct and has a `message` parameter.
- The `Run` function depends on a `User` instance and calls the `Get` method on that instance. The resulting formatted string is then printed to the console.

Now that you have all your components ready, you can proceed to the implementation stage using the Wire framework to inject your component dependencies and run the application.
