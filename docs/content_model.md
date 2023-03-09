# Content Model

G3 is a CMS for 11ty in which the content drives the rendering.
This document discusses the content model: decisions made, the why, etc.

## Why a content model?

In normal 11ty development, you make pages which choose layout templates.
These templates do most of the work: they get the data from the frontmatter, data cascade, and collections.
But that data is treated as dump "POJO" objects.
The template has to do most of the work to impose meaning on that data.

In a CMS, the roles are inverted.
The "resource" is the center of the universe.
Once you have a resource, you can get views for those resource types, make decisions about forward/backwards relationships, do validation, etc.

## Resources in G3

Here are some of the things we've done in G3 to bring CMS ideas to 11ty.

## Resource type

A Markdown file in a directory is associated with a content type.
Primarily, this taps into [11ty tag and collections](https://www.11ty.dev/docs/collections/).
Unfortunately, this has some drawbacks -- primarily, that the computed tags for a file are the *union* of the cascade.
We need a way to override parent decisions.

### Validation

These "not-yet-resources" exist in collections -- `collections.author` -- with items of `{page, data}`.
They are still dumb-as-a-rock POJOs.
G3 then associates them with TypeBox schemas, which also exist as TypeScript schemas.

This gives us validation while the build is happening, with exceptions thrown if the frontmatter is invalid.
In fact, we can write a JSON Schema file on each build, allowing productive in-editor frontmatter authoring.

## Resource collections

These resource objects have all the policy decisions in them to turn them into useful entities.
They flatten the data/page duality.
They flatten references, for example to authors.
They do the work that the image plugin needs for making thumbnails (async.)
And they can impose specific policy decisions.

Unlike the built-in collections, these aren't arrays.
We need keyed lookup.
We use JavaScript `Set` objects, to preserve a default sort order (alphabetical.)

These collections become an interesting place to put things like queries, derivations, and the like.

## Render views

As explained elsewhere, G3 embraces TSX via [11ty render functions](https://www.11ty.dev/docs/languages/javascript/#function).
These functions act as "views": they unpack data from the 11ty environment (`page`, `data`, configured template functions) and shape it.
They then call a TSX component for the layout, passing as props the really-normal business data.

These "render views" become an interesting integration point.
They are closely associated with a resource type or a collection of resource types.

## Config functions

The `eleventyConfig` function has some interesting possibilities.
We are using it as a stateful collection of test cases, which are run after build.
This leads to a JavaScript function being registered which is available in render views as `this.addTestCase`.
The function is in the closer where the `TestCases` instance resides, so in a way, render views have access to global state.

But other operations could happen in there as well.
With this, more work is moved out of templates into render views, then out of those, into the content model.

## Build-time sorta-Playwright

Want to validate your site?
You could run Playwright tests against your generated output.
But... ain't nobody got time for that!
Playwright is a pretty heavy tool, and most folks can't be bothered to run it during development.

As mentioned above, G3 has a `TestCases` concept.
Each render view can register a set of assertions that should run on each generated result from that view.
A post-build event handler gathers those assertions and runs them against all matching results.
The assertions use `testing-library` assertions such as `ByRole`.

## Extensible

In a proper CMS, the name of the game is to register your own content types, then register views etc. against those.
G3 makes some steps towards that:

- Central TypeBox/TypeScript schemas to extend from
- A startup-time hook
- This hook lets a "site" say its known resource types
- Also, register the custom collections for those types

This has a bunch of possibilities, but it's easy to get seduced by over-abstraction.
At the end of the day, we're still building a site, not a framework.

## Future

- Incremental and dependencies
- HTMX and fragments
