---
title: Templating in TSX
type: TutorialStep
date: 2024-04-21
author: pwe
subtitle: Use TSX (JSX in TypeScript) to generate HTML.
thumbnail: ./thumbnail.png
video: ""
---

You know, JSX takes a lot of grief. I get it. But you can't beat the tooling support. Using TSX as a template language
for 11ty is really sweet for two reasons: great tooling support and the isolation of component-driven development.

The first thing to understand: `esbuild` has JSX support. But it doesn't actually do JSX processing. It expects to be
pointed at a JSX renderer. Most people associate that with React, Preact, or other build-tool-colossus (negative)
experiences.

But there are actually _standalone_ JSX processors that can run in Node during build. (Or even in the browser,
post-load.) We're going to use [jsx-async-runtime](https://github.com/jeasx/jsx-async-runtime). We previously used vhtml but switched:

- Support TS typing
- Supported, active
- Lets us eliminate `import h` via tsconfig `jsImportSource`
- It's async (unlike Preact's renderer) to allow 11ty Image

First, we install the package as a dependency:

```
  "dependencies": {
    "@11ty/eleventy": "3.0.0-alpha.4",
    "jsx-async-runtime": "^0.1.8"
  },
```

We now need to tell our `tsx` package (really: `esbuild`) how to handle TSX. You can pass command line arguments. Or,
you can infer from `tsconfig.json`, which we'll do:

```json
{% include "./demos/tsconfig.json" %}
```

These two new compiler options are important:

- `"jsx": "react-jsx"` enables the `esbuild` ["automatic" mode](https://github.com/evanw/esbuild/releases/tag/v0.14.51).
  It actually has nothing to do with React.
- `"jsxImportSource": "jsx-async-runtime"` lets
  you [avoid importing an `h` function](https://esbuild.github.io/content-types/#auto-import-for-jsx) at the top of all
  your files.

These are confusing and brittle, especially the second part.

Let's rename our file to `site/index.11ty.tsx` and return TSX instead of a string:

```tsx
{% include "./demos/site/index.11ty.tsx" %}
```

Several interesting points. Obviously, the `return` hands back `JSX`, which indicate in the `JSX.Element` return type.

But notice what's missing. In our `vhtml` setup, we had to preface each file with this:

```typescript
import h, { JSX } from "vhtml";
```

This was annoying. Not the least of which: `h` wasn't even used in the file and showed up as an unused import.

If we try to build now, it will...fail. 11ty templates are supposed to return a _string_, not a JSX element. Let's fix
that in `eleventy.config.ts` by using `eleventyConfig.addTransform`:

```typescript
{% include "./demos/eleventy.config.ts" %}
```

Now when you build, you'll get this in `_site/index.html`:

```html
<!DOCTYPE html>
<h1>Hello TSX</h1>
```

To recap what we did here:

- Add JSX/TSX handling to tsconfig.json
- Changed our one page/template to TSX
- Taught 11ty to render `.tsx` templates from `JSX.Element` to a string
