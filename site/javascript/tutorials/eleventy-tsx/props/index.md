---
title: Components With Props
type: TutorialStep
date: 2024-04-21
author: pwe
subtitle: Faster, smoother development and reusability with components and props.
thumbnail: ./thumbnail.png
video: ""
---

Our site is currently one "component". And that component is more like a "view." Let's start that split by making
a `Heading` component that can get passed a prop for who to say hello to.

Let's say our site content will be in `site` and our software components in `components`:

Our `vitest.config.js` file needs to be pointed at both the `site` and `components` directories:

```javascript
{% include "./demos/vitest.config.js" %}
```

We should do something similar in `tsconfig.json`:

```json
{% include "./demos/tsconfig.json" %}
```

With this in place, let's make `components/Heading.tsx` (note that it didn't need the `.11ty` in the filename):

```tsx
{% include "./demos/components/Heading.tsx" %}
```

We can test the default and passed-value cases in `components/Heading.test.tsx`:

```tsx
{% include "./demos/components/Heading.test.tsx" %}
```

Running this in the IDE shows that our component works in isolation -- using a fake browser (Happy-DOM):

![Component Test](./vitest.png)

In fact, you can go into true TDD mode and run Vitest in watch mode. It's so fast, you get answers as you type. No need
to re-run your site and revisit your browser.

Now, let's go back to our `site/index.11ty.tsx` template and point it at a component:

```typescript jsx
import { Heading } from "../components/Heading";

export function Index(): JSX.Element {
	return <Heading />;
}

export const render = Index;
```

Tests all pass, the page still builds the same. All good.
