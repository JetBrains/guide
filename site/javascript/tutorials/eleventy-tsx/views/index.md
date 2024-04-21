---
title: 11ty Views
type: TutorialStep
date: 2024-04-21
author: pwe
subtitle: Interfacing the 11ty system and components.
thumbnail: ./thumbnail.png
video: ""
---

We're doing TSX for our `index.11ty.tsx` 11ty template. But it doesn't really feel like a component, per-se. It feels
more like a view. It mediates between incoming 11ty data and the logic for that "page".

Let's change `index.11ty.tsx` to be a "view":

- The `render` function grabs the 11ty-specific stuff
- A component for that page receives that stuff and renders

Why this split? Testing! It's not that fun mediating with the (untyped) 11ty "bag-o-data".

We'll start with some pseudo-typing for 11ty. Make a file `eleventy.ts` at the root:

```typescript
{% include"./demos/eleventy.ts" %}
```

11ty has a _lot_ more than this. Your site might have even more (custom collections, etc.) We'll keep it simple for now.

We'll change our index page at `site/index.11ty.tsx` to have a `render` function which does the mediation:

```typescript
{% include"./demos/site/index.11ty.tsx" %}
```

As you can see, the `render` function does little more than pass the massaged-data from 11ty into the component you're
really interested in: this page. That is, the `Index` component.

Our tests in `index.test.tsx` can then model this. You first focus on writing something that gets passed in specific
data, using tests to be more productive. Then, when done, write a test for the render function, which needs the 11ty
data. We can see that split here:

```typescript
{% include "./demos/site/index.test.tsx" %}
```

When your view needs lots of data from across parts of the 11ty surface area, this split becomes more convenient.  
Moreover, when you have a chain of layouts to format Markdown data, this mediation is more important.
