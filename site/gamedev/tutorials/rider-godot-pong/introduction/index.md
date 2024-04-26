---
type: TutorialStep
date: 2024-04-26
title: Introduction To Game Development
topics:
  - gamedev
  - ide
  - rider
  - godot
author: khalidabuhakmeh
subtitle: >-
  Introduction to game development and why you would consider Godot Game Engine and C# for your game.
thumbnail: ../thumbnail.png
---

## Why Game Development and why now?

Video games continue to be a magical form of entertainment, putting the player in a position to control and embody different characters in fantastical worlds. In regards to modern mediums of expression, video games are fantastic. Video games have an uncanny ability to tap into our emotions, evoking a spectrum of feelings ranging from joy to sadness, frustration, and the satisfaction of overcoming incredible odds. Many modern pop culture icons come from video games such as Super Mario, Samus Aran (Metroid), Chun-Li (Street Fighter), Pac-Man, and Sonic the Hedgehog.

Not only have big game studios successfully created legendary game franchises, but the rise of independent (indie) game developers in the last few years has been remarkable. These indie game successes, including Vampire Saviors, Hotline Miami, Outer Wilds, and Balatro, have proven that with determination and the right tools, success is possible even in a competitive industry. Indie developers also have access to some of the largest gaming platforms, such as PlayStation, Xbox, iOS, and Android, further leveling the playing field.

With the help of freely accessible game engines, indie developers have used video games as a medium for personal expression and storytelling that may have been impossible only a decade ago. Around those engines grow communities of hobbyists and professionals willing to share knowledge. This combination of tools and knowledge-sharing is helping democratize video game development.

What options do folks have today for building video games?

There are plenty of options, like Unity and Unreal Engine, but if you're reading this, you're most interested in the Godot Game engine.

In short, game development is a skill with great potential to open up many new personal and professional opportunities. It's also a great place to play with coding techniques and better understand tools. Even if you never publish a video game, you'll still learn essential programming skills you can apply anywhere. Finally, with accessible game engines like Godot and its community, you can build social relationships that last a lifetime.

## Why Godot Game Engine?

Historically, video game development required every creator to build their game engine from scratch. Some game studios still do this today, but this requires enormous skill and resources that many folks can't afford to invest. Custom game engines, by nature, are unique and make it challenging to incorporate outside party help, enhance with newer features, and support new emerging platforms. Not to say there are never any advantages to building your game engine, but it is a significant undertaking that many don't have the patience for.

Godot offers game developers many advantages they should consider when picking a game engine:

1. Built-in features include an editor, cameras, lighting, physics, etc.
2. Open-source software and online script-sharing.
3. Documentation and community resources.
4. Multi-platform development for Windows, macOS, and Linux.
5. Multi-platform targeting such as Windows, macOS, iOS, Android, and Web.
6. Multi-language support from GDScript, C#, Kotlin, Swift, Rust, and more.
7. Actively maintained and supported.
8. No fees or royalty payments.

For folks getting started with game development, the Godot game engine has an incredibly intuitive user experience and a batteries-included approach to building simple to complex games. It's a great starting point to scratch your game development itch.

## Why C# Scripting?

As mentioned in the previous section, Godot offers developers a variety of programming languages to choose from when scripting their game's logic. The default option is [GDScript, a Python-like language](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html) with first-class support in Godot. There are a few advantages to picking C# over GDScript; we'll list them here.

### Performance

GDScript is an interpreted language, meaning converting scripts into executable code takes some time. C# and .NET, on the other hand, are compiled and can execute at [4 times faster](https://docs.godotengine.org/en/stable/tutorials/scripting/c_sharp/c_sharp_basics.html#performance-of-c-in-godot) than the equivalent GDScript. The ability to optimize for performance can make a significant impact on gameplay.

### Strongly Typed Language

C# is a strongly typed language, which makes it challenging to get into situations where you misunderstand the intent of the code you're writing and reading.

### More Tooling Choices

When working with .NET, you can use code-editing tools such as JetBrains Rider. You can also diagnose performance and memory issues using dotTrace and dotMemory. Finally, you can write and run C# tests against your game. All these advantages can help you write your games faster.

### NuGet Packages

Since Godot uses .NET, you can use third-party libraries published on NuGet to modify and enhance your game. This reduces the code you need to manage in your asset library. It also allows you to refactor, package, and deploy functionality for reuse across multiple games.

### Familiarity with C# Language

If you're a long-time .NET developer, you're likely more familiar and comfortable with C# idioms. Rather than learn yet another language, it might be more practical to use C#, especially after learning about some of the advantages mentioned previously.

### C# is Popular in Game Development

C# is a great scripting language option for building Godot-powered games, and you'll be in great company as it's used in many other game engines as well. The popularity of C# means you'll find examples of game logic designed for other game engines and be able to port the functionality to your Godot game easily.

For these reasons, consider C# the scripting language for your next Godot game. In the next part of this tutorial, we'll see how to download and set up your Godot game development environment.
