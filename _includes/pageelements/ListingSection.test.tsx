import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import ListingSection, { ListingSectionProps } from "./ListingSection.11ty";
import fixtures from "../fixtures";
import { jsxToString } from "jsx-async-runtime";

test("SectionListing exists", async () => {
	const props: ListingSectionProps = {
		title: "Some Title",
		subtitle: "Some Subtitle",
		moreLink: "/more/link",
		resources: fixtures.resources,
	};
	const r = ListingSection(props);
	document.body.innerHTML = await jsxToString(r);
	expect(screen.getByText("Some Title")).toBeTruthy();
	expect(screen.getByText("Some Subtitle")).toBeTruthy();
	expect(screen.getAllByRole("link", { name: "Another Tip" })).toBeTruthy();
});
