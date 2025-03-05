---
type: TutorialStep
date: 2025-03-05
title: Arrays
topics:
  - .net
  - asp.net
  - data
  - editing
  - inspections
  - resharper
  - rider
author: rachelappel
subtitle: Arrays are a straightforward and traditional way to work with a set of data.
thumbnail: ./thumbnail.png
---

Arrays in .NET/C# are a fundamental data structure used to store collection of elements of the same data type. Arrays are stored in contiguous memory locations, which allows fast access to its elements using their index.

Key Characteristics of Arrays:

- Fixed Size: Arrays in C# have a fixed size, meaning you need to specify the size when you create the array. Once created, the size of the array cannot be changed.
- Zero-Based Indexing: Arrays in C# are zero-indexed. The first element is at index 0, the second at index 1, and so on.
- Type-Safe: Arrays store elements of the same type, ensuring type safety.
- Multidimensional Support: C# supports both single-dimensional arrays, multidimensional arrays, and jagged arrays (arrays of arrays).
- Reference Type: In C#, all arrays are implicitly derived from the System.Array class, which is part of the .NET Framework and provides common methods for arrays.

The following code demonstrates how to create and use an array:

```csharp
    // Standard declaration
    var languages = new string[5];
    languages[0] = "C#";
    languages[1] = "Java";
    languages[2] = "PHP";
    languages[3] = "SQL";

    // Declaration with Initialization
    string[] programmingLanguages = { "C#", "Java", "PHP", "SQL" };
```

And below is a declaration for a multidimensional array, followed by printing out the results:

```csharp
string[,] developersAndLanguages = new string[4, 3]
{
    { "C#", "Matt Ellis", "Rachel Appel" },
    { "Python", "Jodie Burchell", "Helen Scott" },
    { "Java", "Marit van Dijk", "Anton Ahripov" },
    { "JavaScript", "Jan-Niklaus Wortmann","Anton Ahripov" },
};

for (int i = 0; i < developersAndLanguages.GetLength(0); i++)
{
    Console.WriteLine($"Language: {developersAndLanguages[i, 0]}");
    Console.WriteLine($"Advocate 1: {developersAndLanguages[i, 1]}");
    Console.WriteLine($"Advocate 2: {developersAndLanguages[i, 2]}");
}
```

Arrays in C# are simple and powerful for managing collections of data, especially when the size is known beforehand. While there is an `Array.Resize` method, for dynamic-sized collections, or when more advanced functionality is needed, it's often better to use higher-level collections like `List<T>`.
Additionally, there is an `ArrayList` type available to hold sets of varying types of data, however, Microsoft suggests not to use it for new development.

### See also

- [Arrays in C#](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays)
- [Arrays - C# language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/arrays)
