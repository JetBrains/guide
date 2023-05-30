---
type: TutorialStep
date: 2022-11-04
title: Blazor components
technologies: [.net]
topics: [web]
products: [rider]
author: rachelappel
subtitle: Use components for a modular Blazor application.
thumbnail: ./thumbnail.png
---

Blazor’s Razor Components are at the heart of Blazor development. A component is a piece of a user interface with processing logic to enable dynamic behavior. 
## Component Lifecycle

There are several events that you can tap into to access data or perform UI operations on your components. Each event except for ShouldRender has a corresponding async event. In general, it’s better to use async operations for scalability and a smoother responding UI.

* `OnInitialized`/`OnInitializedAsync` - Use these events to fetch data and present the user interface.
* `OnParametersSet`/`OnParametersSetAsync` - This event runs when the component has received all parameters. It executes every time the parameters are updated.
* `OnAfterRender`/`OnAfterRenderAsync` - Once the component has finished rendering and all HTML has been displayed, this event is raised. This is the time to manipulate DOM elements.
* `ShouldRender`/`ShouldRender` is called each time a component is rendered. Override and use this to manipulate UI refreshes by setting the return value of `ShouldRender` to true.

With these events you can manage the lifecycle of a component as needed. Note that some events are only raised upon the first time a client accesses a page. 
Additionally, there is a workflow to how components are rendered. Keep in mind, a page is a component and each page in an app will likely contain multiple components. 
For more in-depth knowledge on the component lifecycle, visit Microsoft's [ASP.NET Core Razor component lifecycle](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle) documentation.

## Data Binding
Data binding enables us to synchronize data between a component and a data store. Data binding can be one-way or two-way. One-way data binding is simply setting the value of a DOM element to some value in a property or variable, often from a data store, or simply displaying the value of a property or variable. Two-way data binding means that the DOM element that is data bound participates in the `HTTP POST` Request when data is sent to an API. Two-way data binding is done by using the `@bind` or `@bind-Value` attributes in an element. You may bind to a property or to an event.
We'll revisit data binding in the lesson on [Forms](/tutorials/blazor-essentials/forms/) in Blazor.

## Passing Parameters to Components

Any time you have a hierarchy or nesting of components (virtually every UI framework), you'll need to share data from the between them. In Blazor, this is the job of parameters. When using a component, parameters behave exactly the same as HTML attributes. Therefore, a call to a component that displays a message might look like the following line of code:

`<Message MessageText=”An error has occurred.”/>`

`MessageText` is the parameter, so at runtime `"An error has occurred"` is passed to the `Message` component for display. 

The following code from the `Message` component (in `Message.razor`) renders the message. Inside the `div` elements are references to the `@MessageText` parameter. Notice in the `@code` section of the component that the `MessageText` property is both public and decorated with the `Parameter` attribute, so it matches the `MessageText` attribute in the call.  

```html
<div class="row">
	<div class="col">
    	<div class="alert">@MessageText</div>
	</div>
</div>

@code {
	[Parameter] public string MessageText { get; set; }
}
```

## Referencing Component Data
Sometimes, rather than using declarative HTML you need to programmatically access the component in the `@code` block to call one of the component's method.
You can do this by applying the `@ref` attribute to the component's declaration, then using it in the code. 

Take a look at the `Logger` component declaration and the call to its `log` method below. This code is found in a calling page, such as `Index.razor`:

```html

<button @onclick="@(() => logger?.Log(5))">Log</button>

<Logger @ref="logger" />

@code {
private Logger? logger;
}

```

Inside the component, `Logger.razor`:

```cs
@using Microsoft.Extensions.Logging
@inject ILogger<Logger> logger

@code {
    private string logValue;
    public void Log(int value)
    {
        logger.LogInformation("{Value}", value);
    }
}
```

## Conclusion
It's no secret in software development that components enable modular development and promote code reuse since each component is a discrete unit of code and markup. 
In Blazor, components are controlled through lifecycle events, where you can retrieve data and render displays. 


## See Also
* [Data Binding](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/data-binding?view=aspnetcore-7.0)
* [Blazor Components](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/?view=aspnetcore-7.0)
* [Templated Components](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/templated-components)
* [Razor Class Libraries](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/class-libraries)


