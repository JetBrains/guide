---
type: TutorialStep
date: 2025-03-05
title: List&#60;T&#62;
topics:
  - .net
  - asp.net
  - data
  - editing
  - inspections
  - resharper
  - rider
author: rachelappel
subtitle: Use the List&#60;T&#62; type for strongly-typed, dynamic, sets of data.
thumbnail: ./thumbnail.png
---

The `List<T>` type in .NET is a generic collection located in the `System.Collections.Generic` namespace. It's designed to store and manipulate a collection of objects of one specific type. It provides dynamic resizing and operations for managing the collection.
A `List<T>` is backed by an array, and resizing the list will resize the array, in contrast to the `LinkedList<T>`. Below are some of the methods that you use when working with the `List<T>`.

- `Add(T item)` and `Remove(T item)`: Adds or removes a single item to the end of the list.
- `AddRange(IEnumerable<T>)` and `RemoveRange(IEnumerable<T>)`: Adds or removes all elements of a collection to the end of the list.
- `Insert(int index, T item)`: Inserts a single item at a specific index in the list.
- `InsertRange(int index, IEnumerable<T>)`: Inserts a collection of items starting at a specific index.
- `Clear()`: Removes all items from the list.
- `Contains(T item)`: Checks if an item exists in the list (returns true/false).
- `IndexOf(T item)`: Returns the index of the first occurrence of an item (or -1 if not found).
- `LastIndexOf(T item)`: Returns the index of the last occurrence of an item.
- `Find(Predicate<T>)`: Returns the first item that matches a condition.
- `FindAll(Predicate<T>)`: Returns a list of all items that match a condition.
- `FindIndex(Predicate<T>)`: Returns the index of the first matching item based on a condition.
- `FindLast(Predicate<T>)`: Returns the last item that matches a condition.
- `FindLastIndex(Predicate<T>)`: Returns the index of the last matching item based on a condition.
- `Exists(Predicate<T>)`: Checks if any item in the list matches a condition.
- `TrueForAll(Predicate<T>)`: Checks if all items in the list match a condition.
- `BinarySearch(T item)`: Performs a binary search for a specified item in a sorted list.
- `BinarySearch(T item, IComparer<T>)`: Performs a binary search using a custom comparer.

This sample code shows how to work with a `List<T>`. First, a `List<Book>` is instantiated and several Book objects are added to it during initialization. After that, another book is added, demonstrating that you can dynamically add items to the list.

```csharp
var books = new List<Book>
{
    new Book { Title = "Pride and Prejudice", Author = "Jane Austin" },
    new Book { Title = "In the Time of the Butterflies", Author = "Julia Alvarez" },
    new Book { Title = "Frankenstein", Author = "Mary Shelley"  },
    new Book { Title = "The Picture of Dorian Gray", Author = "Oscar Wilde" },
    new Book { Title = "Test book", Author = "Test author" },
};

books.Add(new Book { Title = "1984", Author = "George Orwell" });

```

To remove an item, use the `Remove` method. In this sample, a test book is removed.

```csharp
var bookToRemove = new Book { Title = "Test book", Author = "Test author" };
books.Remove(bookToRemove);

```

This `List<Book>` can be sorted alphabetically by titles or author, so we'll go with the title. Notice that since the `books` list contains non-primitve `Book` types, the code must customize the `Sort` method. This can be done by passing a lambda expression into the `Sort` method. Alternatively, the code can implement `IComparable` on the Book class itself, though that takes more code.
Finally, it prints the number of books in the library using the `Count` property, and then write the final, sorted, list to the console.

```csharp
books.Sort((x, y) =>
    string.Compare(x.Title, y.Title, StringComparison.OrdinalIgnoreCase));

Console.WriteLine("There are " + books.Count + " books in the library:");
foreach (var book in books)
{
    Console.WriteLine($"{book.Title} by {book.Author}");
}
```

The `List<T>` type is a straightforward way to work with sets of data, and is a one of the most popular ways to work with a collection of data in .NET.

### See also

- [List&lt;T&gt; Class](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-9.0)
