---
type: TutorialStep
date: 2024-05-16
title: "Testing"
topics:
  - go
author: israel
subtitle: Strategies for Effective Code Testing and Maintenance
thumbnail: ./thumbnail.png
---

One of the benefits of DI discussed earlier is enhanced testability. The following example explores how the principles of modularity and DI can simplify the testing process in practical scenarios.

Begin by creating a `main_test.go` file with `TestNewUser` and `TestUser_Get` functions, as shown below:

![Create test file and functions](https://i.imgur.com/Io0iGFZ.png)

Next, proceed to write the tests for both functions using the corresponding modularized components in the `main.go` file to get the actual values for comparison:

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

Finally, in the GoLand terminal, execute the `go test` command to run the tests:

![Test result](https://i.imgur.com/N3UbK1J.png)

Alternatively, you can run the tests using the GoLand triangular interactive buttons at the starting line of the test function or file.

![Test result](https://i.imgur.com/OuLtS1j.png)
