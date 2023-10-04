import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import fixtures from "../fixtures";
import HorizontalResourceCard from "./HorizontalResourceCard.11ty";

test("HorizontalResourceCard", () => {
	const resource = fixtures.resources[0];

	document.body.innerHTML = HorizontalResourceCard({ resource });
	const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
		name: "Resource",
	});
	expect(links[0].href).to.equal(fixtures.tips[0].url);
});
