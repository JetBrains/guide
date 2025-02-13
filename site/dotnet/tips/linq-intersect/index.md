---
date: 2025-02-12
title: Use the `Intersect` method to find common items in two separate lists
topics:
  - .net
  - csharp
  - editing
  - resharper
  - rider
author: rachelappel
subtitle: A quick way to compare multiple sets of data.
seealso:
  - title: Using Linq intersect
    href: "https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.intersect?view=net-8.0"
thumbnail: ./thumbnail.png
---

C#'s intersect method is one of the most popular and efficient ways to find the common elements between two sets of data in C#.

## `Intersect` method

Often you have two different arrays, lists, or other sets of data, and you need to know what items they have in common. Looping through each and comparing individual items works, but it's terribly inefficient and harder to read.
This scenario is why LINQ's `Intersect` method was created. Let's take a look at comparing two sets of strings that represent names of famous developers.

```csharp
List<string> dotNetDevelopers =
    ["Ada Lovelace", "Katherine Johnson", "Grace Hopper", "Hedy Lamarr", "Barbara Liskov"];
List<string> javaDevelopers =
    ["Ada Lovelace", "Grace Hopper", "Anita Borg", "Barbara Liskov"];

var multiTalentedDevelopers = dotNetDevelopers.Intersect(javaDevelopers);
foreach (var dev in polyglots)
{
    Console.WriteLine(dev);
}
```

Notice that the loop in this example is done to display the results, not to make the comparison. `Intersect` returns an `IEnumerable<TSource>`, so the resulting set is easy to manipulate.
`Intersect` works great with any value type. For another example, let's compare two sets of enums that represent colors:

```csharp
List<Colors> firstSwatch = [Colors.Blue, Colors.Brown, Colors.Green, Colors.Red, Colors.Yellow];
List<Colors> secondSwatch = [Colors.Blue, Colors.Purple, Colors.Yellow, Colors.Green];

var commonColors = firstSwatch.Intersect(secondSwatch);
foreach (var color in commonColors)
{
    Console.WriteLine(color);
}
```

The `Intersect` method uses the default equality comparer for comparison of elements, and that's why it's great for value types. For custom objects, you may have to implement your own `IEqualityComparer<T>`.
