---
type: TutorialStep
date: 2024-05-16
title: "Go with FX"
topics:
  - go
author: israel
subtitle: ""
thumbnail: ./thumbnail.png
---

## Getting Started with Dependency Injection in Go with Fx

You'll next learn how to use the Fx framework to manage dependencies effectively and enhance modularity within your Go projects.

### Creating a Go Application

Launch your GoLand IDE and initiate the creation of a new Go project. Specify your preferred project name and choose the desired location on your local device for the project's directory.

Proceed to create a `main.go` file where you can write and organize your code.

### Creating Components

As you did with the other frameworks, proceed to create the individual components needed as well as their dependent components, as shown in the following code:

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

### Injecting Dependencies with Fx

You now need to install the Fx package and implement dependency injection.

To install the Fx package, launch the GoLand terminal and execute the following command:

```go
go get go.uber.org/fx@latest
```

Upon execution, you can expect an output similar to the following screenshot:

![Get Fx terminal result](https://i.imgur.com/pnZC4kH.png)

Next, in the `main()` function, provide the dependencies to Fx and invoke the `Run` function:

```go
func main() {
    fx.New(
        fx.Provide(
            NewUserName,
            NewUser,
        ),
        fx.Invoke(Run),
    ).Run()
}
```

Your `main.go` file should look something like this:

![Fx main function dependency injection](https://i.imgur.com/GbW0bCl.png)

Executing the code with the built-in GoLand run feature should produce this result:

![GoLand run result](https://i.imgur.com/5ssxHyK.png)

Alternatively, you can execute the `go run main.go` command from the GoLand terminal. You should get the following result:

![GoLand terminal result](https://i.imgur.com/ZwExGbv.png)

### Testing

Create a `main_test.go` file as in the previous framework implementations in this series and populate the test cases:

```go
package main

import (
    "fmt"
    "testing"
)

func TestNewUser(t *testing.T) {
    name := "James"
    expected := User{name: name}
    actual := NewUser(name)

    if actual != expected {
        t.Error("Expected User is not same as actual user")
    }
}

func TestUser_Get(t *testing.T) {
    name := "James"
    user := NewUser(name)
    message := "You look great"

    expected := fmt.Sprintf("Hello %s - %s", user.name, message)
    actual := user.Get(message)

    if actual != expected {
        t.Error("Expected User is not same as actual user")
    }
}
```

Finally, run the `go test` command or execute the test using the GoLand built-in run feature. The tests should be successful:

![Fx test result](https://i.imgur.com/hbIRsyB.png)
