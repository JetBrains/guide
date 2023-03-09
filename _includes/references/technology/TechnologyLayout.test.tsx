import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import {
  TechnologyLayout,
  TechnologyLayoutProps,
} from "./TechnologyLayout.11ty";
import fixtures from "../../fixtures";

test("should render TechnologyLayout", () => {
  const renderProps: TechnologyLayoutProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    ...fixtures.technologyItems[0].data,
    page: {
      ...fixtures.technologyItems[0].page,
    },
    site: fixtures.site,
  };
  fixtures.context.getResources = () =>
    Array.from(fixtures.resolvedCollections.allResources.values());
  document.body.innerHTML = TechnologyLayout.call(
    fixtures.context,
    renderProps
  );
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links[0].href).to.equal("/tips/some-tip/");
});
