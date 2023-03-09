import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarPublished, {
  SidebarPublishedProps,
} from "./SidebarPublished.11ty";
import fixtures from "../fixtures";

const props: SidebarPublishedProps = {
  author: fixtures.authors[0],
  displayDate: "2023-01-01",
};

test("SidebarPublished", () => {
  document.body.innerHTML = SidebarPublished(props);
  expect(screen.getByText("Some Author")).to.exist;
});
