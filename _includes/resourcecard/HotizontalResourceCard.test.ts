import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import fixtures from "../fixtures";
import HorizontalResourceCard from "./HorizontalResourceCard.11ty";
import { renderToString } from "jsx-async-runtime";

test("HorizontalResourceCard", async () => {
	const resource = fixtures.resources[0];

	const r = HorizontalResourceCard({ resource });
	document.body.innerHTML = await renderToString(r, {});
	const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
		name: "Resource",
	});
	expect(links[0].href).to.equal(fixtures.tips[0].url);
});
