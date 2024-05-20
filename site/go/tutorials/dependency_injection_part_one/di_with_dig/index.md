---
type: TutorialStep
date: 2024-05-20
title: "Dependency Injection with Dig"
topics:
  - go
author: israel
subtitle: Digging into Dependency Injection - Unleashing the Power of Dig in Go
thumbnail: ./thumbnail.png
---

## Getting Started with Dependency Injection in Go with Dig

This section takes a practical look at how the Dig framework can be utilized to manage dependencies effectively and enhance modularity within your Go projects. You'll create a simple Go application that uses Dig to inject dependencies. You'll also learn how DI promotes testability by writing tests for your code.

### Prerequisites

To complete this section, you'll need the following:

- Familiarity with the Go programming language and the Go package installed on your local machine. The [Go documentation](https://go.dev/doc/install) provides steps on how to set up Go on your device.
- [GoLand](https://www.jetbrains.com/go/) (or another editor or IDE with support for Go).

### Creating a Go Application

To get started, open the GoLand IDE and create a new Go project:

![Create new project](https://i.imgur.com/3EqgJUW.png)

Specify your desired project name and location, and click the **Create** button to initiate the project creation process:

![Enter project name and location](https://i.imgur.com/XC3bAI4.png)

Next, create a `main.go` file where you can write and organize your code. This file will serve as the central location for your project's codebase.

### Creating Components

Next, proceed to create the components along with their respective dependencies. These dependencies will be passed as parameters during initialization of the components:

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

// Get - A method with user as dependency
func (u *User) Get(message string) string {
    return fmt.Sprintf("Hello %s - %s", u.name, message)
}

// Run - Depends on user and calls the Get method on User
func Run(user User) {
    result := user.Get("It's nice to meet you!")
    fmt.Println(result)
}
```

Here, the `User` struct represents a user entity with a `name` property. To facilitate the creation of `User` instances, you use the `NewUser` function which is dependent on the name parameter.

The `Get` method is defined on the `User` struct and also has a dependency on the `message` parameter.

The `Run` function depends on a `User` instance and calls the `Get` method on that instance. The resulting formatted string is then printed to the console.

### Injecting Dependencies with Dig

You'll now proceed to inject the dependencies for each of these components using Dig.

To begin, execute the `go get 'go.uber.org/dig@v1'` command from your GoLand terminal to add the Dig package to your application:

![Add the Dig package](https://i.imgur.com/JMMAFr3.png)

Once the Dig package is successfully installed, you can then inject the necessary dependencies into the Dig container. Dig intelligently resolves and supplies these dependencies to their respective components through the dynamic nature of reflection.

Use the following code to create a new Dig container, after which you can provide all the required dependencies to the Dig container and invoke the entry function:

```go
func main() {
    // Initialize a new dig container
    container := dig.New()
    // Provide a name parameter to the container
    container.Provide(func() string { return "James" })
    // Provide a new User instance to the container using the name injected above
    if err := container.Provide(NewUser); err != nil {
        log.Fatal(err)
    }
    // Invoke the Run function; Dig automatically injects the User instance provided above
    if err := container.Invoke(Run); err != nil {
        log.Fatal(err)
    }
}
```

In the above code:

- `dig.New()` instantiates a new Dig container. This creates a fresh instance of the container to hold and manage the dependencies of your application.
- `container.Provide(func() string { return "James" })` is then used to provide the `name` parameter dependency needed for the `NewUser` function.
- `container.Provide(NewUser)` first provides the string value `"James"` as the `name` parameter to the `NewUser` function. The `NewUser` function then utilizes this value to create a new instance of the `User` struct, which is subsequently provided to the container.
- Finally, `container.Invoke(Run)` runs the provided function after instantiating and resolving the dependencies.

Now, execute the `go run main.go` command in your GoLand terminal or click on the green arrow in the gutter. This command initiates the execution of the Go program and triggers the logic within the `main.go` file. If everything is set up correctly, you should see the following output printed to the console:

```
Hello James - It's nice to meet you!
```

This output verifies that the DI and function invocation are working as expected.
