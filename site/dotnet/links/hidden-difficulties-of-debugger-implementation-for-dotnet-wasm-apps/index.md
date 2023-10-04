---
date: 2023-10-03
title: Hidden Difficulties of Debugger Implementation for .NET WASM Apps
topics:
  - .net
  - debugging
author: maartenba
subtitle: Andrii Rublov
thumbnail: ./thumbnail.png
video: "https://youtu.be/eS4SMDd9jH0"
linkURL: "https://youtu.be/eS4SMDd9jH0"
---

Debug infrastructure implementation for .NET (Blazor) WebAssembly apps is challenging due to its unique execution environment. In this talk, we will dive deep into the hidden difficulties of debugger IDE frontend implementation for .NET WASM apps.

We'll start with an overview of the Blazor WASM app execution anatomy, reviewing Debug Proxy. We will then compare regular .NET debugging with Blazor debugging and introduce Rider Debugging Infrastructure. Next, we'll discuss the steps involved in debug session initialization, including how the CDP (Chrome DevTools Protocol) is used. We will also cover breakpoints and evaluation. Finally, we will have a brief discussion about hot-reload, how it works, and how it is supported from the IDE side.

This talk is essential for .NET developers working with Blazor WASM and anyone interested in understanding the complexities of debugging .NET WASM applications.

### About the Presenter

**Andrii Rublov**

Andrii Rublov, Software Developer, JetBrains. Andrii is a software engineer whose main interest is creating tooling for programming languages. He’s also active in game development. Andrii likes to stay busy: he actively contributes to various open-source projects in his spare time. But having numerous pet projects on his plate never stops him from diving into new ones. He is the creator of the EF Core and MonoGame plugins for JetBrains Rider.

- [Slides](https://docs.google.com/presentation/d/1f_nY2_MnafiEO7jJl-pZzWdMFFfSWYchMjQwqueYgIY/edit?usp=sharing)
