---
type: TutorialStep
date: 2025-03-05
title: Thread-safe collections
topics:
  - .net
  - asp.net
  - data
  - editing
  - inspections
  - resharper
  - rider
author: rachelappel
subtitle: The same collections you know and love, but thread-safe.
thumbnail: ./thumbnail.png
---

Thread-safe collections in .NET are designed to handle multiple threads accessing and modifying the collection simultaneously without requiring additional locking or synchronization code. These collections provide built-in thread synchronization, making multithreaded programming easier and safer by eliminating common concurrency issues like race conditions, deadlocks, and data corruption.

### Key Thread-Safe Collections

`ConcurrentDictionary<TKey, TValue>`
A thread-safe dictionary that allows for concurrent read and write access. Its methods (e.g., `TryAdd`, `TryRemove`, `GetOrAdd`) are atomic, which means they will complete without interference from other threads. However, the `Try` methods may fail if the dictionary changes on another thread. It's ideal for scenarios where keys and values are added, updated, or removed concurrently.

`ConcurrentQueue<T>`
A thread-safe, FIFO (First In, First Out) queue. Multiple threads can safely enqueue or dequeue (remove) items simultaneously.

`ConcurrentStack<T>`
A thread-safe, LIFO (Last In, First Out) stack. Multiple threads can safely push or pop items concurrently.

`ConcurrentBag<T>`
A thread-safe unordered collection. Designed for scenarios where multiple threads add and remove items frequently. Items in the bag are not stored in any particular order.

`BlockingCollection<T>`
A thread-safe collection that supports adding and removing items with blocking and bounding capabilities. Internally uses another thread-safe collection (e.g., `ConcurrentQueue` or `ConcurrentStack`). It is well-suited for producer-consumer scenarios where threads need to wait until items are available.

### Considerations for Thread-Safe Collections

Thread-safe collections generally incur some overhead compared to non-thread-safe collections due to locking and other synchronization mechanisms.
For write-heavy workloads, consider alternatives, such as partitioning the workload, to maximize performance. Many of the concurrent collections use fine-grained locking or even lock-free algorithms to minimize contention and improve performance.

Selecting the Right Collection:

- Use `ConcurrentDictionary` for dictionaries with concurrent updates.
- Use `ConcurrentQueue` for FIFO scenarios.
- Use `BlockingCollection` for bounded scenarios and producer-consumer problems.
- Use immutable collections if the data does not change frequently or if you want to avoid mutable state entirely. (See Immutable Collections later in this tutorial)

Below shows an example using the `ConcurrentDictionary<T,T>`. Similarly, other collections mentioned in this tutorial are syntactically like their non-thread-safe counterparts.

```csharp
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        var dictionary = new ConcurrentDictionary<int, string>();

        // Parallel tasks to add items to the dictionary
        Parallel.For(0, 10, i =>
        {
            dictionary.TryAdd(i, $"Value{i}");
        });

        // Parallel tasks to read items from the dictionary
        Parallel.ForEach(dictionary, kvp =>
        {
            Console.WriteLine($"Key: {kvp.Key}, Value: {kvp.Value}");
        });
    }
}
```

In addition to the aforementioned thread-safe collections, immutable collections provide thread safety by design because they do not allow modifications. Instead, any modification creates a new collection, leaving the original collection unchanged. This means multiple threads can safely read the original collection while another thread creates the subsequent collection. However, this thread safety comes at the cost of extra memory usage for modifications. These immutable collections are syntactically the same as their regular counterparts.

### Immutable Collections

- `ImmutableArray<T>`: An immutable version of an array.
- `ImmutableDictionary<TKey, TValue>`: An immutable dictionary.
- `ImmutableList<T>`: An immutable list.
- `ImmutableSortedDictionary<TKey, TValue>`: An immutable sorted dictionary.
- `ImmutableStack<T>`: An immutable stack.
- `ImmutableQueue<T>`: An immutable queue.

Thread-safe collections in .NET are essential tools for simplifying multithreaded programming. With options like `System.Collections.Concurrent` and immutable collections, .NET provides high-performance and safe alternatives to traditional collections in concurrent scenarios. Choose the collection that best fits your specific use case based on access patterns, performance requirements, and maintainability.

### See also

- [Thread-safe collections](https://learn.microsoft.com/en-us/dotnet/standard/collections/thread-safe/)
