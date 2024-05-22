---
type: TutorialStep
date: 2024-05-22
title: "Handling Specific Types of Errors"
topics:
  - go
  - testing
author: cb
subtitle: ""
thumbnail: ./thumbnail.png
---

Some types of errors require special treatment due to their specific nature. These types include network errors, I/O errors, and system errors.

### Network Errors

Failing network connections need special treatment. A network error can be caused by a permanent failure or by a temporary issue. Code that handles a network error needs to distinguish between these two situations.

Consider the task of opening a new TCP connection. This task can fail because the network is temporarily down or because the system at the other end of the connection is restarting or overloaded and cannot accept new connections at the moment.

In such cases, you'll want to try connecting again at a later time. The `net.Dial()` function, for example, supports this by returning a specific error type, `net.OpError`, that provides a method named `Temporary()` for testing if the error is expected to eventually go away.

With the `Temporary()` method, you can implement a simple retry algorithm like the one below or a more sophisticated strategy like [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff):

```go
func connectToTCPServer() error {
    var err error
    var conn net.Conn
    for retry := 3; retry > 0; retry-- {
       conn, err = net.Dial("tcp", "127.0.0.1:12345")
       if err != nil {
          // Check if err is a net.OpError
          opErr := &net.OpError{}
          if errors.As(err, &opErr) {
             log.Println("err is net.OpError:", opErr.Error())
             // test if the error is temporary
             if opErr.Temporary() {
                log.Printf("Retrying...\n")
                continue
             }
             retry = 0
          }
       }
    }
    if err != nil {
       return fmt.Errorf("connect failed: %w", err)
    }
    defer conn.Close()
    // send or receive data
    return nil
}
```

### I/O Errors

Recovering from an I/O error that occurs after having read or written large amounts of data can be costly. All of the data that's already been processed up to the point where the error occurs might need to be read or written again.

To allow for a more efficient recovery, most I/O-related functions and methods in the standard library return not only an error but also the number of bytes that were successfully processed. A typical example is [`io.Reader`](https://pkg.go.dev/io@go1.20.5#Reader)'s `Read()` function:

```go
type Reader interface {
	Read(p []byte) (n int, err error)
}
```

An error recovery procedure could use this information to continue the I/O operation where it was interrupted.

**Important note:** The `io` package provides the _sentinel_ error value `io.EOF` (that is defined as `errors.New("EOF")`) to signal the successful(!) end of reading an input stream. Every type that implements the `io.Reader` interface should stick to the documented semantics of returning an error:

> …a Reader returning a non-zero number of bytes at the end of the input stream may return either `err == EOF` or `err == nil`. The next Read should return `0, EOF`.
