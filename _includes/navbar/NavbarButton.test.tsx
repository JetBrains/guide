import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import NavbarButton, { NavbarButtonProps } from "./NavbarButton.11ty";
import fixtures from "../fixtures";

const props: NavbarButtonProps = fixtures.site.end.buttons[0];

test("NavbarButton", () => {
  document.body.innerHTML = NavbarButton(props);
  const result = screen.getByRole("link") as HTMLAnchorElement;
  expect(result).to.exist;

  expect(result.href).to.equal("https://www.jetbrains.com/pycharm/download/");
  expect(result.className).to.equal("button is-fullwidth-mobile is-light");
  expect(screen.getByText("Get PyCharm")).to.exist;
});
