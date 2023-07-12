import h, { JSX } from "vhtml";
import { BaseLayout } from "./BaseLayout.11ty";
import { ReferenceFrontmatter } from "../../src/ReferenceModels";
import { LayoutProps } from "../../src/models";

export type ReferenceLayoutProps = {
  content?: string;
  figure?: string[];
  listing: string[];
} & LayoutProps &
  ReferenceFrontmatter;

export function ReferenceLayout(data: ReferenceLayoutProps): JSX.Element {
  const { content, figure, listing } = data;
  const safeListing = (
    <div class="columns is-multiline"
         dangerouslySetInnerHTML={{ __html: listing[0] }} />
  );

  return (
    <BaseLayout {...data}>
      <section class="section">
        <div class="container">
          <div class="is-flex">
            {figure && (<span class="mr-4">
              <figure class="image is-128x128">{figure}</figure>
            </span>)}
            <div>
              <h1 class="mt-2 mb-4 is-size-1 has-text-weight-bold">{data.title}</h1>
              {data.subtitle && (<p class="subtitle has-text-grey mb-5">{data.subtitle}</p>)}
            </div>
          </div>
          {content && (<div class="content pt-2" dangerouslySetInnerHTML={{ __html: content }}></div>)}
        </div>
      </section>

      <section class="section">
        <div class="container">
          {safeListing}
        </div>
      </section>
    </BaseLayout>
  );
}
