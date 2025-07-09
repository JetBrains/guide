---
date: 2025-07-09
title: Exception handling in .NET
topics:
  - .net
  - csharp
  - editing
  - refactoring
  - resharper
  - rider
author: rachelappel
subtitle: Catch and manage exceptions in .NET Applications.
seealso:
  - title: Exception handling
    href: "https://learn.microsoft.com/en-us/dotnet/standard/exceptions/"

thumbnail: ./thumbnail.png
---

Exceptions in .NET are a core part of the framework's error-handling mechanism. They provide a structured and highly flexible way to handle runtime errors in programs. Let's look at the key concepts of exceptions in .NET.

## Overview

An exception represents an error that occurs during the execution of a program. Instead of having the program crash, catching and handling exceptions allows developers to handle errors gracefully by using structured error-handling code.
The base class of all exceptions in .NET is `System.Exception`, which provides detailed error information such as the `Message`, `StackTrace`, `InnerException`, and custom data via the `Data` property.

Key Properties of `System.Exception`:

- `Message`: Provides a description of the error.
- `StackTrace`: Shows the call stack at the point the exception was thrown.
- `InnerException`: Gives additional information if the current exception was caused by another exception.
- `HResult`: Numeric value that represents the exception.
- `Data`: A key-value pair collection for additional exception-related data.

## Exception handling in .NET

When an error occurs, the CLR (Common Language Runtime) interrupts the normal program flow and throws an exception, which propagates up the call stack until it is caught by a suitable `catch` block. If there is no `catch` block, the user sees an error and the program crashes.
If an exception is caught, the program can make necessary runtime corrections and continue gracefully, or notify the user that an error has occurred.

To catch an exception, enclose the potential offending code in a `try` block, then handle specific exceptions using one or more `catch` clauses. A `finally` block can optionally be used to execute cleanup code. The following code sample attempts to open a file and read its contents:

```csharp
void ReadFile(string FileName)
{
		FileStream fileStream = null;

		try
		{
				fileStream = File.Open(FileName, FileMode.Open);
				byte[] buffer = new byte[fileStream.Length];
				fileStream.Read(buffer, 0, buffer.Length);
		}
		catch (FileNotFoundException ex)
		{
				Console.WriteLine($"File not found: {ex.Message}");
		}
		catch (Exception ex)
		{
				Console.WriteLine($"Error: {ex.Message}");
		}
		finally
		{
				if (fileStream != null)
				{
						fileStream.Close();
						Console.WriteLine("File closed.");
				}
		}
}

```

In the case that an error occurs in the previous code sample, one of the two catch blocks will catch it. Only the code for that specific `catch` block runs. However, the `finally` block always runs regardless of whether an error happened. Because of this behavior, the `finally` block is a good place to put code that closes connections or cleans up resources.

Using multiple `catch` blocks allows you to target specific errors. In the previous example, the first `catch` block targets errors of the type `FileNotFoundException`. The second catches any type of exception with `System.Exception`. Using a strategy where you target specific exception types then have a "catch-all" `catch` block for `System.Exception` exceptions makes potential problems in your software easier to analyze and fix.

## Create and Use Custom Exceptions

You can define custom exceptions by inheriting from `System.Exception` or `System.ApplicationException` when built-in types don't sufficiently describe a scenario where an error might occur. `System.ApplicationException` is a great base class for these kinds of application-specific exceptions.
Custom exceptions can be part of your application logic.

Here’s an example of how you can create a custom exception. In this scenario, the software tries to read a book from a datastore. However, sometimes it can't read the book because the book is no longer available because its license has expired. First, the custom class must be created, like so:

```csharp
using System;

public class BookLicenseException : ApplicationException
{
    // Property to store the title of the book
    public string BookTitle { get; }

    // Default constructor
    public BookLicenseException()
        : base("The requested book no longer has a valid license.") { }

    // Constructor accepting a custom message with the book title
    public BookLicenseException(string bookTitle)
        : base($"The book \"{bookTitle}\" no longer has a valid license.")
    {
        BookTitle = bookTitle;
    }

    // Constructor accepting a custom message and inner exception
    public BookLicenseException(string bookTitle, Exception innerException)
        : base($"The book \"{bookTitle}\" no longer has a valid license.", innerException)
    {
        BookTitle = bookTitle;
    }
}

```

Before you can trap the custom error, you must first raise it somewhere in your code in order for calling code to catch and fix it. For example, when trying to open and read from a file that contains a book:

```csharp
static void ReadPageFromBook(string ISBN, int PageNumber)
{
		// Simulate a condition where the book's license has expired
		bool hasActiveLicense = false;

		if (!hasActiveLicense)
		{
				throw new BookLicenseException(bookTitle);
		}
}

```

Now you can catch the custom `BookLicenseException`, just use a regular `try`\\`catch` block, like so:

```csharp
static void OrderBook()
{
		try
		{
				string bookTitle = "C# Programming Fundamentals";
				ThrowIfBookUnavailable(bookTitle);
		}
		catch (BookLicenseException ex)
		{
				Console.WriteLine($"Exception: {ex.Message}");
		}
}

```

## Helpful Hints

- The `finally` block always runs. This means it runs even when exceptions have been handled or a `return` statement was used in a `catch` block.
- Remember to log _all_ exceptions in the `catch` block so your software is properly instrumented.
- Don't catch just `System.Exception` errors. Try to zero in on specific exception types, and save `System.Exception` for when you need a "catch-all" after other errors have been dealt with.
- When using multiple `catch` blocks, the .NET Runtime processes them top-down, so put the most specific exceptions first and `System.Exception` last in the line of `catch` blocks.
- You can re-throw exceptions that you've caught using the `throw` method. This is useful when you're working on layered systems and want to pass the exception to another layer.

## Conclusion

Exceptions in .NET are a powerful mechanism for handling errors during program execution in a structured way. They allow developers to manage unexpected situations using `try`, `catch`, `finally`, and `throw` blocks, ensuring errors can be gracefully handled without crashing the application. Exceptions can be categorized into built-in types (e.g., NullReferenceException, FileNotFoundException) or custom exceptions, which can be tailored for specific application needs. When used correctly, exceptions enable robust error management, improving code reliability and maintenance.
