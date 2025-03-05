---
type: TutorialStep
date: 2025-03-05
title: Dictionary&#60;T&#62;
topics:
  - .net
  - asp.net
  - data
  - editing
  - inspections
  - resharper
  - rider
author: rachelappel
subtitle: Use the Dictionary&#60;TKey, TValue&#62; type for strongly-typed, dynamic, sets of data stored with keys and values.
thumbnail: ./thumbnail.png
---

The `Dictionary<TKey, TValue>` type in .NET is a strongly-typed collection that represents a collection of key/value pairs. It is part of the `System.Collections.Generic` namespace, and is a common way to store and retrieve data based on a key.
Because of the nature of working with key/value pairs, the `Dictionary<TKey, TValue>` offers very fast lookups, inserts, and removal operations.

When the key is known, you can access the value using array-style syntax, like so: `dictionaryName["Key"]`. However, note that if the key is invalid or nonexistent, an error occurs. The `Dictionary<TKey, TValue)` provides these common methods for retrieval and manipulation:

- `Add(TKey key, TValue value)`: Adds a key-value pair to the dictionary. Throws an exception if the key already exists.
- `Remove(TKey key)`: Removes the element with the specified key.
- `Clear()`: Removes all key-value pairs from the dictionary.
- `ContainsKey(TKey key)`: Checks if the dictionary contains the specified key.
- `ContainsValue(TValue value)`: Checks if the dictionary contains the specified value.
- `TryGetValue(TKey key, out TValue value)`: Tries to get the value associated with the specified key. Returns false if the key is not found.
- `TryAdd(TKey key, TValue value)`: Attempts to add a key-value pair, returning false if the key already exists (instead of throwing an exception).

Below demonstrates the basics of working with the `Dictionary<TKey, TValue>`. First, it adds a few employees and their salaries.
The code then loops through the employees and prints them. The final piece of code checks for an employee with a key of "Margaret Hamilton" and removes it.

```csharp
var employeeSalaries = new Dictionary<string, decimal>();
employeeSalaries.Add("Katherine Johnson", 100000M);
employeeSalaries.Add("Grace Hopper", 150000M);
employeeSalaries.Add("Alan Turing", 125000M);
employeeSalaries.Add("Margaret Hamilton", 150000M);

foreach (var employee in employeeSalaries)
{
    Console.WriteLine($"{employee.Key} earns ${employee.Value}");
}

if (employeeSalaries.ContainsKey("Margaret Hamilton"))
{
    employeeSalaries.Remove("Margaret Hamilton");
    Console.WriteLine("Margaret Hamilton is no longer an employee");
}
else
{
    Console.WriteLine("Margaret Hamilton is not an employee");
};

```

**A few considerations:**

- **Unique Keys**: A Dictionary does not allow duplicate keys. Attempting to add a duplicate key will throw an ArgumentException.
- **Null Keys and Values**: Starting in .NET Core 2.0, `Dictionary<TKey, TValue>` allows null as a value for reference types.
  null is not allowed for keys if TKey is a reference type because it uses key comparison and hashing.
- **Ordering**: A Dictionary does not guarantee any specific order of the keys and values.
- **Sorting**: Dictionaries aren't sorted. If you specifically want to sort, consider the `SortedDictionary<TKey, TValue>`, `SortedList<TKey, TValue>`,or `ConcurrentDictionary<TKey, TValue>`.

In .NET, a `Dictionary<TKey, TValue>` is a generic collection that stores key-value pairs, allowing fast lookups, inserts, and deletions. It ensures that each key is unique while values can be duplicated. The dictionary provides methods like `Add`, `Remove`, `TryGetValue`, as well as properties to access and manipulate its elements. While it does not maintain any specific order of its elements, it offers type safety and is optimized for performance due to its hash-based implementation. It is widely used for scenarios requiring efficient mapping of unique keys to values.

### See also

- [Dictionaries in C#](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2?view=net-9.0)
- [How to initialize a dictionary with a collection initializer (C# Programming Guide)](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/how-to-initialize-a-dictionary-with-a-collection-initializer)
