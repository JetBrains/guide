---
type: TutorialStep
date: 2025-03-05
title: Queues and Stacks.
topics:
  - .net
  - asp.net
  - data
  - editing
  - inspections
  - resharper
  - rider
author: rachelappel
subtitle: Use Queues and Stacks for FIFO and LIFO data sets.
thumbnail: ./thumbnail.png
---

In .NET, Queues and Stacks are two fundamental data structures used for storing and managing collections of objects. They provide specialized ways of organizing and accessing data, both of which are implemented in the `System.Collections` or `System.Collections.Generic` namespaces.

### Queues

A queue represents a first-in, first-out (FIFO) collection of objects. Items are added to the end of the queue (enqueued) and removed (dequeued) from the beginning, hence first-in, first-out. Queues are useful for scenarios where order of processing must match the order of arrival (e.g., task scheduling, message queues).
This is analogous to how people line up for service, where the first person to enter the line is the first to leave. Use the `System.Collections.Queue` for non-generic object storage, and the `System.Collections.Generic.Queue<T>` for strongly-typed generic object storage.

Use cases for a queues:

- Handling requests in a server (e.g., message queues).
- Print job scheduling in printers.
- Task scheduling in operating systems.
- Breadth-First Search (BFS) in graphs or trees.
- Managing a waiting line in customer service applications.
- Implementing a buffer (e.g., streaming or producer-consumer patterns).

Methods and properties to use with queues:

- `Enqueue(T item)`: Adds an item to the end of the queue.
- `Dequeue()`: Removes and returns the item at the front of the queue.
- `Peek()`: Returns the item at the front of the queue without removing it.
- `Count`: Gets the number of elements in the queue.
- `Clear()`: Removes all the elements from the queue.

Let's look at an example of a queue, where people are waiting in line:

```csharp
var queue = new Queue<string>();
queue.Enqueue("Alice");
queue.Enqueue("Barbara");
queue.Enqueue("Charlie");

Console.WriteLine(queue.Dequeue()); // Output: Alice
Console.WriteLine(queue.Peek());    // Output: Barbara
Console.WriteLine(queue.Count);     // Output: 2
```

### Stacks

A stack represents a last-in, first-out (LIFO) collection of objects. Items are added (pushed) and removed (popped) from the top (most recent) of the stack. This is analogous to a stack of plates where the last plate added is the first to be taken out. Use the `System.Collections.Stack` for a non-generic object store, and the `System.Collections.Generic.Stack<T>` for generic strongly typed storage.

Use cases for a stacks:

- Undo/Redo functionality in text editors or applications.
- Expression evaluation and syntax parsing (e.g., infix to postfix conversion).
- Tracking method calls during recursion (e.g., a call stack).
- Backtracking algorithms such as solving mazes or depth-first search in graphs.
- Navigating browser history (forward and backward navigation).
- Reversing strings or data structures.

Methods and properties to use with stacks:

- `Push(T item)`: Adds an item to the top of the stack.
- `Pop()`: Removes and returns the item at the top of the stack.
- `Peek()`: Returns the item at the top of the stack without removing it.
- `Count`: Gets the number of elements in the stack.
- `Clear()`: Removes all the elements from the stack.

Here's an example of a stack that tracks webpages visited for browswer navigation.

```csharp
var browserNavigationStack = new Stack<string>();
browserNavigationStack.Push("Home Page");
browserNavigationStack.Push("About Page");
browserNavigationStack.Push("Products Page");

Console.WriteLine(browserNavigationStack.Pop());  // Output: Products Page
Console.WriteLine(browserNavigationStack.Peek()); // Output: About Page
Console.WriteLine(browserNavigationStack.Count);  // Output: 2
```

Queues and stacks are fundamental data structures used for organizing and processing data with different order constraints.
A queue operates on a first-in, first-out (FIFO) principle, where the earliest added item is processed first, commonly used for task scheduling, message handling, print jobs, and breadth-first traversal in graphs. Both are essential for solving unique programming challenges depending on the desired order of operations.
On the other hand, a stack follows a last-in, first-out (LIFO) approach, where the most recently added item is the first to be removed, making it ideal for scenarios like function call management, undo/redo operations, backtracking, and parsing.

### See also

- [Queue vs. Stack in C#](https://medium.com/@jepozdemir/queue-vs-stack-in-c-2f75efe907d5)
- [Queue&lt;T&gt; Class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.queue-1?view=net-9.0)
- [Stack&lt;T&gt; Class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.stack?view=net-9.0)
