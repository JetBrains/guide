---
type: TutorialStep
date: 2023-06-01
title: Forms in Blazor
technologies: [blazor,.net,asp.net]
topics: [web]
products: [rider,resharper]
author: rachelappel
subtitle: View and edit data in forms
thumbnail: ./thumbnail.png
---

## Blazor Forms

Many web applications allow the user to enter new data or display data for the user to modify, and they do these with forms. In HTML, the elements between the `<form>` tag are automatically sent to a server with HTTP Requests. 
We can tap into the HTML form by using Blazor’s `<EditForm>` with Blazor controls and HTML elements. The `<EditForm>` renders an HTML `<form>` on the client. The `Model` property of `<EditForm>` provides data binding and validation through data attributes.
Using `<EditForm>` enables you manage forms with familiar `Model.Property` syntax.

## Form Controls

Just as with HTML forms, you must put form fields between the `<EditForm>` tags, and you need to denote some action for the form to take when the user submits it. 

```cs 
<EditForm Model="@todo" OnSubmit="@HandleValidSubmit">
  <!-- form fields -->
</EditForm>
```

Blazor controls are identified by their `Input` prefix. For example, `<InputText>`, `<InputCheckbox>`, and `<InputDate>` all render corresponding HTML form controls (textbox, checkbox, and date inputs, respectively). Both HTML and Blazor controls are bindable. 

Buttons can be `<button>` elements, `<input>` elements with a `type=button` or `type=submit`, an `a` tag, or a custom component. Other form controls can also be custom built. To use the control, just call the Blazor control by its name using HTML tag style syntax. See [Blazor components](../components) for more on components.

```cs 
<EditForm Model="@todo" OnSubmit="@HandleValidSubmit">
    <div class="form-group m-3">
        <label for="todo-item">To do: </label>
        <InputText id="todo-item" @bind-Value="@todo.Title"></InputText>
    </div>
    <div class="form-group m-3">
        <label for="todo-item">Due date:</label>
        <InputDate id="todo-date" @bind-Value="@todo.Due"></InputDate>
    </div>
    <div class="form-group m-3">
        <label for="todo-important">Important:</label>
        <InputCheckbox id="todo-important" @bind-Value="@todo.Important"></InputCheckbox>
    </div>
    <div class="form-group m-3">
        <label for="todo-complete">Complete:</label>
        <InputCheckbox id="todo-complete" @bind-Value="@todo.Complete"></InputCheckbox>
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary" @onclick="@HandleValidSubmit">Submit</button>
    </div>
</EditForm>
```

The controls render the following form in a web page. Note that any styling is because the Blazor project template uses [Bootstrap](https://getbootstrap.com/).

## Validation

Having the data stored properly is important to any software. And validation is the first step in proper data storage. Validation starts in the project containing the data model. To set up validation at the model level, use Data Annotations from the `System.ComponentModel.DataAnnotations` namespace and mark up the properties in the class with the validations you want. For example, a `Meal` class in a meal planning app would contain validations for required fields, constraints on the length of string fields, and date constraints, as shown in the following sample:

While Entity Framework will still recognize the primary key because of the naming convention, some feel the code is more clear with the `Key` attribute.

The data annotations applied to the model are used by Blazor validators. To enable validation for a form, add a `DataAnnotationsValidator` component. This will run validation against form elements and supply a default message for any form field that doesn’t pass validation.  You will likely want to add a `ValidationSummary` or `ValidationMessage` components, or both. The `ValidationSummary` component displays a list of error messages for all form fields that do not pass validation. The `Validationsummary` displays the list where it is placed in the page.

If you prefer to display error messages for a specific input on the form, then use the `ValidationMessage` component.

```cs
<DataAnnotationsValidator />
<ValidationSummary />
```

The `ValidationSummary` and `ValidationMessage` components can be used together. If form fields do not pass validation, then the `DataAnnotationsValidator` calls `HandleInvalidSubmit` where you can perform logic related to validation.

```cs
<ValidationMessage For="() => todo.Title"/>
 
private void HandleInvalidSubmit()
{
  statusClass = "alert-danger";
  message = "Show a meaningful error message.";
}
```

## Updating Data

The `HandleValidSubmit` is the method that is called when an HTTP request has been submitted. From there, you can call a service layer that calls the API, and the API can update the data. A `HandleValidSubmit` method looks something like the following sample. Notice you may have to determine whether a user is inserting or updating data. Additionally, you may need to do a bit of processing to send the data to the service and API in the shape it expects. 


## Conclusion
Blazor forms are a server side way to work with the same HTML forms and HTTP requests that web developers are already familiar with. 
Blazor contains several controls to help, but plain HTML elements work just as well. Additionally, Blazor helps with validation and some common actions that normally happen in a web app.

### See Also
* [ASP.NET Core Blazor forms and validation](https://docs.microsoft.com/en-us/aspnet/core/blazor/forms-validation?view=aspnetcore-5.0)
* [Model validation in ASP.NET Core MVC and Razor Pages](https://docs.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-5.0)
* [Handling form submission](https://blazor-university.com/forms/handling-form-submission/)
* [Automatically generate a form from an object in Blazor](https://www.meziantou.net/automatically-generate-a-form-from-an-object-in-blazor.htm)

