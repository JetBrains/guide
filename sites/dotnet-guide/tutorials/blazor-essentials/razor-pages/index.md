---
type: TutorialStep
date: 2023-06-01
title: Razor Pages
technologies: [blazor,.net,asp.net]
topics: [web]
products: [rider,resharper]
author: rachelappel
subtitle: Build a UI using Razor Pages in Blazor.
thumbnail: ./thumbnail.png
---

## Razor pages

UIs built with Blazor contain a collection of components built with Razor Pages. "Component" is a generic term for a class, page, or any programmable unit in Blazor that contains C#, HTML, and CSS. All Blazor components are files that have a `.razor` extension.

But there is one distinct difference between pages and components: Pages start with the `@page` directive that designates them as an entire web page and supplies routing information. Components don't use the `@page` directive. 
This is because components with the `@page` directive are used a complete HTML page, where a component is a block of code that runs inside a page.  

There's [more on routing](../routing/) later in these tutorials. But for now, the `@page` directive tells the host how to route page requests to Razor Pages. `@page "/"` marks a page as the default page (often called `Index.razor`). A page with a directive of `@page "/ToDoList"` maps to the physical `Pages\ToDoList.razor` file and routes HTTP requests to `<application-root>/ToDoList`.

There are two approaches to adding code to Blazor pages and components. The first approach is using the `.razor` file itself and placing the code inside a `@code` block after the HTML code. 
If you’re wondering if this could make the pages more difficult to read and maintain - yes, that can be the case. This is especially true for large enterprise applications. Doing everything in-page tends to work better for small pages or small apps.

The second approach is to create a corresponding class with the same name and extension of `.razor.cs`. This creates a partial class that is split across the Blazor component and its corresponding partial class. This makes a better separation between the HTML and C# code, yet allows interaction between them. 
If your app's UI is complex or detailed then this is a good way to keep the code readable and maintainable.

## Razor syntax
Razor syntax is C# code interspersed with HTML that render pages and sends them to the client. Razor is the same C# code that is used in MVC. 
To use Razor expressions, add the `@` symbol to render the output of a variable, property, or return value of a method. For example, to render today’s date, use the following:

`<span>Today is @DateTime.Today.ToShortDateString()</span>`

Notice that Razor and HTML are mixed together. To render a `span` with a `class` attribute that renders the value from a variable named `shortdate-style`, use the following:

`<span class="@shortdate-style">Today is @DateTime.Today.ToShortDateString()</span>`

To call a function or method is what you'd expect in C#.

`<span class="@class">Today is @GetNicelyFormattedDate()</span>`

You can do more than simple Razor expressions or function calls. To create a block of Razor code that contains UI logic, enclose the code in `@{}`. This code may be mixed with HTML.

```cs
@{
    switch (DateTime.Now.Hour)
    {
        case < 12:
            <h3>Good Morning</h3>
            break;
        case <= 18 and >= 12:
            <h3>Good Afternoon</h3>
            break;
        case >18:
            <h3>Good Evening</h3>
        break;
    }
}
```

Alternatively, the previous code sample could be rewritten as follows, completely in C# and the call to it embedded in HTML.
This is often considered easier to read and works with both models - putting all the code in a single `.razor` file or a Razor partial class.

```cs
<h3>@GetTimePeriod(DateTime.Now)</h3>

@code {
    private string GetTimePeriod(DateTime date)
    {
        switch (date.Hour)
        {
            case < 12:
                return "Good Morning";
            case >= 12 and <= 18:
                return "Good Afternoon";
            case > 18:
                return "Good Evening";
        }
    }
}
```

Components can be called using declarative syntax. The following sample calls a component named `Message` and passes the message to it for display as an attribute of the `Message` tag. 

`<Message MessageText="Don't forget to do your 'To Dos'" MessageStyle="important-alert"></Message>`

The source of the component is found in `Message.razor`. It  displays the `MessageText` parameter in a paragraph and styles it using the `MessageStyle` parameter.

```cs
<p MessageStyle=@MessageStyle>@MessageText</p>

@code {
[Parameter]
public string? MessageText { get; set; }
public string? MessageStyle { get; set; }
}
```

There's more on Blazor components in the [next tutorial step](../components).

## Layouts

High quality user interfaces on websites have a standardized look and feel to them, with clear and straightforward navigation. 
There are Blazor project templates available that have basic references and a changeable theme, though you may choose to build from an empty project.
Below are a few folders and files of interest regarding layout:

- `App.razor` : This file defines which component should be used for layouts, plus routing information. 
- `Shared\MainLayout.razor` and `Shared\MainLayout.razor.css` : This is the layout defined in the template, or you may create a main layout component yourself.  
- `Shared\NavMenu.razor` and `Shared\NavMenu.razor.css` : The `NavMenu` file defines the site's navigation. Same as with the main layout, you can create this from scratch.
- `wwwroot\` : This folder has long been in ASP.NET projects, and is in here too for CSS and those times you need JavaScript.
 

## Conclusion
Razor syntax enables you to create web pages using a mix of C# and HTML, and less JavaScript than you normally would in former versions of ASP.NET. 
It's flexible so you can choose to put the code inside a single Razor page or split the UI and UI logic into partial classes.


## See Also

- [Blazor Project Structure](https://learn.microsoft.com/en-us/aspnet/core/blazor/project-structure?view=aspnetcore-7.0)
- [Blazor Components](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/?view=aspnetcore-7.0) 
- [Razor Syntax](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-7.0)
