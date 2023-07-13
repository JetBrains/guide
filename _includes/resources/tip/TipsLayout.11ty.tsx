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
    const paginationItems = pagination ? pagination.items : [];
    const tips: Tip[] = paginationItems.map((t: any) => {
      return this.getResource(t.url) as Tip;
    });

    const figure = undefined;
    const listing = (
      <>
        {tips.map((tip) => {
          return <ResourceCard resource={tip}></ResourceCard>;
        })}
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
