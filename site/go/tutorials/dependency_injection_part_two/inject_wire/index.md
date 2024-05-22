---
type: TutorialStep
date: 2024-05-20
title: "Go with Wire"
topics:
  - go
author: iu
subtitle: Leveraging Wire for Dependency Injection
thumbnail: ./thumbnail.png
---

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

### Injecting Dependencies with Wire

To begin the process, open your GoLand terminal and execute the following command to install Wire:

```go
go install github.com/google/wire/cmd/wire@latest
```

> For go versions prior to 1.17 `go get github.com/google/wire/cmd/wire@latest` can be used.

Proceed to create a new file called `wire.go` in the same folder as your `main.go` file. This newly created file will serve as the designated location for defining the dependency provision logic:

```go
//go:build wireinject
// +build wireinject

package main

import "github.com/google/wire"

func Initialize() User {
    wire.Build(NewUser, NewUserName)
    return User{}
}
```

The above code employs the Wire framework to facilitate the resolution of all necessary dependencies within the application. This is achieved with the `wire.Build` accessor, which orchestrates the process of dependency injection.

It incorporates a [build constraint](https://www.jetbrains.com/help/go/configuring-build-constraints-and-vendoring.html) of `// +build wireinject` to ensure the smooth execution of the build process. This constraint ensures that the file is excluded during the build phase since its primary role is to convey crucial information regarding the dependencies required for code generation. By excluding it, you prevent the occurrence of duplicate function names, preserving the integrity of the solution.

Now, launch the GoLand terminal and run the following command to generate the dependency file:

```go
wire
```

After the successful execution of the above command, the Wire framework generates a file named `wire_gen.go`. This file contains the mapping of dependencies, showcasing the relationship between different components and their associated dependencies. The structure and content of the `wire_gen.go` file will resemble the following example:

![Wire command result](https://i.imgur.com/FCghTMC.png)

Next, utilize the `Initialize()` function from the generated `wire_gen.go` file in the `main()` function of your `main.go` file:

```go
func main() {
    user := Initialize()
    Run(user)
}
```

Finally, run the code with the GoLand run configuration by simply clicking the play icon at the left side of the `main()` function in your `main.go` file:

![Code run with GoLand configuration](https://i.imgur.com/8CYrNXl.png)

Next, select the **Run 'go build <PROJECT NAME>'** option. Your result should be similar to the image below:

![Code run result with GoLand configuration](https://i.imgur.com/TgO8ZgW.png)

Alternatively, you can run the `main()` function along with the generated code in the GoLand terminal using the following command:

```go
go run main.go wire_gen.go
```

The appropriate result should be printed in the terminal:

![Code run result](https://i.imgur.com/Bc8N2wy.png)

### Testing

Create a new file called `main_test.go` in the same folder as your `main.go` file. You can test your new application with the same test cases used in the first part of this series:

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

Now, execute the tests either through the built-in GoLand run feature or the terminal. Upon running the tests, the expected outcome should be a successful execution with all tests passing:

![Test results](https://i.imgur.com/vhRcWZT.png)
