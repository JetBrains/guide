---
type: TutorialStep
date: 2024-05-24
title: "More Mocking Techniques"
topics:
  - go
  - testing
author: cb
subtitle: Mocking Power - Interfaces, Testify, and HTTP for Go Testing
thumbnail: ./thumbnail.png
---

## More Mocking Techniques

GoMock is convenient and feature-rich, but there might be occasions where other mocking techniques are a better fit, or you may simply prefer not to use code generators or framework-like package APIs.

So, let's look into some alternatives to GoMock.

### Manual Mock Testing with Interfaces

This is the "purest" approach to mock testing. No code generators, no third-party packages—only your source code and you.

For your simple use case, creating a mock fetcher manually is done in a few steps.

First, you create a struct that holds the test data and implements `FetchData()`. In `FetchData()`, you can implement the desired mocking behavior. The demo code assumes a single test that fetches the user with an ID of 1 (see `fetchuser_interface_test.go`):

```go
type MockInterfaceFetcher struct {
	u User
}

func (m *MockInterfaceFetcher) FetchData(_ int) (User, error) {
	return m.u, nil
}

```

Then, in the test function, you can set up test data, create a struct with this test data, and pass this struct to `ProcessUser()`:

```go
func TestProcessUser_InterfaceMock(t *testing.T) {
	user := User{ID: 1, Name: "Alice"}
	result, err := ProcessUser(&MockInterfaceFetcher{user}, 1)
	if err != nil {
		t.Errorf("Unexpected error: %v", err)
	}

	if result != user {
		t.Errorf("Expected user: %v, got: %v", user, result)
	}
}

```

Manual mocking is the most lightweight approach, with no external dependencies or command line utilities.

### Using testify/mock

The [`testify/mock`](https://pkg.go.dev/github.com/stretchr/testify/mock) package (part of the [stretchr/testify](https://pkg.go.dev/github.com/stretchr/testify) toolkit) falls somewhere in the middle between GoMock and manual mocking. It provides helper methods but does not use code generation.

`testify/mock` works by embedding a `mock.Mock` type into the mock struct:

```go
type MockTestifyFetcher struct {
    mock.Mock
}
```

The mock method `FetchData()` then only calls the `mock.Mock.Called(args...)` method and returns the appropriate values from the returned `mock.Arguments` type.

Note that `mock.Mock` is an anonymous, embedded field, and hence the `FetchData()` method can call `m.Called()` directly instead of `m.Mock.Called()`:

```go
func (m *MockTestifyFetcher) FetchData(id int) (User, error) {
    args := m.Called(id)
    return args.Get(0).(User), args.Error(1)
}
```

In the test function, you create test data and a new `MockTestifyFetcher` variable.

You then call `Mock.On()` (which, like `Mock.Called()`, is elevated and can be called directly as a method of `MockTestifyFetcher`) and chain it to a call to `Return()`.

In the code below, `On()` takes the name of the method to call and the arguments for that method, and `Return()` specifies the return arguments of the mock method:

```go
func TestProcessUser_TestifyMock(t *testing.T) {
    user := User{ID: 1, Name: "Alice"}
    mockFetcher := new(MockTestifyFetcher)
    mockFetcher.On("FetchData", 1).Return(user, nil)

    result, err := ProcessUser(mockFetcher, 1)
    if err != nil {
       t.Errorf("unexpected error: %v", err)
    }

    if result != user {
       t.Errorf("expected user: %v, got: %v", user, result)
    }
}
```

As a result, when the test calls `ProcessUser(mockFetcher)`, the invoked method `FetchData()` calls `m.Called()` to receive a slice of return values. It returns the `User` and `error` elements from that slice so that the test function can inspect the return values.

### Making Mock HTTP Requests with httptest

This mocking technique is the only one that does not rely on an interface as an input parameter to the tested function. This is because the situation is rather specific: the `httptest` package redirects HTTP requests to a local test server. Therefore, there is no need to change the `FetchData()` function. You can use the original `RealAPIFetcher` type with a different `ApiURL` value.

Here's how it works.

First, inside the test function, set up a new `httptest.Server` with a `HandlerFunc()` that responds with test data.

Make sure you add a deferred call to its `Close()` method:

```go
func TestProcessUser_HttpTest(t *testing.T) {
    user := User{ID: 1, Name: "Alice"}

    ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
       userJSON, _ := json.Marshal(user)
       n, err := w.Write(userJSON)
       if err != nil {
          t.Errorf("test server: unexpected error after writing %d bytes: %v", n, err)
       }
    }))
    defer ts.Close()
```

Next, create a `RealAPIFetcher` object. There is no need for a mock object here. You only need to set `ApiURL` to a URL that the `httptest.Server` object conveniently provides.

You then replace `http.DefaultClient` with a custom client provided by `httptest.Server`. This client is configured to make requests to the test server. It trusts the server's TLS certificate and closes its idle connections when the deferred `Close()` method of the server is called:

```go
    fetcher := &RealAPIFetcher{
       ApiURL: ts.URL,
    }
    http.DefaultClient = ts.Client()
```

The rest is standard testing. Call `ProcessUser()` with the `RealAPIFetcher` as an argument and verify the result:

```go
    result, err := ProcessUser(fetcher, 1)
    if err != nil {
       t.Errorf("unexpected error: %v", err)
    }

    if result != user {
       t.Errorf("expected user: %v, got: %v", user, result)
    }
}
```

`httptest` is the mock technique that is most like calling the real server. It uses the `http` package, does not reimplement the `APIFetcher` interface, and performs real HTTP calls.

### Mocking with Higher-Order Functions

Functions in Go are first-class types. They can be assigned to variables, passed to other functions as arguments, and even have their own methods. You can use this feature to implement mocking through higher-order functions. (See `fetchuser_higherorderfunctions.go` in the repository.)

[Higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function) are functions that take one or more functions as arguments, return a function, or do both.

First, you need to modify `ProcessUser()` to take a function instead of an interface.

To keep the parameter list short and readable, it's good practice to first define a function type:

```go
type FetchDataFunc func(url string, id int) (User, error)
```

Note that this function replaces the `APIFetcher` interface and the structs that implement the interface. Because the structs hold the API URL, the `FetchData()` method only needs an `id` parameter. `FetchDataFunc()` does not have a place to store the URL, so it receives the URL directly.

Next, you can rewrite `ProcessUser()` to `ProcessUserHOF()`, which takes a function of type `FetchDataFunc` instead of the interface:

```go
func ProcessUserHOF(fetchData FetchDataFunc, url string, id int) (User, error) {
    user, err := fetchData(url, id)
    if err != nil {
        return User{}, err
    }
    // Process the user data.
    return user, nil
}
```

You can now provide different `FetchDataFunc` functions to `ProcessUserHOF()`.

First, add a function for production, which is basically the same as the `FetchData()` method but with an additional `url` parameter:

```go
func RealFetchData(url string, id int) (User, error) {
    resp, err := http.Get(fmt.Sprintf("%s/users/%d", url, id))
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

Second, add a mock function inside your tests:

```go
func TestProcessUser_HigherOrderFunctions(t *testing.T) {
    user := User{ID: 1, Name: "Alice"}

    var mockFetcher FetchDataFunc = func(url string, id int) (User, error) {
        return user, nil
    }

    result, err := ProcessUserHOF(mockFetcher, "noURL", 1)
    if err != nil {
        t.Errorf("Unexpected error: %v", err)
    }

    if result != user {
        t.Errorf("Expected user: %v, got: %v", user, result)
    }
}
```

This technique is especially useful if the code to be replaced is a single function.
