---
type: TutorialStep
date: 2023-06-01
title: Routing
technologies: [.net,asp.net]
topics: [web]
products: [rider,resharper]
author: rachelappel
subtitle: Routing in Blazor.
thumbnail: ./thumbnail.png
---

## Blazor Routing Overview
In a similar fashion to previous ASP.NET frameworks, Blazor uses routing to map URLs to pages. In Blazor, most of your routing needs are configured in the App component (`App.razor`), found in the project root or at the page level.

## Configure Blazor Routing

Use the `Router` component in `App.razor` to configure app-wide routes. At app startup, the runtime looks in the Router component’s assembly for route information for those components in the app that have a `RouteAttribute` (pages). The `RouteView` receives the `RouteData` plus any route parameters from the `Router`. It renders the specified component with its layout, including any further nested layouts. The following `Router` component is included in Blazor WebAssembly and Blazor Server project templates.

```cs
<Router AppAssembly="@typeof(Program).Assembly" PreferExactMatches="@true">
    <Found Context="routeData">
         <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)"/>
    </Found>
    <NotFound>
        <LayoutView Layout="@typeof(MainLayout)">
            <p>Sorry, there's nothing at this address.</p>
        </LayoutView>
    </NotFound>
</Router>
```
In addition to routing, a default layout can be set for components that don't specify a layout with the `@layout` directive. A good strategy is to use the default layout for all pages, except for the few that require a different layout, such as an error page. 
In pages like an error page, you can set a specific layout by setting the `@layout` page directive. For example, the following code sets the layout for an error page (e.g., in `ErrorPage.Razor`):

```cs
@layout ErrorLayout

<!-- rest of code -->
```


## Page Routing

The `@page` directive makes a Blazor component a routable page, as opposed to a component that you would use in other pages. The string value following `@page` is the route for this page. Unlike Razor Pages or MVC where naming conventions usually set the routes, Blazor’s `@page` directive sets routes based on what’s defined in its quotes. For example, `@page "/"` makes this component the default page at the app’s root. Other examples include:

`@page "/todo-list"` routes to `<project root>/todo-list`.

You can pass data into routes through a parameter. 

## Route Parameters and Constraints
Routes can be defined with parameters that map to query strings or form values in `GET` or `POST` requests. These routes can also contain constraints to limit or verify the type of information that gets to the page component. To create a route constraint, add `{}` to the end of the route that includes the name of the route parameter. For example, in an `Todos/Index.razor` file you may see the following line at the top of the page:

`@page "/todos/{type}"`

The previous line indicates that the parameter is `type`.

To create an optional constraint, add a question mark to the parameter’s definition, like so:

`@page "/todos/{type?}"`

Route constraints work similarly to database constraints. They work in tandem with route parameters to enforce data types or other rules on incoming data. For example, if a route requires an integer as input, then you can state that rule by adding a colon and the type inside the route parameter, as shown here:

`@page "/todo/{Id:int}"`

You can apply the following types to a constraint: `bool`, `datetime`, `decimal`, `double`, `float`, `guid`, `int`, and `long`.

## Catch-all Parameters
You can set a catch-all (wildcard) to route parameters to filter anything else that isn’t defined as a parameter. To create a catch-all parameter, add an asterisk to the beginning of the parameter’s definition, like this:

`@page "/catch-all/{*pageRoute}"`

The catch-all page will accept anything through this parameter.

## Route Templates
The `Router` component is where to set the routing for a Blazor Server app. This code is found in `App.razor`. As shown in the following sample, the Router breaks paths into found and not found, and the `NotFound` component defines a message to display for `404` errors.

```cs
<Router AppAssembly="@typeof(App).Assembly">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)"/>
        <FocusOnNavigate RouteData="@routeData" Selector="h1"/>
    </Found>
    <NotFound>
        <PageTitle>Not found</PageTitle>
        <LayoutView Layout="@typeof(MainLayout)">
            <p role="alert">Sorry, there's nothing at this address.</p>
        </LayoutView>
    </NotFound>
</Router>
```

## Conclusion

Routing is the traffic cop of your application. You can customize its behavior in the `Router` component, as well as on a page by page basis.

## See Also

[Routing](https://learn.microsoft.com/en-us/aspnet/core/blazor/fundamentals/routing)
