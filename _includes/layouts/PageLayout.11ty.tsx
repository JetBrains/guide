import h, { JSX } from "vhtml";
import { BaseLayout } from "./BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";

export type PageLayoutData = LayoutProps & BaseFrontmatter;

export function PageLayout(
  this: LayoutContext,
  data: PageLayoutData
): JSX.Element {
  return (
    <BaseLayout {...data}>
      <div className="bd-main bulmaio-body">
        <div className="bd-side-background" />
        <div className="bd-main-container container content">
          <h1>{data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </div>
    </BaseLayout>
  );
}

export const render = PageLayout;
