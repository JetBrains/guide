---
type: TutorialStep
date: 2023-06-01
title: Working with Data
technologies: [.net,asp.net]
topics: [web]
products: [rider,resharper]
author: rachelappel
subtitle: Work with data in a Blazor application.
thumbnail: ./thumbnail.png
---

Behind every Blazor app is data! So it’s important that we take a look at how to access data in Blazor apps. 
Many apps will just receive and send data between the Blazor client and an API. However, some will use data directly in the Blazor app. If you're making a smaller site, either way works. More complex projects may require formal architecture around them.

## The Data Model

Your data model may be located in a shared library project, or exposed through an API, depending on the project's needs. Data models are created with POCOs (Plain Old C# Classes). In .NET, developers generally use Entity Framework to map POCOs to their corresponding database objects. The members of the classes are often marked with attributes that denote a specific database constraint such as making a field required, imposing a length, or data type (See [Entity Framework](#entity-framework)). 
For the purposes of this guide demo, we're keeping it small and simple by using only the following classes:

The `ToDo` class: This is the to do item.

```cs
public class ToDo
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Due { get; set; }
    public bool Important { get; set; }
    public bool Complete { get; set; }
    public int UserId { get; set; }
}
```

The `User` class: The owner of the to do item. 

```cs
public class User
{
    public int UserId { get; set; }
    public string? Name { get; set; }
    public List<ToDo>? ToDos { get; set; }
}
```

Notice the relationship between the classes (one-to-many). Each `ToDo` is owned by only one `User`. Each `user` may have zero or more `ToDo` objects related to it. This is all that's needed for a basic To Do app. 
However, consider extra features such as a class for categories, classes for tracking repeat to do items, or code to track time spent.

## Entity Framework

If you're using an API, create some classes that look similar to the JSON you'll receive from the API and don't need Entity Framework. For those writing the data access themselves, use Entity Framework to communicate with the database.
Entity Framework uses classes from your data model to database objects in databases and provide methods for [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations. The properties of the classes map to columns in the tables. The data attributes of properties help to create constraints.

If using EF for data models, use the attributes from `System.ComponentModel.DataAnnotations` to provide metadata so that EF can generate the correct constraints at the database level. 
While EF can figure quite a bit out from the model's properties,using attributes is one way to implement finer control over the database's object's structure. Below is the previous code sample with attributes. 

```cs 
public class ToDo
{
    [Key]
    public int Id { get; set; }
    
    [Required(ErrorMessage = "You must enter a title.")]
    [StringLength(250, 
        MinimumLength = 1, 
        ErrorMessage = "The title must contain between 1 and 250 characters.")]
    public string Title { get; set; } = null!;

    [DisplayName("Date Due")]
    [DataType(DataType.Date)]
    public string? Due { get; set; }
    
    public bool Complete { get; set; }
    public bool Important { get; set; }

    [ForeignKey("Todo_User")]
    public int UserId { get; set; }
}

public class User
{
    [Key]
    public int UserId { get; set; }
    
    [Required(ErrorMessage = "A user name is required")]
    public string? Name { get; set; }
    
    public List<ToDo>? ToDos { get; set; }
}
```

## Conclusion
Apps can't really exist without data. In Blazor, we work with data by either accessing an API or by creating classes that represent how you want the data to look in a database. 
When accessing data either through an API or a Blazor app, using Entity Framework provides ways to map class members to database objects and operations. 

## See Also

- [Web API design best practices - Azure Architecture Center | Microsoft Docs](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)
- [Compare EF6 and EF Core | Microsoft Docs](https://docs.microsoft.com/en-us/ef/efcore-and-ef6/)
- [Designing the infrastructure persistence layer | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)
- [Working with Databases](https://www.jetbrains.com/dotnet/guide/tutorials/resharper-to-rider/working-with-databases/)