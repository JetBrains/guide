import { LayoutContext, LayoutProps } from "../src/models";
import { BaseFrontmatter } from "../src/ResourceModels";

export function LunrLayout(
  this: LayoutContext,
  data: LayoutProps & BaseFrontmatter
): string {
  const { collections } = data;

  const results = Array.from(collections.allResources.values()).map((value) => {
    // todo: fix url for production builds
    return {
      title: value.title,
      subtitle: value.subtitle,
      url: value.url,
    };
  });

  return JSON.stringify({ results });
}

export const render = LunrLayout;
