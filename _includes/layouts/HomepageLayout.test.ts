import { expect, test } from "vitest";
import { HomepageLayout, HomepageLayoutData } from "./HomepageLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../fixtures";
import { SiteCollections } from "../models";

test("should render HomepageLayout", () => {
  const tip0 = fixtures.tipItems[0];
  const pageLayoutData: HomepageLayoutData = {
    ...tip0.data,
    page: tip0.page,
    collections: fixtures.resolvedCollections as SiteCollections,
    content: fixtures.content,
    site: fixtures.site,
  };

  const resolvedResources = Array.from(
    fixtures.resolvedCollections.allResources.values()
  );

  const context = {
    ...fixtures.context,
    getResources: () => resolvedResources,
  };

  document.body.innerHTML = HomepageLayout.call(context, pageLayoutData);
  expect(screen.getAllByRole("link", { name: "Resource" }).length).to.equal(9);
});
