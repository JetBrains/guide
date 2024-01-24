import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { BottomNav, TopNav, TopNavProps } from "./TopBottomNav.11ty";
import fixtures from "../../fixtures";
import { Tutorial } from "./TutorialModels";
import { renderToString } from "jsx-async-runtime";

const parent = fixtures.resourceMap.get(
	"/tutorials/some-tutorial/"
) as Tutorial;
export const topNavProps: TopNavProps = {
	parent,
	currentStep: parent.tutorialSteps[1],
};

test("TopNav", async () => {
	const r = TopNav(topNavProps);
	document.body.innerHTML = await renderToString(r, {});

	expect(screen.getAllByRole("link", { name: "Parent Tutorial" })).to.exist;
});
test("BottomNav", async () => {
	const r = BottomNav(topNavProps);
	document.body.innerHTML = await renderToString(r, {});

	expect(screen.getByRole("link", { name: "Bottom Previous Step" })).to.exist;
	expect(screen.getByRole("link", { name: "Bottom Next Step" })).to.exist;
});
