---
type: TutorialStep
date: 2024-05-22
title: "Popular Error Handling Techniques in Go"
topics:
  - go
  - testing
author: cb
subtitle: ""
thumbnail: ./thumbnail.png
---

As mentioned, all error handling in Go is based on the notion of errors as values. An error in Go is a value like any other value. An error value is of the type `error`, which is a built-in type. But what is this type? Luckily, GoLand makes it easy to inspect the source code of Go itself.

In the Project pane, scroll down to the "External Libraries" section. Expand `Go SDK <installed version>`, then expand `builtin.go` (because `error` is a built-in type):

![The error interface in builtin.go](https://i.imgur.com/qf8liG8.png)

If you cannot expand `builtin.go`, select the three-dot menu in the Project pane, then **Tree Appearance**, and ensure that **Show Members** is checked:

![Enable Show Members in the GoLand project pane](https://i.imgur.com/p0QZoWn.png)

Scroll down until you see the `error` type below `builtin.go`, then click it. The file `builtin.go` opens in the editor area and shows the error type:

```go
type error interface {
  Error() string
}
```

The `error` type is an interface with a single function, `Error() string`. Using an interface type here allows you to easily create custom error types by making the custom type implement the `error` interface.

So, let's see how errors can be handled.

### Returning Errors

In most cases, if a function encounters an error, it does not have the necessary context to properly handle the error by itself, so it has to pass the error back to its caller.

As an example, see `func ReadFile()` from the sample code (`readfile.go`):

```go
func ReadFile(path string) ([]byte, error) {
    if path == "" {
       // Create an error with errors.New()
       return nil, errors.New("path is empty")
    }
    f, err := os.Open(path)
    if err != nil {
       // Wrap the error.
       // If the format string uses %w to format the error,
       // fmt.Errorf() returns an error that has the
       // method "func Unwrap() error" implemented.
       return nil, fmt.Errorf("open failed: %w", err)
    }
    defer f.Close()

    buf, err := io.ReadAll(f)
    if err != nil {
       return nil, fmt.Errorf("read failed: %w", err)
    }
    return buf, nil
}
```

`ReadFile()` tests the received path, and if the path is empty, it creates a new error and returns it. The data that `ReadFile()` was supposed to return does not exist; therefore, `ReadFile()` returns a `nil` value:

```go
    if path == "" {
       return nil, errors.New("path is empty")
    }
```

Conventionally, if a function returns an error value, it's always the last (rightmost) value in the list of return values:

```go
func ReadFile(path string) ([]byte, error) {
```

The caller of `ReadFile()` receives the error value along with the result value. By default, the returned error value is assigned to a variable named `err` (see `main.go` in the accompanying repository):

```go
_, err := ReadFile("no/file")
if err != nil {
    fmt.Println("Error:", err)
}
```

Here, the result of calling `ReadFile()` is not needed, as this guide looks into error handling specifically. Therefore, the return value is assigned to the blank identifier (`_`).

Now the caller can test if the error is non-nil and handle the error accordingly.

### Panic and Recover

Go newcomers might miss the `try...catch` mechanism that other languages provide. However, Go has something that fulfills a similar purpose: `panic` and `recover`. But beware! Unlike `try...catch`, `panic` and `recover` is not, and should not be, the standard way of handling errors. Panicking is only acceptable if an error is indeed unexpected and there is no way of handling it. In such cases, it's better to have the application crash early and restart it. You'll learn more about this in the best practices section later.

An example of an error that should not happen is a failed compilation of a regular expression given as a literal string. Because the regular expression is known at compile time, the developer should have made it a valid expression so that the compilation cannot fail at runtime. To enforce this, the `regexp` package has a function called `MustCompile()`. The prefix `Must` indicates that the function panics if it cannot compile the given regular expression.

To demonstrate this, the file `verifypath.go` contains a function that will verify if a given path is valid. However, the developer entered the regular expression incorrectly—a closing parenthesis is missing:

```go
func isValidPath(p string) bool {
    pathRe := regexp.MustCompile(`(invalid regular expression`)
    return pathRe.MatchString(p)
}
```

If this function is called without any precaution, the app crashes instantly:

```
panic: regexp: Compile(`(invalid regular expression`): error parsing regexp: missing closing ): `(invalid regular expression`

goroutine 1 [running]:
regexp.MustCompile({0x1005ca16d, 0x1b})
        /opt/homebrew/opt/go/libexec/src/regexp/regexp.go:319 +0xac
main.isValidPath({0x1005c76af, 0xd})
        /Users/you/dev/JetBrains/jetbrains-go-code-samples/awesomeProject/error-handling/verifypath.go:6 +0x30
main.main()
        /Users/you/dev/JetBrains/jetbrains-go-code-samples/awesomeProject/error-handling/main.go:20 +0xb0

Process finished with the exit code 2
```

The stack trace reveals that line 6 of `verifypath.go` is the source of the panic.

In certain cases, crashing the app might not be an option. Consider an HTTP server that must be up and running without disruption. If a panic occurs when handling a request, all other requests should continue being handled, if possible. To do this, the `net/http` package uses Go's recovery technique.

Here is how it works in the case of the panicking `isValidPath()` function.

#### It Adds a Deferred Function Call to the Caller

The caller of `isValidPath()` sets up a deferred function call near the beginning of the function body:

```go
defer func() {
    // deferred code ...
}() // <- Don't forget the parens, this is an actual function call!
```

Deferred functions are automatically executed whenever the containing function exits, whether through a normal `return` call or triggered by a panic.

#### In the Deferred Function, It Calls recover()

The deferred function can verify if it was invoked because of a normal return or because of a panic. It only needs to call `recover()` and verify the returned error (see `main.go` at the end of `func main()`):

```go
defer func() {
    // Is this func invoked from a panic?
    if r := recover(); r != nil {
       // Yes: recover from the panic
       fmt.Println("Recovering")
       // ...
    }
}()
```

If the error is `nil`, the deferred function was invoked because of a normal return, so no recovery is required.

If the deferred function was triggered by a panic, `recover()` returns the error that caused the panic. Now the deferred function can do whatever is required to recover from the panic.

### Logging Errors

If a function can handle an error it receives from a called function, it might want to write information about the error to a log file.

Logging an error is straightforward in Go, thanks to the `log` package in the standard library and the `slog` package that is available from Go 1.21 onwards.

Here's an example using the `log` package in the deferred function from the previous section:

```go
if r := recover(); r != nil {
    log.Printf("Recovering from error `%v`\n", r)
}
```

`log.Printf()` is a drop-in replacement for `fmt.Printf()` that writes to the standard logger's output. To format an error type, use the `%v` verb that prints a value in its default format.

**A side note:** If you write code for a library, consider not logging anything. The library clients will have different opinions about which logger to use and what is printed to `stdout` or `stderr`. So, it is almost always better to only return errors and let the library clients do the logging they want.

### Using Error Wrapping

An error often "bubbles up" a call chain of multiple functions. In other words, a function receives an error and passes it back to its caller through a return value. The caller might do the same, and so on, until a function up the call chain handles or logs the error. Each function involved in this "bubbling up" can add valuable contextual information to the error before handing it back to its caller.

A function should only pass the error on unchanged if it cannot add any helpful information:

```go
if err != nil {
    // Only do that if no additional context can be added!
    return err
}
```

In all other cases, it should add appropriate contextual information. However, simply concatenating a new error message with the original one does not work:

```go
// WRONG!
if err != nil {
    return errors.New("open failed:" + err.Error())
}
```

This would only preserve the original error message, while all other information gets lost.

Instead, you should use error wrapping. An error can be "wrapped" around another error using `fmt.Errorf()` and the special formatting verb `%w`. See the `ReadFile()` function in the file `readfile.go`:

```go
f, err := os.Open(path)
if err != nil {
    return nil, fmt.Errorf("open failed: %w", err)
}
```

`os.Open()` returns an error type that contains additional information, as you will see later. Wrapping the error preserves all this additional information.

### Unwrapping Wrapped Errors

An error returned by a function might contain one or more wrapped errors. Printing or logging the received error will also include all error messages from the wrapped errors. However, sometimes you need to know if a particular type of error is nested somewhere inside the layers of errors.

For example, let's see how to handle `ReadFile()`'s errors in `func main()`:

```go
_, err := ReadFile("no/file")
log.Println("err = ", err)

// Unwrap the error returned by os.Open()
log.Println("errors.Unwrap(err) = ", errors.Unwrap(err))
```

This code snippet prints the following:

```
Reading a single file: err =  open failed: open no/file: no such file or directory
Reading a single file: errors.Unwrap(err) =  open no/file: no such file or directory
```

While the wrapped error message is `open failed: open no/file: no such file or directory`, the unwrapped error contains only `open no/file: no such file or directory`, excluding the `open failed:` message that was added to the wrapped error.

This way, you can unwrap one error after another until you hit the end of the chain.

### Testing for Specific Error Types

Occasionally, you need to know if any of the errors inside a chain of wrapped errors are of a particular type.

For example, `os.Open` returns an error of type `fs.PathError` that not only records the error but also the operation and the path that caused it. If you can find out that the error chain contains this error, you can make use of the additional information for troubleshooting.

To achieve this, the `errors` package provides two functions: `Is()` and `As()`.

#### errors.Is()

Function `func Is(err, target error) bool` returns `true` if error `err` is of the same type as `target`.

In the case of the `ReadFile()` function, you can verify that the returned error is, or wraps, an `fs.ErrNotExist` error:

```go
_, err := ReadFile("no/file")

log.Println("err is fs.ErrNotExist:", errors.Is(err, fs.ErrNotExist))
```

This prints:

```
err is fs.ErrNotExist: true
```

#### errors.As()

You'll also want to access the path information. For this, you not only need to ensure the error wraps an `fs.PathError` but also access this `PathError` and all its methods.

To do this, use the function `func As(err error, target any) bool`. Like `Is()`, function `As()` returns `true` if `err` is or wraps an error of the same type as `target`, and it also unwraps that error and assigns it to `target`.

This requires defining a variable of type `fs.PathError` and passing a _pointer_ to that variable to `As()`:

```
target := &fs.PathError{}
if errors.As(err, &target) {
    log.Printf("err as PathError: path is '%s'\n", target.Path)
	log.Printf("err as PathError: op is '%s'\n", target.Op)
}
```

This will log the path and the operation that failed:

```
err as PathError: path is 'no/file'
err as PathError: op is 'open'
```

### Joining Errors

Typically, errors get wrapped one by one while being returned to the respective caller. Sometimes, a function needs to collect multiple errors and wrap them into one.

Take the function `ReadFiles()` (note the plural) from `readfiles.go` as an example. This function reads multiple files and returns all file contents that were successfully read. If one or more files fail to be read, `ReadFiles()` will collect the errors and join them into one.

For this, the `errors` package provides the `Join()` function (since Go 1.20). Let's see how `ReadFiles()` makes use of the `Join()` function:

```go
func ReadFiles(paths []string) ([][]byte, error) {
    var errs error
    var contents [][]byte

    if len(paths) == 0 {
       // Create a new error with fmt.Errorf() (but without using %w):
       return nil, fmt.Errorf("no paths provided: paths slice is %v", paths)
    }

    for _, path := range paths {
       content, err := ReadFile(path)
       if err != nil {
        errs = errors.Join(errs, fmt.Errorf("reading %s failed: %w", path, err))
          continue
       }
       contents = append(contents, content)
    }

    return contents, errs
}
```

If an error occurs inside the `for` loop, it does not break the loop. Instead, it is joined to variable `errs`, and the loop continues, joining more records as they occur.

Finally, `ReadFiles()` returns both the contents read successfully and the joined error messages.

### Handling Joined Errors

Now, you might expect that joined errors can be unwrapped like single errors. Unfortunately, this is not the case. A joined error is actually a slice of errors, `[]error`. The `Unwrap()` function, however, returns a single `error`. If called on a joined error, `Unwrap()` returns `nil`:

```go
_, err = ReadFiles([]string{"no/file/a", "no/file/b", "no/file/c"})
log.Println("joined errors = ", err)

log.Println("errors.Unwrap(err) = ", errors.Unwrap(err))
```

The second log line prints:

```
errors.Unwrap(err) =  <nil>
```

Fortunately, there is a way to unwrap the slice of joined errors. The joined error type itself helps you do this by providing an `Unwrap() []error` method that returns the error slice.

To access this `Unwrap()` method, you only need to type-assert that the error variable implements this method. You can then call it safely:

```go
e, ok := err.(interface{ Unwrap() []error })
if ok {
    log.Println("e.Unwrap() = ", e.Unwrap())
}
```

This prints the full set of joined errors:

```
Reading multiple files: e.Unwrap() =  [reading no/file/a failed: open failed: open no/file/a: no such file or directory
reading no/file/b failed: open failed: open no/file/b: no such file or directory reading no/file/c failed: open failed: open no/file/c: no such file or directory]
```

### Context-Based Error Handling

The `context` package is popular for controlling timeouts of requests or canceling multiple goroutines upon request. If you use a cancelable context, you can inspect and handle the error that caused the cancellation.

Since Go 1.20, you can even send a custom error message when canceling a context by using a `WithCancelCause` context. The following is a basic example:

```go
    parent := context.Background()
    ctx, cancel := context.WithCancelCause(parent)
    defer cancel(nil)             // Set the cause to Canceled
    cancel(fmt.Errorf("myError")) // Set the cause to myError

    fmt.Println(ctx.Err())          // Output: context.Canceled
    fmt.Println(context.Cause(ctx)) // Output: myError
```

(Constructing goroutines and cancel situations can get complex quickly. Find a full example in `readfiles_concurrent.go`.)

The context function `WithCancelCause()` returns a context and a cancel function that expects an error type. When calling `cancel`, a custom error message can be passed as input. All interested parties that have access to the context can retrieve the custom error through `context.Cause(ctx)`.
