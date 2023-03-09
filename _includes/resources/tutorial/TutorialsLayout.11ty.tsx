import h, { JSX } from "vhtml";
import {
  ReferenceLayout,
  ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { LayoutContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export function TutorialsLayout(
  this: LayoutContext,
  data: ReferenceLayoutProps
): JSX.Element {
  const tutorials = this.getResources("tutorial");
  const figure = undefined;
  const listing = (
    <>
      {tutorials.map((tutorial) => {
        return <ResourceCard resource={tutorial}></ResourceCard>;
      })}
    </>
  );
  return <ReferenceLayout {...data} figure={figure} listing={[listing]} />;
}

export const render = TutorialsLayout;
