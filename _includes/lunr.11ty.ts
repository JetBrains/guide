import { LayoutContext, LayoutProps } from "../src/models";

export function LunrLayout(this: LayoutContext, data: LayoutProps): string {
  const { collections } = data;

  const results = Array.from(collections.allResources.values()).map((value) => {
    return {
      title: value.title,
      subtitle: value.subtitle,
      url: value.url,
    };
  });

  return JSON.stringify({ results });
}

export const render = LunrLayout;
