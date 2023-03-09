import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import NavbarStart, { NavbarStartProps } from "./NavbarStart.11ty";
import fixtures from "../fixtures";

export const navbarStartProps: NavbarStartProps = fixtures.site.start;
test("NavbarStart", () => {
  document.body.innerHTML = NavbarStart(navbarStartProps);
  expect(screen.getByText("Tips")).to.exist;
  const firstLink = document.querySelector("a.navbar-item");
  if (firstLink) {
    expect(firstLink.className).to.equal(
      "navbar-item bd-navbar-item-documentation"
    );
    expect(firstLink.getAttribute("href")).to.equal("/webstorm/pycharm-webstorm-guide/tips/");
  }
  const firstSpan = document.querySelector("span.icon");
  if (firstSpan) {
    expect(firstSpan.className).to.equal("icon has-text-success");
  }
});
