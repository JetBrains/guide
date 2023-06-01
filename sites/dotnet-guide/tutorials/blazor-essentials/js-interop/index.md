---
type: TutorialStep
date: 2023-06-01
title: JavaScript interop
technologies: [blazor,.net,asp.net]
topics: [web]
products: [rider,resharper]
author: rachelappel
subtitle: Extend Blazor apps with JavaScript
thumbnail: ./thumbnail.png
---

## JavaScript Interop in Blazor

A key feature of Blazor is that there's very little need for JavaScript. But there will be occasions that you do need it. However, you can’t simply toss some JavaScript into a page or Blazor produces an error. JavaScript must be included and used in a specific way for Blazor to function because Blazor creates dynamic components and using JavaScript in traditional ways works outside of this model. However, it’s straightforward to use JavaScript in Blazor, and you also get the benefit of being able to call JavaScript from C# and C# from JavaScript - not just calling JavaScript in response to a DOM event.

## Call JavaScript Code
The first step necessary for writing JavaScript in Blazor is to inject the `IJSRuntime` service into the Blazor component you want to run JavaScript in. This can go under the `@page` directive. If you are using a `.razor`/`.razor.cs` pair, import the `Microsoft.JSInterop` namespace in the `razor.cs` file.

`@inject IJSRuntime js;`

Now the component is prepared to communicate with JavaScript through the `js` variable. 
Use `js.InvokeAsync` or `js.InvokeVoidAsync` from a C# function to invoke the function.

Let’s use a simple confirmation message in JavaScript (in `scripts.js`) as an example. 
It’s common practice to display a confirmation message when a user is trying to delete something. 
While nobody likes a modal popup confirmation, we'll use it here to demonstrate how it works.  
Conveniently, JavaScript has a built-in confirm function for just this scenario.

Before calling JavaScript functions, prepare your C# function by ensuring it is asynchronous. Once the concept of [async](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios) is understood, use the `async` keyword and return a `Task` to implement it in Blazor.

To call JavaScript’s `confirm` function, use the `js` service to call `InvokeAsync<T>`, where `T` is the JavaScript function’s return type. The function’s name is the first argument, in this case, `confirm`, but it can be any built-in function. Arguments follow the method’s name and match those in the function being called, if there are any, and arguments are comma separated.

In the following example, the message for the confirmation dialog is passed in as the second argument after the function's name. 

```cs
private async Task Delete()
{
  var confirmed = await js.InvokeAsync<bool>("confirm", $"Do you really want to delete {todo.Title}?");
  if (confirmed)
    {
      message.MessageText = "Task deleted!";
    }
}
```

If there is no return value, call `InvokeVoidAsync`. 

## Manage Custom JavaScript
When writing your own JavaScript, it should go in its own file under the `wwwroot` folder. For example, `wwwroot/js/scripts.js`. Don’t forget to include a `<script>` reference in `wwwroot/index.html` that links to the script file after the reference to `webassembly.js`. The `<script>` tag only works when placed in the `wwwroot/index.html` file. If you attempt to put scripts in a `.razor` file they will produce an error. This is because `<script>` tags can’t be updated dynamically by Blazor.

The body of the `Pages\_Host.cshtml` file should look similar to the following, with the script references just before the body ends. This is the only place you should put `<script>` tags.

```cs
<body>
    <!-- body -->
	<script src="_framework/blazor.webassembly.js"></script>
	<script src="js/scripts.js"></script>
</body>
```
While it’s possible to include script inside of `<script>` tags located in the `<head>` or `<body>` in `_Host.cshtml`, it’s recommended that you create external `.js` files instead.

## Conclusion
Depending on the complexity of your app’s UI, you might or might not need JavaScript. For those who do, Blazor’s JavaScript interop services are there to enable a smooth and consistent method for incorporating JavaScript code into your project.

See Also:

* [Call JavaScript functions from .NET methods in ASP.NET Core Blazor](https://docs.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-5.0)
* [ASP.NET Core Blazor JavaScript interoperability (JS interop)](https://docs.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/?view=aspnetcore-5.0) 