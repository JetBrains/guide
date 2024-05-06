---
title: Switch to TypeScript
type: TutorialStep
date: 2024-04-21
author: pwe
subtitle: Develop 11ty sites with assistance from TypeScript typing.
thumbnail: ./thumbnail.png
video:
  url: "https://youtu.be/Jwf5F3tZX4k?si=_zJ8gCu_dlBszndz"
  start: 132
  end: 346
---

The project we created in the previous step contains two `.js` files. Maybe you like TypeScript? Let's switch this project to `.ts`.

First, of course, add the magical bag of mystery known as the `tsconfig.json` file. I hope this is right. I always just
cut, paste, and pray.

```json
{% include "./demos/tsconfig.json" %}
```

Next, let's install the [tsx](https://github.com/privatenumber/tsx) package which makes a nice wrapper
around [esbuild TypeScript](https://esbuild.github.io/content-types/#typescript), the real star of the show.

We'll also change our `build` and `start` scripts to use `tsx` as a `node` replacement:

```json
{% include "./demos/package.json" %}
```

Yes, your eyes didn't deceive you -- let's rename our config file to `eleventy.config.ts` and sprinkle in some
TypeScript syntax. 4 characters of syntax (`: any`) to be precise.

```typescript
export default function (eleventyConfig: any) {
	return {
		dir: {
			input: "site",
			output: "_site",
		},
	};
}
```

We must also rename our template to `site/index.11ty.ts` and a return type:

```typescript
{% include "./demos/site/index.11ty.ts" %}
```

We run our dev server and...wump wump, we have a problem. No files written:

```
[11ty] Wrote 0 files in 0.01 seconds (v3.0.0-alpha.4)
```

We need to return to `eleventy.config.ts` and teach it about `.ts` files. We'll go ahead and teach about `.tsx` as well.

```typescript
{% include "./demos/eleventy.config.ts" %}
```

This time when we build -- success!

```
[11ty] Writing ./_site/index.html from ./site/index.11ty.ts
[11ty] Wrote 1 file in 0.02 seconds (v3.0.0-alpha.6)
[11ty] Watching…
[11ty] Server at http://localhost:8080/
```
