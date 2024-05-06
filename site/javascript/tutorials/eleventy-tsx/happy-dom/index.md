---
title: DOM Testing with Happy DOM and Testing Library
type: TutorialStep
date: 2024-04-21
author: pwe
subtitle: Better-faster testing of rendered pages using a DOM library and accessibility-oriented assertions.
thumbnail: ./thumbnail.png
video:
  url: "https://youtu.be/Jwf5F3tZX4k?si=_zJ8gCu_dlBszndz"
  start: 926
  end: 1135
---

We now 11ty development using tooling-friendly TS and TSX, for those that prefer such things. We
also have testing with the super-cool Vitest.

Our test right now asserts a string. We're going to want richer testing. Let's hook
up [Happy DOM](https://github.com/capricorn86/happy-dom) as a fake web browser
and [Testing Library](https://testing-library.com) for role-based assertions.

Why? As [React and Jest](https://jestjs.io) showed with [jsdom](https://jestjs.io/docs/configuration#testenvironment-string), it
can be very convenient to do unit test development, 100% in Node.js and the IDE, without having a full browser
application involved. This gives a very fast response cycle when combined with:

- [Vitest watch mode](https://vitest.dev/config/#watch)
- Vitest's change detection which only re-runs needed tests
- Running Vitest under WebStorm debugger to easily poke around

Let's see this in practice. First, over to `package.json` to add two dependencies -- Happy-DOM and Testing Library:

```json
{% include "./demos/package.json" %}
```

Our `vitest.config.js` file needs to be told to use Happy-DOM as the global `document`. Do this by adding
an `environment` entry in `test`:

```javascript
{% include "./demos/vitest.config.js" %}
```

Our `index.test.tsx` file can now do a real DOM with the Testing Library approach to assertions:

```javascript
{% include "./demos/site/index.test.tsx" %}
```

Testing Library's philosophy and Happy-DOM's machinery make a great combination. It feels like you have Playwright or
Selenium in a real browser. But you're still in the speed and philosophy of unit tests.

With the infrastructure in place, we'll start reworking our site and add some more components in the next step.
