---
type: TutorialStep
date: 2024-05-24
title: "Common Mistakes to Avoid When Handling Errors in Go"
topics:
  - go
  - testing
author: cb
subtitle: Write Clean Code - Common Error Handling Mistakes to Avoid
thumbnail: ./thumbnail.png
---

While Go's error handling may seem unusual at first sight, it's logical and straightforward to use. However, this doesn't mean that you can't make errors with error handling. Here are some mistakes to avoid.

### Ignoring Errors

The biggest mistake a developer can make in any programming language is to ignore errors. Not catching errors early easily leads to follow-up errors that can be much more difficult to track down compared to the original error if it had been properly handled.

So, the number one rule for avoiding error handling mistakes is to never assign a returned error value to the blank identifier.

Moreover, watch out for functions whose sole return value is an error value. Go does not prevent you from completely ignoring a single return value, but you can use a linter to detect an ignored error return value. (GoLand even highlights unhandled errors right in the editor, to make it easy to avoid this kind of mistake.)

> Fun fact: did you know that [`fmt.Println()`](https://pkg.go.dev/fmt#Println) returns an error value?

Bottom line—don't do this:

```go
WriteString(w, s)
```

Do this instead:

```go
n, err := WriteString(w, s)
// error handling here, see below
```

### Not Wrapping Errors with Additional Context When Propagating

Often, if not always, a function that receives an error from calling another function can add valuable contextual information to the error.

So, whenever you find yourself writing this:

```go
n, err := WriteString(w, s)
if err != nil {
    err
}
```

Take a step back and see if you can include contextual information. In most cases, you can. Even the function name can be valuable information because it allows you to track the chain of function calls that lead to the error:

```go
n, err := WriteString(w, s)
if err != nil {
    return fmt.Errorf("after writing %d characters: %w", n, err)
}
```

It's a few more strokes on the keyboard for you, but it can be an enormous time-saver later on.

### Overgeneralizing Errors

When composing error messages, be as specific as you can. Include all the contextual information you have.

An error message like "database error" can have a truckload of different possible causes. The message "database error" is genuinely pointless and unhelpful.

Add as much information to the error message as you can. Consider creating custom error types that can carry additional information; see the [`os.PathError` type](https://pkg.go.dev/io/fs#PathError) as an example.

### Using Incorrect Error Types

The particular type of an error value might seem like a negligible detail. After all, every error implements `type error interface{ Error() string }`, so in the end, errors are nothing but glorified string types, right?

Wrong. Custom error types can contain extra information and enable advanced error inspection through `errors.Is()` and `errors.As()`.

So, whenever you send an error back to a caller, make sure to use the error type that is appropriate for the given error context.

### Not Logging Errors

Error messages are indispensable for troubleshooting. Whether an app can handle an error or whether an error forces the app to terminate, the app should log that error for postmortem analysis.

In general, if a function observes an error, it should either handle the error or return it to its caller.

If it can handle the error or if it cannot return the error for some reason (maybe because it is function `main()`), the function should always log the error and all its contextual information.

Every error that occurs indicates an opportunity for fixing a bug or improving the code. Don't let this opportunity pass by unnoticed.

### Logging Errors with log.Fatal()

If your application encounters an unrecoverable error, it might feel natural to log this error by calling `log.Fatal()`, which conveniently logs a message and exits the process immediately.

However, there is a catch. `log.Fatal()` calls `os.Exit()`. Unlike a call to `panic()`, `os.Exit()` is not recoverable and skips all deferred functions.

A good practice is to write `func main()` so that it does not defer any functions and call `log.Fatal()` or `os.Exit()` exclusively in `main()`.

### Not Considering Error Recovery

"Crash early" is good advice in many circumstances. Crashing an app allows it to restart from a clean state. However, crashing is not always the best option.

- If an error is easy to recover from, crashing the whole application is an overreaction.
- If a process guarantees maximum uptime, it's better to do your best to recover from the error rather than disrupting the system with a restart.
- If a process spawns goroutines, it's often sufficient to exit a single goroutine that observes an error condition. `http.ListenAndServe()` is an example of this strategy. All incoming requests are handled in separate goroutines, and if one goroutine panics, `ListenAndServe()` recovers from that panic so that all other concurrent handlers can continue unaffected.

Bottom line: applications may benefit from well-designed error recovery, especially if crashing early entails the considerable cost of respawning the app.
