import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import NavbarSearch, { NavbarSearchProps } from "./NavbarSearch.11ty";

const props: NavbarSearchProps = {};

test("NavbarSearch", () => {
  document.body.innerHTML = NavbarSearch(props);
  const result = screen.getByRole("button");
  expect(result).to.exist;
});
