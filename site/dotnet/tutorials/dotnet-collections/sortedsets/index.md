---
type: TutorialStep
date: 2025-03-05
title: SortedSet&#60;T&#62;
topics:
  - .net
  - asp.net
  - data
  - editing
  - inspections
  - resharper
  - rider
author: rachelappel
subtitle: Use the SortedSet&#60;T&#62; type for strongly-type, automatically sorted data.
thumbnail: ./thumbnail.png
---

In .NET, `SortedSet<T>` is a strongly-typed collection class provided by the `System.Collections.Generic` namespace. It's very similar to the `HashSet<T>`, but as the name implies, the elements in a `SortedSet<T>` are automatically sorted. Internally, it uses a binary search tree to achieve this.
`SortedSet<T>` in .NET is a collection class that stores unique elements in a sorted order, using a self-balancing binary search tree internally. It automatically maintains the elements in ascending order by default, but you can customize the sorting logic by providing a comparer (`IComparer<T>`). The collection does not allow duplicate values. Additionally, it supports advanced set operations like union, intersection, and difference, as well as range queries and subset/superset checks.

Compared to `HashSet<T>`, which is unordered, `SortedSet<T>` provides ordering with the trade-off of slower average performance for basic operations. It is best used when both uniqueness and sorting are required, and it offers flexibility for scenarios involving sorted traversals or range-based queries. If sorting is unnecessary, `HashSet<T>` may be a more efficient choice.

Below is a quick example of a `SortedSet<T>`:

```csharp
var sortedSet = new SortedSet<int> { 5, 1, 10, 3 };

// Elements are sorted
foreach (var item in sortedSet)
{
    Console.WriteLine(item); // Output: 1 3 5 10
}

// Adding elements
sortedSet.Add(7);

// Duplicates are ignored
sortedSet.Add(5);

// Removing elements
sortedSet.Remove(3);

Console.WriteLine(string.Join(", ", sortedSet)); // Output: 1, 5, 7, 10
```

`SortedSet<T>` is particularly useful in scenarios where you need efficient and dynamic handling of sorted data without duplicates. Its range query support allows you to retrieve subsets of elements within specific bounds, making it ideal for tasks like searching, filtering, or maintaining ranked data.

### See also

- [SortedSet&lt;T&gt; Class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.sortedset-1?view=net-9.0)
