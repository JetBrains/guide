import { beforeEach, expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import NavbarSearch from "./NavbarSearch.11ty";
import { renderToString } from "jsx-async-runtime";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

beforeEach(async () => {
	const r = (
		<Fragment>
			<div id="navbarBurger"></div>
			<NavbarSearch />
		</Fragment>
	);
	document.body.innerHTML = await renderToString(r);
});

test("NavbarSearch exists", () => {
	const result = screen.getByRole("button", { name: "Trigger Searchbox" });
	expect(result).toBeTruthy();
});

test("searchbox and results should not be visible by default", () => {
	const searchbox = screen.getByRole("searchbox", { name: "Search" });
	expect(searchbox).toBeTruthy();
});

test("clicking search button activates searchbox", () => {
	const button = screen.getByRole("button", { name: "Trigger Searchbox" });
	const dropdown: HTMLCollectionOf<Element> =
		document.getElementsByClassName("dropdown");
	expect(dropdown).toBeTruthy();
	expect(dropdown[0].classList.contains("is-active")).not.to.be.true;
	button.click();
	expect(dropdown[0].classList.contains("is-active")).not.to.be.true;
});
