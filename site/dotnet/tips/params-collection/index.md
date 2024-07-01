---
date: 2024-06-28
title: Params collection in C#
topics:
  - .net
  - csharp
  - editing
  - resharper
  - rider
author: rachelappel
subtitle: Use the params collection in C# so methods can accept a dynamic number of parameters.
seealso:
  - title: The `params` keyword
    href: "https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/method-parameters"
  - title: Params performance in C#
    href: "https://dotneteers.net/params-performance-in-c/"
thumbnail: ./thumbnail.png
---

## Params collection

In C#, the `params` modifier provides a convenient way to allow methods to receive a varying amount of arguments. This means at runtime there's more flexibility when passing arguments because you don't have to create a bunch of overloads for the same method.
This feature is especially useful when the number of inputs is unknown or varies. But most of all, `params` makes the calling code more concise than the traditional way to call a method that needs this kind of runtime flexibility.

## Use the `params` keyword in code

New keywords always come with some rules:

- You may use only one `params` modifier in a method.
- It must be the last parameter in the method signature.
- The `params` parameter must be an array or one of the [recognized collection types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/method-parameters#params-modifier).

Now that we know the rules, let's look at the code sample below. It uses the `params` keyword in `SendEmail` to accept a variable number strings.
But when looking at the `params` keyword in the method's definition and usage, the code doesn't seem to do much more than simply accepting an array does.
That's because _it's the calling code that sees the benefit_. The calling code passes in several separate comma-separated strings in one call.
There is no need to declare an array of strings before the call. This makes `params` really flexible. 💪

```c#
public void SendEmail(params string[] emails)
{
    Console.WriteLine("Emails sent to:");
    foreach (var email in emails)
    {
        Console.WriteLine(email);
    }
}

// calling code

message.SendEmail("rachel.appel@jetbrains.com", "maarten.balliauw@jetbrains.com",
    "khalid.abuhakmeh@jetbrains.com","matt.ellis@jetbrains.com",
    "matthias.koch@jetbrains.com","alexandra.kolesova@jetbrains.com",
    "sasha.ivanova@jetbrains.com");
```

Alternatively, callers can pass a pre-defined array, a collection of arguments of the defined type, or nothing at all. The `params` keyword enables developers to pass in a variable number of values at once, making code more flexible and efficient.
Keep in mind, this kind of flexibility means that [you must consider performance, gotchas, and best practices](https://dotneteers.net/params-performance-in-c/).
