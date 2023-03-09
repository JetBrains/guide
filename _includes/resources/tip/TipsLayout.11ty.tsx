import h, { JSX } from "vhtml";
import {
  ReferenceLayout,
  ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { LayoutContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export function TipsLayout(
  this: LayoutContext,
  data: ReferenceLayoutProps
): JSX.Element {
  const { content } = data;
  const tips = this.getResources("tip");
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

export const render = TipsLayout;
