import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCard, { getGlowInfo } from "./ResourceCard.11ty";
import fixtures from "../fixtures";

test("ResourceCard", () => {
	const resource = fixtures.resources[0];

	document.body.innerHTML = ResourceCard({ resource });
	const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
		name: "Resource",
	});
	expect(links[0].href).to.equal(fixtures.tips[0].url);
});

test("glow CSS class", () => {
	const displayDate = "2000/01/01";
	const title = "Some Title";
	const { thumbnailFigureCss, glowCssClass } = getGlowInfo({
		displayDate,
		title,
	});
	expect(thumbnailFigureCss).toEqual("is-16by9 is-contained");
	expect(glowCssClass).toEqual("has-glow-purple");
});
