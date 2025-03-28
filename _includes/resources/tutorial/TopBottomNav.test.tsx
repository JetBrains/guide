import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { BottomNav, TopNav, TopNavProps } from "./TopBottomNav.11ty";
import fixtures from "../../fixtures";
import { Tutorial } from "./TutorialModels";
import { jsxToString } from "jsx-async-runtime";

const parent = fixtures.resourceMap.get(
	"/tutorials/some-tutorial/",
) as Tutorial;
export const topNavProps: TopNavProps = {
	parent,
	currentStep: parent.tutorialSteps[1],
};

test("TopNav", async () => {
	const r = TopNav(topNavProps);
	document.body.innerHTML = await jsxToString(r);

	expect(screen.getAllByRole("link", { name: "Parent Tutorial" })).toBeTruthy();
});
test("BottomNav", async () => {
	const r = BottomNav(topNavProps);
	document.body.innerHTML = await jsxToString(r);

	expect(
		screen.getByRole("link", { name: "Bottom Previous Step" }),
	).toBeTruthy();
	expect(screen.getByRole("link", { name: "Bottom Next Step" })).toBeTruthy();
});
