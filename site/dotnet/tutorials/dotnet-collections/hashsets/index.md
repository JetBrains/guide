---
type: TutorialStep
date: 2025-03-05
title: HashSet&#60;T&#62;
topics:
  - .net
  - asp.net
  - data
  - editing
  - inspections
  - resharper
  - rider
author: rachelappel
subtitle: Use the HashSet&#60;T&#62; type for high performing data sets with unique elements.
thumbnail: ./thumbnail.png
---

In .NET, the `HashSet<T>` is a collection class in the `System.Collections.Generic` namespace designed to store a set of unique elements. It is implemented as a hash table, providing high-performance operations for adding, removing, and searching for elements.

When to Use `HashSet<T>`:

- When you need to store unique elements and do not care about the order.
- When performance is critical for operations like add, remove, or lookup.
- When set-like operations (union, intersection, etc.) are desired.

`HashSet<T>` is a very useful collection type when working with sets of unique data, especially when you need high-performance operations or mathematical set operations on collections.
Let's take a look. Below is a code sample in which one `HashSet<string>` contains a list of everything in the company's tech stack. The second `HashSet<string>` represents the tech stack of a new employee.
The code uses the `HashSet<T>.UnionWith` to combine unique values from each so that we can combine our stack with that of our new employee.

```csharp
    HashSet<string> ourTechStack = new HashSet<string>() { "C#", "ASP.NET MVC", "Aspire", "React", "MongoDb" };
    HashSet<string> newEmployeeTechStack = new HashSet<string>() { "Aspire", "C#", "MongoDb", "React", "Blazor", "SQL" };
    ourTechStack.UnionWith(newEmployeeTechStack);
    foreach(string tech in ourTechStack)
    {
        Console.WriteLine(tech);
    }

```

Here are some commonly used methods of the `HashSet<T>`:

- `Add(T item)`: Adds an element to the `HashSet<T>`. Returns true if the item was successfully added (i.e., wasn't already in the set), or false if it was already present.
- `Remove(T item)`: Removes the specified element from the `HashSet<T>`. Returns true if the item was found and removed, or false if the item wasn't in the set.
- `Contains(T item)`: Checks if the specified element exists in the `HashSet<T>`.
- `Clear()`: Removes all elements from the `HashSet<T>`.
- `UnionWith(IEnumerable<T>)`: Modifies the current `HashSet<T>` to include all elements in a provided collection.
- `IntersectWith(IEnumerable<T>)`: Modifies the current `HashSet<T>` to include only the elements also found in another collection.
- `ExceptWith(IEnumerable<T>)`: Removes all elements in the specified collection from the `HashSet<T>`.
- `SymmetricExceptWith(IEnumerable<T>)`:Modifies the current `HashSet<T>` to include only the elements that are in either of the collections, but not both.
- `SetEquals(IEnumerable<T>)`: Determines whether the `HashSet<T>` is equivalent to another collection (i.e., both have the same elements).
- `IsSubsetOf(IEnumerable<T>)`: Determines whether the `HashSet<T>` is a subset of another collection.
- `IsSupersetOf(IEnumerable<T>)`: Determines whether the `HashSet<T>` is a superset of another collection.

The `HashSet<T>` is a very useful collection type when working with sets of unique data, especially when you need high-performance operations on collections.

### See also

- [HashSet&lt;T&gt; Class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.hashset-1?view=net-9.0)
