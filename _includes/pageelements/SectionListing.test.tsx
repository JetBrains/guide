import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import SectionListing, { SectionListingProps } from "./SectionListing.11ty";
import fixtures from "../fixtures";

test("SectionListing exists", () => {
  const resources = Array.from(
    fixtures.resolvedCollections.allResources.values()
  );

  const props: SectionListingProps = {
    title: "Some Title",
    subtitle: "Some Subtitle",
    moreLink: "/more/link",
    resources,
  };
  document.body.innerHTML = SectionListing(props);
  expect(screen.getByText("Some Title")).to.exist;
  expect(screen.getByText("Some Subtitle")).to.exist;
  expect(screen.getByRole("link", { name: "Another Tip" })).to.exist;
});
