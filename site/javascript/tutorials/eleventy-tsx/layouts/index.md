---
title: Layouts
type: TutorialStep
date: 2024-04-21
author: pwe
subtitle: Shared wrapper templates using TSX and components.
thumbnail: ./thumbnail.png
video:
  url: "https://youtu.be/Jwf5F3tZX4k?si=_zJ8gCu_dlBszndz"
  start: 1604
  end: 1996
---

Right now our 11ty "page" is a JS render function. But most people use `site/index.md` with frontmatter that points to
a "layout". Let's do that in this step. Since this is something 11ty will "see" (in the frontmatter), let's use the 11ty
convention of `_layouts` for the directory:

```shell
$ mkdir _layouts
```

Let's rename `index.11ty.tsx` to `_layouts/MainLayout.11ty.tsx`. Then, change it to render a title from frontmatter and
the Markdown contents, while keeping the use of our `<Heading>` component:

```tsx
{% include "./demos/_layouts/MainLayout.11ty.tsx" %}
```

This will control the layout of all Markdown files in our site.

We made a slight change to `eleventy.ts` to collect the title:

```typescript
{% include "./demos/eleventy.ts" %}
```

Our `tsconfig.json` needs a slight addition, to look in this new `_layouts` directory:

```json
{% include "./demos/tsconfig.json" %}
```

Same for `vitest.config.js`:

```javascript
{% include "./demos/vitest.config.js" %}
```

Let's now move over to our test. Move `site/index.test.tsx` to the layout, finishing with
`_layouts/MainLayout.test.tsx`. Then update it as follows:

```tsx
{% include "./demos/_layouts/MainLayout.test.tsx" %}
```

We test the layout by passing its "slot" content in via component props.
As you can see, we did a test for the `<em>` content.

One last configuration change. Let's update `eleventy.config.ts` to point at `_layouts`:

```typescript
{% include "./demos/eleventy.config.ts" %}
```

With that in place, we can use Markdown in our site...pointed at a layout...which points at a component.
Here's `site/index.md`:

```markdown
{% include "./demos/site/index.md" %}
```

When we re-run our build, we get the output we expect:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>My Site</title>
	</head>
	<body>
		<h1>Hello My Site</h1>
		<p>This is a <em>very</em> nice site.</p>
	</body>
</html>
```

Our site builds, our tests pass. We have component-driven development and the tooling that TS/TSX/testing brings. What
more could we want?

Well...sitting in Vitest and working with actual builds using actual Eleventy -- the data cascade, from Markdown files
on disk. That...may be the topic of another tutorial.
