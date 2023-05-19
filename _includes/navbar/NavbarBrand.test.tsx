import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import NavbarBrand, { NavbarBrandProps } from "./NavbarBrand.11ty";
import fixtures from "../fixtures";

export const navbarBrandProps: NavbarBrandProps = {
  channel: fixtures.channel,
  siteLogo: fixtures.site.siteLogo,
  siteTitle: fixtures.site.siteTitle,
};
test("NavbarBrand", () => {
  document.body.innerHTML = NavbarBrand(navbarBrandProps);
  const img = document.querySelector("img");
  expect(img && img.tagName).to.equal("IMG");
  expect(img && img.getAttribute("src")).to.equal(
    "/assets/jetbrains-simple.svg"
  );
  const links = document.querySelectorAll("a");
  expect(links && links[0].href).to.equal("/pycharm/");
  expect(links && links[1].href).to.equal("/pycharm/");
  expect(screen.getByText("PyCharm Guide")).to.exist;
});
