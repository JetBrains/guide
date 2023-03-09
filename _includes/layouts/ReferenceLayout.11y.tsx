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
    <div
      className="column is-three-quarters-desktop bio-resourcecards"
      dangerouslySetInnerHTML={{ __html: listing[0] }}
    />
  );

  return (
    <BaseLayout {...data}>
      <main className="bd-main bulmaio-body">
        <div className="bd-main-container container">
          <div className="bd-duo">
            <div className="bd-lead">
              <header className="bd-header">
                <article className="media">
                  {figure && <figure className="media-left">{figure}</figure>}
                  <div className="media-content">
                    <div className="content">
                      <div className="bd-header-titles">
                        <h1 className="title">{data.title}</h1>
                        {data.subtitle && (
                          <p className="subtitle is-4">{data.subtitle}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </header>

              {content && (
                <div className="columns">
                  <div className="column is-three-quarters-desktop">
                    <div
                      className="bd-content content"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </div>
              )}
              <div className="columns">{safeListing}</div>
            </div>
          </div>
        </div>
      </main>
    </BaseLayout>
  );
}
