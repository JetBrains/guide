---
type: TutorialStep
date: 2023-06-01
title: Introduction to Blazor
topics:
  - .net
  - asp.net
  - blazor
  - resharper
  - rider
  - web
author: rachelappel
subtitle: Is Blazor the right choice for your application?
thumbnail: ./thumbnail.png
---

## Blazor overview

[Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/?WT.mc_id=dotnet-35129-website&view=aspnetcore-7.0) is a [Single Page Application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) web framework that is part of the [ASP.NET Core](https://dotnet.microsoft.com/en-us/apps/aspnet) framework.
Blazor enables you to create progressive web apps using C#, having significantly less reliance on JavaScript that was necessary in previous versions of ASP.NET. This model is intended to make Blazor appealing to current C# developers, since they can focus less on JavaScript and write more in C# for full-stack development. Blazor apps are built with reusable UI components that may be shared within or across applications. Blazor components include anything that is a UI element, such as an entire page, dialog, part of a page, data entry form, or more. Components access data through an API or other server-side endpoint through HTTP. JavaScript developers are familiar with this programming model in which the client-side code calls APIs to retrieve and send data. However, in Blazor, both the server-side code (APIs, models, etc...) and the client are written in C#. This enables Blazor developers to do full-stack development all in .NET, though it’s also possible to write JavaScript if desired.

Blazor apps have one of two hosting models: Blazor Server or Blazor WebAssembly. In .NET 8, Microsoft is planning on combining both models into the Blazor United framework. Both models have the same basic capabilities with a few key differences:

## Blazor Server

Blazor Server renders the UI on the server and sends the results to the client, similar in concept to ASP.NET MVC. After the page is rendered on the client, Blazor Server then uses [SignalR](https://dotnet.microsoft.com/en-us/apps/aspnet/signalr) for instant communication between client and server. This differs from previous versions of ASP.NET because they use the full HTTP request/response cycle. In Blazor server, the components that communicate between server and client are also responsible for invoking JavaScript calls and handling DOM manipulation if any is necessary.

## Blazor WebAssembly

The focus of Blazor WASM (Blazor WebAssembly) is the client. The first time someone uses a browser to access a Blazor WebAssembly application, the application is compiled and both the application and .NET framework are downloaded to the client. The application is then run as a .NET application in a sandboxed environment on the client. At this point, optimizations are run, such as trimming unused code, caching, and HTTP compression. The Blazor WASM runtime uses JavaScript interop to invoke JavaScript calls and handle DOM manipulation. This may feel like Silverlight to some, however [WebAssembly](https://webassembly.org/) is not a plug-in. WebAssembly is an open-source W3C standard, and it is supported by all major browsers, making Blazor WASM a more sustainable model in comparison to Silverlight.

## Choosing a Hosting Model

Choosing the hosting model will depend on your requirements and target audience for your application. In some cases, Below are a few things to consider when choosing a hosting model for Blazor applications:

- Blazor Server may be slower while running because it needs to make calls to the backend.
- Blazor WASM may have a slower initial load time, because it needs to be downloaded first.
- While WebAssembly is an open standard, it’s not supported on older browsers. If you must support older browsers, then go with Blazor Server.
- Blazor WASM may be more scalable because the load is on the client.
- Blazor WASM can run offline, while Blazor Server does not support offline apps.

However, with the advent of [lazy loading](https://learn.microsoft.com/en-us/aspnet/core/blazor/webassembly-lazy-load-assemblies?view=aspnetcore-7.0) in Blazor, some of these concerns are reduced.
Additionally, recent releases of Blazor have introduced a hybrid model in which you can develop desktop apps.

It may seem difficult to choose a model, but the good news is that you can [switch between models](https://www.syncfusion.com/faq/blazor/general/how-do-i-convert-a-blazor-server-side-project-to-a-blazor-webassembly-project) fairly easily.

## Conclusion

Blazor is Microsoft’s newest offering for web development. It promises less JavaScript than traditional web development while using more C# in a SPA framework. Blazor is built on the ASP.NET stack so it takes advantage of mature technology features such as the hosting model, routing, program structure, and middleware. For those moving to Blazor from ASP.NET, the learning curve is less steep since you can reuse a lot of your existing ASP.NET and web development skills.

## See Also

- [Blazor United](https://www.youtube.com/watch?v=kIH_Py8ytlY)
