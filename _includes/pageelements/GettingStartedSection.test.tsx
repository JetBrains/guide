import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import GettingStartedSection, {
	GettingStartedSectionProps,
} from "./GettingStartedSection.11ty";
import fixtures from "../fixtures";
import { jsxToString } from "jsx-async-runtime";

test("GettingStartedSection exists", async () => {
	const props: GettingStartedSectionProps = {
		title: "Some Title",
		subtitle: "Some Subtitle",
		description: "Some description",
		whyVideoUrl: "https://youtu.be/8sSlWDiwdkc",
		howToResources: fixtures.resources,
	};
	const r = GettingStartedSection(props);
	document.body.innerHTML = await jsxToString(r);
	expect(screen.getByText("Some Title")).toBeTruthy();
	expect(screen.getByText("Some Subtitle")).toBeTruthy();
	expect(screen.getByText("Some description")).toBeTruthy();
	expect(screen.getAllByRole("link", { name: "Another Tip" })).toBeTruthy();
});
