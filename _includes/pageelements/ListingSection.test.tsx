import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import ListingSection, { ListingSectionProps } from "./ListingSection.11ty";
import fixtures from "../fixtures";

test("SectionListing exists", () => {
  const props: ListingSectionProps = {
    title: "Some Title",
    subtitle: "Some Subtitle",
    moreLink: "/more/link",
    resources: fixtures.resolvedResources,
  };
  document.body.innerHTML = ListingSection(props);
  expect(screen.getByText("Some Title")).to.exist;
  expect(screen.getByText("Some Subtitle")).to.exist;
  expect(screen.getByRole("link", { name: "Another Tip" })).to.exist;
});
