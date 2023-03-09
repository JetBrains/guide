import h from "vhtml";
import { beforeEach, expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import NavbarSearch from "./NavbarSearch.11ty";

beforeEach(() => {
  document.body.innerHTML = (
    <>
      <div id="navbarBurger"></div>
      <NavbarSearch />
      <script src="../../public/assets/js/search.js"></script>
    </>
  );
});

test("NavbarSearch exists", () => {
  const result = screen.getByRole("button", { name: "Trigger Searchbox" });
  expect(result).to.exist;
});

test("searchbox and results should not be visible by default", () => {
  const searchbox = screen.getByRole("textbox", { name: "Search" });
  expect(searchbox).to.exist;
});

test("clicking search button activates searchbox", () => {
  const button = screen.getByRole("button", { name: "Trigger Searchbox" });
  const dropdown: HTMLCollectionOf<Element> =
    document.getElementsByClassName("dropdown");
  expect(dropdown).to.exist;
  expect(dropdown[0].classList.contains("is-active")).not.to.be.true;
  button.click();
  expect(dropdown[0].classList.contains("is-active")).not.to.be.true;
});
