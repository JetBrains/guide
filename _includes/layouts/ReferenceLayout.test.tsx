import h from "vhtml";
import {expect, it} from "vitest";
import {ReferenceLayout, ReferenceLayoutProps} from "./ReferenceLayout.11y";
import {screen} from "@testing-library/dom";
import fixtures, {baseRenderData} from "../fixtures";

it("make a ReferenceLayout", () => {
  const tip0 = fixtures.tipItems[0];
  const renderProps: ReferenceLayoutProps = {
    ...baseRenderData,
    ...tip0.data,
    page: tip0.page,
    listing: ["<p>Some Title</p>"],
  };

  document.body.innerHTML = (
    <ReferenceLayout {...renderProps}></ReferenceLayout>
  );
  expect(screen.getByText("Some Title")).to.exist;
});
