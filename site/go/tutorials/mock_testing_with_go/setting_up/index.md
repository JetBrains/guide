---
type: TutorialStep
date: 2024-05-22
title: "Setting Up the Demo Project in GoLand"
topics:
  - go
  - testing
author: chrisberger
subtitle: ""
thumbnail: ./thumbnail.png
---

Start your GoLand IDE. If it's a fresh installation, you'll be prompted with a welcome screen. Click the **Open** button:

![GoLand welcome screen](https://i.imgur.com/Eu5Lf7e.png)

In the file selector dialog that opens, navigate to the cloned repository indicated in the list of prerequisites, select the folder `mock-testing/fetchuser` (where the `fetchuser` subfolder represents the module and package name), and click **Open**:

![Open dialog: fetchuser](https://i.imgur.com/U1A55gy.png)

After opening the project, you'll see the file tree to the left. Click a file to see its contents. The file names have background colors to easily distinguish the file type, where test files have a green background and generated files have a gray background:

![The project opened in GoLand](https://i.imgur.com/Maf8TYv.png)

### Making a Function "Mockable"

Open `fetchuser.go` and scroll to the bottom of the file to inspect the `ProcessUser()` function. This function fetches and processes user data:

```go
func ProcessUser(fetcher APIFetcher, id int) (User, error) {
    user, err := fetcher.FetchData(id)
    if err != nil {
       return User{}, err
    }
    // Process the user data.
    return user, nil
}
```

The function returns a `User` type that is defined as a struct:

```go
type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}
```

The first function parameter, `fetcher`, is of particular interest. It's an interface type:

```go
type APIFetcher interface {
    FetchData(id int) (User, error)
}
```

**This is the key point for all mocking techniques** discussed in this tutorial (except for `httptest`, but that's a special case). `ProcessUser()` does not expect a concrete type but only an interface that describes a behavior—which, in this case, is fetching user data for a given user ID.

By passing different implementations of this interface to `ProcessUser()`, you can have `ProcessUser()` fetch user data in any way you want. In this example `fetchuser` project, you can provide a production implementation of `APIFetcher` that calls out to a real REST API and a test implementation that does not perform any API calls.

The production code uses a `RealAPIFetcher` type that makes a _real_ HTTP call to a _real_ endpoint. `RealAPIFetcher` implements the `APIFetcher` interface by defining a `FetchData` method:

```go
type RealAPIFetcher struct {
    ApiURL string
}

func (ra *RealAPIFetcher) FetchData(id int) (User, error) {
    resp, err := http.Get(fmt.Sprintf("%s/users/%d", ra.ApiURL, id))
    if err != nil {
       return User{}, err
    }
    defer resp.Body.Close()

    bodyBytes, err := io.ReadAll(resp.Body)
    if err != nil {
       return User{}, err
    }

    var user User
    err = json.Unmarshal(bodyBytes, &user)
    return user, err
}
```

You might wonder how `RealAPIFetcher` declares that it implements the interface. It doesn't. If a type implements all methods of an interface, it implements the interface implicitly without a formal declaration.

A package client would call `ProcessUser()` as follows:

```go
f := fetchuser.RealAPIFetcher{
    ApiURL: "<base url of the service>"
}

user, err := fetchuser.ProcessUser(f, 1)
```

Lacking an endpoint to access, this code cannot be tested, but you can swap out `RealAPIFetcher` with a mock object.

### Creating a Mock Object with GoMock and mockgen

[GoMock](https://github.com/uber-go/mock) is a mock framework that generates mock objects from source code. It's perhaps the most versatile option for creating and using mock objects. GoMock provides options for setting the expected outcome of a test, setting a specific sequence of test calls, and more.

To start using GoMock, download the `gomock` package and install the `mockgen` binary:

```bash
go get go.uber.org/mock/gomock
go install go.uber.org/mock/mockgen@latest
```

Then call `mockgen` with three flags:

- `-source` to define the source file to create mocks from
- `-destination` to set the file name of the output file
- `-package` to set the package to use for the resulting mock package

```bash
mockgen -source=fetchuser.go -destination=fetchuser_mockgen_mocks.go -package=fetchuser
```

Inspect the generated file called `fetchuser_mockgen_mocks.go`. You can see a `MockAPIFetcher` struct that implements the `APIFetcher` interface. There is also a `NewMockAPIFetcher()` function that takes a `*gomock.Controller` and returns a `*MockAPIFetcher`.

The `Controller` object defines the scope, lifetime, and expectations of mock objects. Expectations are methods that specify expected outcomes, such as the expected arguments, the expected return values, or the number of times a function will be called.

This may sound complicated, but the basic usage of the generated mock objects is quite easy, as you can see in the `fetchuser_mockgen_test.go` file.

You first create a new `Controller()` that receives the `*testing.T` object as input. Then, you schedule the cleanup at function exit using a `defer` statement:

```go
package fetchuser

import (
    "testing"

    "github.com/golang/mock/gomock")

func TestProcessUser_Mockgen(t *testing.T) {
    ctrl := gomock.NewController(t)
    defer ctrl.Finish()
```

Next, define the expected results of the test. The code is intentionally kept simple and defines a single user:

```go
    user := User{ID: 1, Name: "Alice"}
```

You can now create a new `MockAPIFetcher` object and set the expectation that calling `FetchData()` with ID `1` shall return user `user` (with an ID of 1 and the name Alice) and no error. Use the following code:

```go
    mockFetcher := NewMockAPIFetcher(ctrl)
    mockFetcher.EXPECT().FetchData(1).Return(user, nil)
```

Pass the prepared mock object to `ProcessUser()` and verify the result:

```go
    result, err := ProcessUser(mockFetcher, 1)
    if err != nil {
       t.Errorf("unexpected error: %v", err)
    }

    if result != user {
       t.Errorf("expected user: %v, got: %v", user, result)
    }
}
```

You can run this test like any standard Go test:

```bash
go test -run TestProcessUser_Mockgen
```

For convenience, the GoLand IDE has generated test profiles for each of the tests as they were written, so you can run unit tests with a single mouse click.

Open the **Run Configuration** dropdown at the top of the GoLand window to see the available run configurations:

![GoLand run configurations for testing](https://i.imgur.com/kYUttU6.png)

Select the **TestProcessUser_Mockgen** configuration. You can now run selected tests or all tests in a test file by clicking either of the **Run** buttons in the gutter to the left of the editor window:

![Run buttons](https://i.imgur.com/kiOlRQi.png)

As a result, the Run window should show a successful test:

```
=== RUN   TestProcessUser_Mockgen
--- PASS: TestProcessUser_Mockgen (0.00s)
PASS

Process finished with the exit code 0
```
