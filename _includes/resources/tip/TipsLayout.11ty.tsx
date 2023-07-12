import h, { JSX } from "vhtml";
import {
  ReferenceLayout,
  ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { LayoutContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { Tip } from "./TipModels";

export class TipsLayout {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      title: "Tips",
      subtitle:
        "Visual, standalone, bite-sized learning resources organized into different categories.",
      pagination: {
        data: "collections.tip",
        size: 10,
      },
    };
  }

  render(this: LayoutContext, data: ReferenceLayoutProps): JSX.Element {
    const { content, pagination } = data;
    const tips: Tip[] = pagination.items.map((t: any) => {
      return this.getResource(t.url) as Tip;
    });

    const figure = undefined;
    const listing = (
      <>
        {tips.map((tip) => {
          return <ResourceCard resource={tip}></ResourceCard>;
        })}
        <nav aria-labelledby="my-pagination">
          <h2 id="my-pagination">This is my Pagination</h2>
          <ol>
            {pagination.pages.map((_: any, index: number) => {
              const page = index + 1;
              const href = pagination.hrefs[index];
              const isCurrent = pagination.page == index;
              return (
                <li>
                  <a href={href} aria-current={isCurrent}>
                    Page {page}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </>
    );
    return (
      <ReferenceLayout
        {...data}
        figure={figure}
        listing={[listing]}
        content={content}
      />
    );
  }
}

module.exports = TipsLayout;
