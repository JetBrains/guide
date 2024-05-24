---
type: TutorialStep
date: 2024-05-24
title: "Best Practices for Error Handling in Go"
topics:
  - go
  - testing
author: cb
subtitle: Reduce Bugs and Maintain Control - Essential Practices
thumbnail: ./thumbnail.png
---

## Best Practices for Error Handling in Go

With these error handling techniques in mind, let's turn to some best practices when working with errors in Go.

### Use the `defer` Function

A function can exit at multiple points, through `return` statements as well as panics. Whenever a function allocates resources, such as files, network connections, or goroutines, use a `defer()` function to clean up any open resources at function exit.

The `ReadFile()` function contains a deferred call that closes the opened file:

```go
    f, err := os.Open(path)
    if err != nil {
        return nil, fmt.Errorf("open failed: %w", err)
    }
    defer f.Close()
```

### Provide Explicit Error Information

Nothing is more frustrating than seeing some cryptic error message like `ERROR: EPIC FAIL` in the log files without any clue about the context in which the error occurred.

In case you're wondering, yes, messages like this do occur in the real world. The problem with such a message is that even the developers who ought to know their code might be unable to tell what caused a particular occurrence of this message:

"Look, this particular code is called from so many places, and we really cannot say what exactly caused this particular error at this point. We don't have enough context in the log file."

Therefore, if a function encounters an error, it should not pass the error verbatim up the call chain. Rather, if any contextual information is available to help troubleshoot the error, this information should be added to the error by wrapping it in a new error. (See the earlier section on using error wrapping.)

### Use Panic and Recover Only When Necessary

Go newcomers often frown upon Go's verbose error handling and want to save typing by letting a function panic instead of handling an error. At the top level, the panic is then recovered and handled. This approach, however, is unidiomatic Go and has downsides. First and foremost, adding useful contextual information (see the previous section) is not possible with this method. Moreover, because a panic unwinds the call stack outside the regular call/return flow, any function in the call chain between the top-level function and the panicking function contains no error handling code. How can a reader see that any of these functions might observe an error? For comparison, Java has the `throws` keyword to list all exceptions a function may emit. Go does not have such a feature. It's not possible to see if any of the callees of a function panics. Standard Go error handling makes the error flow clearly visible.

Go treats errors as a normal part of the program flow because they are exactly that. If an error occurs, it should be handled or passed to the caller until some function up the call chain handles the error or writes it to a log file for troubleshooting.

If you inspect a function, you'll want to immediately see which errors it may encounter and how it passes them up the call chain.

Calling `panic` should be reserved for unexpected errors that should never happen. A hard-coded regexp string, as seen in the "Panic and Recover" section, is such an example. A hard-coded regular expression should be thoroughly crafted and verified, and it must not fail at runtime.

There are also some categories of errors that cannot be handled at all, such as an out-of-memory situation. If the required memory cannot be allocated, the application has no meaningful way to continue and should panic.

On the other hand, user input at runtime is _expected_ to be unreliable. Any error resulting from user input, invalid or missing files, a network timeout, or other predictable sources of failure can and should be handled as an error.

### Use Libraries and Packages That Follow Error Handling Best Practices

If you have a choice between multiple third-party packages that deliver identical or similar functionality, choose the one that follows best practices for error handling.

You will not do yourself any favors if you decide to use the package with the fanciest API but with brittle error handling. Any package that suppresses errors rather than properly passing them back—or that provides no context for errors—will turn troubleshooting into a hit-or-miss debugging nightmare.

So, take a peek at the code inside a package to see if it contains robust code with proper error handling. This precautionary measure will pay off in the long run.

### Create Custom Error Types Wherever Suitable

Because `error` is an interface, you can build custom error types with extra functionality as long as they implement `Error() string`. You saw an example in the "Testing for Specific Error Types" section, where `os.Open` returned an `fs.PathError`.

This error is a `struct` that implements the methods `Error()`, `Unwrap()`, and `Timeout()` and provides the fields `Path`, `Op`, and `Error` to capture detailed error information:

```go
type PathError struct {
  Op   string
  Path string
  Err  error
}

func (e *PathError) Error() string { return e.Op + " " + e.Path + ": " + e.Err.Error() }

func (e *PathError) Unwrap() error { return e.Err }

// Timeout reports whether this error represents a timeout.func (e *PathError) Timeout() bool {
  t, ok := e.Err.(interface{ Timeout() bool })
  return ok && t.Timeout()
}
```

In the same manner, you can create your own error types. The only mandatory method to implement is `Error()`, but if you also implement the method `Unwrap()`, then the package function `errors.Unwrap()` will be able to unwrap your error.
