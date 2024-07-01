---
resourceType: tutorial
layout: resources/tutorial/TutorialLayout.11ty.tsx
date: 2024-05-04
title: Build an Asteroids game in Unity with JetBrains Rider
topics:
  - .net
  - gamedev
  - rider
  - unity
author: maartenba
subtitle: Recreating a version of the classic arcade video game.
thumbnail: ./thumbnail.png
tutorialItems:
  - ./game-graphics-assets/
  - ./create-unity-skybox/
  - ./add-prefabs-to-scene/
  - ./controlling-player-movements/
  - ./moving-exploding-asteroids/
  - ./spawning-asteroid-gameobjects/
  - ./adding-game-ui-elements/
  - ./conclusion/
---

In this tutorial, you'll build a game inspired by a retro classic: [Asteroids](<https://en.wikipedia.org/wiki/Asteroids_(video_game)>). In this game, the player controls a spaceship that can rotate left and right, thrust forward, and fire shots at incoming asteroids.

<video class="video-player" playsinline controls>
    <source src="preview.webm" type="video/webm">
</video><br/>

When asteroids are destroyed, players' scores increase, and when asteroids hit the player, the player's health decreases—eventually leading to "game over".

If you would like to play the Asteroids game I built with Unity and JetBrains Rider, you can [try it here](https://jetbrains.github.io/JetAsteroids/).

This tutorial assumes you have Unity Editor installed (I'm using the LTS version 2022.3.21f1 when writing this tutorial) and have [JetBrains Rider configured for editing scripts](https://www.jetbrains.com/help/rider/Unity.html#getting-started).

> **Tip:** You can find the [source code of this tutorial in our GitHub repository](https://github.com/JetBrains/JetAsteroids).
>
> Note the repository contains an evolved version of the game, with audio, extra gameplay elements, and more.
> The source code after finishing this tutorial is in [revision 29b034cc73d6bf916576762baac534f2d7193d4e](https://github.com/JetBrains/JetAsteroids/commit/29b034cc73d6bf916576762baac534f2d7193d4e).
> You can check it out using the `git checkout 29b034cc73d6bf916576762baac534f2d7193d4e` command on the terminal.

Now let's go!
