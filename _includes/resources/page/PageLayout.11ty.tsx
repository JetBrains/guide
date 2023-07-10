// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { PageFrontmatter } from "./PageModels";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";

export type PageLayoutData = LayoutProps & PageFrontmatter;

export function PageLayout(
  this: LayoutContext,
  data: PageLayoutData
): JSX.Element {
  const pageTitle = "XXXXXXXXXX";
  // Main content
  const main = <div>Hello content</div>;

  return (
    <BaseLayout {...data} title={pageTitle}>
      <main>{main}</main>
    </BaseLayout>
  );
}

export const render = PageLayout;
