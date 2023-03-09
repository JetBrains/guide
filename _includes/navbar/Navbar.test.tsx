import { expect, test } from "vitest";

import Navbar from "./Navbar.11ty";
import fixtures from "../fixtures";

test("Navbar", () => {
  const { site } = fixtures;
  document.body.innerHTML = Navbar({ site });
  const result = document.querySelector("nav");
  expect(result && result.tagName).to.equal("NAV");
});
