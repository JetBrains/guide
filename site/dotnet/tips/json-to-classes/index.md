---
date: 2025-02-07
title: Convert JSON to classes or records
topics:
  - .net
  - csharp
  - editing
  - resharper
  - rider
author: rachelappel
subtitle: Turn any JSON data you have into a class or record
seealso:
  - title: Generate classes from JSON
    href: "https://www.jetbrains.com/help/rider/Generate_classes_from_json.html"
thumbnail: ./thumbnail.png
---

## JSON and C\#

[JSON](https://www.json.org/) is widely used for data exchange between the client and the server in web applications.
If your application is built with an object-oriented language such as C#, it is easier to manipulate data if it’s in the form of an object.
Converting JSON to a class or record allows you to match your code to the data in a more straightforward way. Here's a quick way to do this in Rider.

## Convert from JSON to a class/record

First, copy the JSON that you want to convert, from any source. Here's an example of JSON that describes Book with ratings from popular sources:

```json
{
	"book": {
		"title": "To Kill a Mockingbird",
		"author": "Harper Lee",
		"year": 1960,
		"genre": "Fiction",
		"publisher": "J. B. Lippincott & Co.",
		"summary": "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
		"ISBN": "9780446310789",
		"ratings": {
			"goodreads": 4.3,
			"amazon": 4.9,
			"barnesAndNoble": 4.8
		}
	}
}
```

Then right-click where you want to create the class and choose **Copy / Paste Special** | **Paste Special: JSON as classes** from the context menu, and the result is similar to the code below:

```csharp
public class Book
{
    public string title { get; set; }
    public string author { get; set; }
    public int year { get; set; }
    public string genre { get; set; }
    public string publisher { get; set; }
    public string summary { get; set; }
    public string ISBN { get; set; }
    public string price { get; set; }
    public Ratings ratings { get; set; }
}

public class Ratings
{
    public double goodreads { get; set; }
    public double amazon { get; set; }
    public double barnesAndNoble { get; set; }
}
```

Choosing **Paste Special: JSON as records** produces a similar result geared toward using C# records.

```csharp
public record Book(
    string title,
    string author,
    int year,
    string genre,
    string publisher,
    string summary,
    string ISBN,
    string price,
    Ratings ratings
);

public record Ratings(
    double goodreads,
    double amazon,
    double barnesAndNoble
);
```

Notice that Rider figures out which data types to use, as well as relationships between the JSON data.
