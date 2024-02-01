import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import ListingSection, { ListingSectionProps } from "./ListingSection.11ty";
import fixtures from "../fixtures";
import { renderToString } from "jsx-async-runtime";

test("SectionListing exists", async () => {
	const props: ListingSectionProps = {
		title: "Some Title",
		subtitle: "Some Subtitle",
		moreLink: "/more/link",
		resources: fixtures.resources,
	};
	const r = ListingSection(props);
	document.body.innerHTML = await renderToString(r, {});
	expect(screen.getByText("Some Title")).to.exist;
	expect(screen.getByText("Some Subtitle")).to.exist;
	expect(screen.getAllByRole("link", { name: "Another Tip" })).to.exist;
});
