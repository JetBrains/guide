import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCard from "./ResourceCard.11ty";
import fixtures from "../fixtures";

test("ResourceCard", () => {
  const resource = Array.from(
    fixtures.resolvedCollections.allResources.values()
  )[0];

  document.body.innerHTML = ResourceCard({ resource });
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links[0].href).to.equal(fixtures.tips[0].url);
});
