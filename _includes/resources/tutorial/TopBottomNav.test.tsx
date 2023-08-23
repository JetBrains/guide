import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { BottomNav, TopNav, TopNavProps } from "./TopBottomNav.11ty";
import fixtures from "../../fixtures";
import { Tutorial } from "./TutorialModels";

const parent = fixtures.resolvedCollections.allResources.get(
	"/tutorials/some-tutorial/"
) as Tutorial;
export const topNavProps: TopNavProps = {
	parent,
	currentStep: parent.tutorialSteps[1],
};

test("TopNav", () => {
	document.body.innerHTML = TopNav(topNavProps);

	expect(screen.getAllByRole("link", { name: "Parent Tutorial" })).to.exist;
});
test("BottomNav", () => {
	document.body.innerHTML = BottomNav(topNavProps);

	expect(screen.getByRole("link", { name: "Bottom Previous Step" })).to.exist;
	expect(screen.getByRole("link", { name: "Bottom Next Step" })).to.exist;
});
