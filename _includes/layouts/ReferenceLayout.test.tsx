import h from "vhtml";
import { expect, it } from "vitest";
import { ReferenceLayout, ReferenceLayoutProps } from "./ReferenceLayout.11y";
import { screen } from "@testing-library/dom";
import fixtures from "../fixtures";
import { SiteCollections } from "../models";

it("make a ReferenceLayout", () => {
  const tip0 = fixtures.tipItems[0];
  const renderProps: ReferenceLayoutProps = {
    ...tip0.data,
    page: tip0.page,
    collections: fixtures.resolvedCollections as SiteCollections,
    content: fixtures.content,
    listing: ["<p>Some Title</p>"],
    site: fixtures.site,
  };

  document.body.innerHTML = (
    <ReferenceLayout {...renderProps}></ReferenceLayout>
  );
  expect(screen.getByText("Some Title")).to.exist;
});
