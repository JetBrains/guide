import url from "url";
import { Value } from "@sinclair/typebox/value";

export const sitesDir = url.fileURLToPath(new URL(`../sites`, import.meta.url));

export function validateFrontmatter(
  resourceType: any,
  frontmatter: any,
  url: string
) {
  /* Throw an exception if validation fails */
  if (!Value.Check(resourceType, frontmatter)) {
    const errors = [...Value.Errors(resourceType, frontmatter)];
    const message = errors
      .map(
        (error) =>
          `Validation failure: ${error.path} failed with ${error.message} in ${url}`
      )
      .join("\n");
    throw new Error(message);
  }
}
