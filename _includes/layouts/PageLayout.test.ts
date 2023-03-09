import { expect, test } from "vitest";
import { PageLayout, PageLayoutData } from "./PageLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../fixtures";
import { SiteCollections } from "../models";

test("should render PageLayout", () => {
  const tip0 = fixtures.tipItems[0];
  const pageLayoutData: PageLayoutData = {
    ...tip0.data,
    page: tip0.page,
    collections: fixtures.resolvedCollections as SiteCollections,
    content: fixtures.content,
    site: fixtures.site,
  };

  document.body.innerHTML = PageLayout.call(fixtures.context, pageLayoutData);
  expect(screen.getByText("world")).to.exist;
});
