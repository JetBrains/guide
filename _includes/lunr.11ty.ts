import { LayoutContext, LayoutProps } from "../src/models";
import path from "upath";

export function LunrLayout(this: LayoutContext, data: LayoutProps): string {
  const { collections, commandLineArgs } = data;
  const { pathprefix } = commandLineArgs;

  const results = Array.from(collections.allResources.values()).map((value) => {
    return {
      title: value.title,
      subtitle: value.subtitle,
      url: pathprefix ? path.join(pathprefix, value.url) : value.url
    };
  });

  return JSON.stringify({ results });
}

export const render = LunrLayout;
