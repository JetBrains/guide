---
type: TutorialStep
date: 2025-03-05
title: LinkedList&lt;T&&gt;
topics:
  - .net
  - asp.net
  - data
  - editing
  - inspections
  - resharper
  - rider
author: rachelappel
subtitle: Use the LinkedList&lt;T&gt; type for strongly-typed, dynamic, sets of data.
thumbnail: ./thumbnail.png
---

The `LinkedList<T>` is a generic collection class found in the `System.Collections.Generic` namespace.
It implements a doubly linked list, meaning that each node in the list contains a reference to the next and previous nodes, allowing traversal in both directions. It is a dynamic data structure that can grow or shrink as needed without requiring resizing, making it fundamentally different from collections like arrays or `List<T>`. Unlike arrays or lists, which store elements in contiguous memory, a linked list stores nodes in non-contiguous memory, meaning there are no fixed indices for elements.
Additionally, `LinkedList<T>` the implements `IEnumerable<T>` for iterating through nodes using a `foreach` loop.

Use cases for the `LinkedList<T>`:

- When frequent insertion and deletion of elements at arbitrary positions are required.
- When the order of elements (via traversal) is important, but random access by index is not needed.
- Situations where resizing overhead associated with arrays or `List<T>` is undesirable.

Notice that the commonly used methods below work well with insertion and deletion of items that are positioned arbitrarily.

**Commonly used methods:**

- `AddFirst(T value)`: Adds a new node containing the specified value to the start of the list.
- `AddLast(T value)`: Adds a new node containing the specified value to the end of the list.
- `AddBefore(LinkedListNode<T> node, T value)`: Adds a node before a specified existing node.
- `AddAfter(LinkedListNode<T> node, T value)`: Adds a node after a specified existing node.
- `Remove(T value)`: Removes the first occurrence of the specified value.
- `RemoveFirst()`: Removes the first node.
- `RemoveLast()`: Removes the last node.
- `Find(T value)`: Searches for the first occurrence of the specified value and returns the corresponding `LinkedListNode<T>`.
- `FindLast(T value)`: Searches for the last occurrence of the specified value and returns the corresponding `LinkedListNode<T>`.

In the sample below, siblings are added to a `LinkedList<string>`, and the middle sibling is squeezed in after.

```csharp
var siblings = new LinkedList<string>();
siblings.AddFirst("Oldest sibling");
siblings.AddLast("Youngest sibling");
siblings.AddAfter(siblings.First, "Forgotten middle sibling");
foreach (var sibling in siblings)
{
    Console.WriteLine(sibling);
}
```

`LinkedList<T>` is ideal when you need efficient insertions or deletions and don't need random access by index. It’s particularly useful for applications like managing a playlist, undo/redo stacks, or graph traversal (where adjacency lists are common).

### See also

- [LinkedList&lt;Tgt; Class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.linkedlist-1?view=net-9.0)
