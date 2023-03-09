# References

We have forwards and backwards references.
It's a pain wiring them into the render views.
In G3, we put it into the content model.

## An example

`Author` is a kind of reference.
A `Tip` has a frontmatter field of `author: pwe`.
This means a forward reference from that tip to that author.
It should also mean a reverse reference.
If you are sitting on the `Author`, you should see all the resources that reference it.

It gets better!
Each of those matching resources *themselves* have references.
When listing all of that author's resources, we display each match in a resource card.
The resource card needs more than just the label for the technology.
It needs the full reference information: url, color, etc.

## Implementation

An individual `Author` needs a way to get at `collections.allResources`.
But it needs to be deferred, otherwise, there's kind of a cycle.

We'll extend the `Author` schema, but in a way that doesn't affect frontmatter:

```typescript
import {EleventyCollectionItem, SiteCollections} from "./models";

export type AuthorReference = {
    resources(): Resource[];
} && AuthorReferenceFrontmatter;
```

When the `getAuthorReference` factory, we'll make a closure.
It will hold a reference to `collections.allResources` and the author's `label` as the join key.
The closure function will filter the matching resources, sorted correctly.

Later, each time the render view runs, it can easily get to the references by invoking that `resources` closure on the `AuthorReference`.

Of course, we have the "it gets better".
Each resource has references, as mentioned above.
So `Resource` needs a closure to resolve forward references, such as technology.