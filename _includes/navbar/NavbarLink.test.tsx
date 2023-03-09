import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import NavbarLink, { NavbarLinkProps } from "./NavbarLink.11ty";
import fixtures from "../fixtures";

const props: NavbarLinkProps = fixtures.site.end.links[0];

test("NavbarLink", () => {
  document.body.innerHTML = NavbarLink(props);
  const result = screen.getByRole("link") as HTMLAnchorElement;
  expect(result).to.exist;

  expect(result.href).to.equal("https://github.com/jetbrains/jetbrains_guide");
  const span = result.querySelector("span") as HTMLSpanElement;
  expect(span.getAttribute("style")).to.equal("{ color: #light }");
  const i = span.querySelector("i") as HTMLElement;
  expect(i.className).to.equal("fab fa-lg fa-github");

  expect(screen.getByLabelText("github Icon")).to.exist;
});
