---
resourceType: tutorial
layout: resources/tutorial/TutorialLayout.11ty.tsx
date: 2024-04-21
title: "Better 11ty Development with Tooling"
topics:
  - testing
  - typescript
author: pwe
subtitle: >-
  Getting a component-driven development experience that fits nicely into the 11ty zen.
thumbnail: ./thumbnail.png
tutorialItems:
  - ./setup/
  - ./switch-to-ts/
  - ./tsx-templates/
  - ./vitest/
  - ./happy-dom/
  - ./props/
  - ./views/
  - ./layouts/
video: "https://youtu.be/Jwf5F3tZX4k?si=_zJ8gCu_dlBszndz"
---

Eleventy (11ty) 3.0 [supports ESM](https://www.11ty.dev/blog/canary-eleventy-v3/). Yay! Along the way, [Zach Leatherman](https://www.zachleat.com) (11ty creator) is
unbundling some template languages, which is a good thing.

In this tutorial, we'll set up 11ty to use: ESM (duh), TypeScript (wuh?), and TSX (WAT?). For full tooling pleasure,
we'll throw in Vitest. Impatient for the "how"? We're using the [tsx](https://github.com/privatenumber/tsx) package,
which uses `esbuild`. (We're not using Vite.)

## Why TS? Why TSX?

11ty prides itself on being a simple, powerful SSG for JavaScript. No build tooling, no magic. At first glance,
TypeScript and JSX/TSX seem to be a bad fit. If you're from that world, there are lots of galactic-framework-VC-backed
choices that will delight your inner architecture astronaut.

That's not you. But while you might not want the full footgun experience, perhaps using TypeScript is your jam. When
paired with a good IDE, it makes for a good DX, for those that like tooling.

Same for JSX/TSX. _Especially_ for TSX. Having a template language with good squigglies, autocomplete, and debugging
is...chef's kiss.

Again -- we know this isn't the 11ty way. But it shows that 11ty's goodness can extend into a next level of tooling.
