import { expect, test } from "vitest";
import fixtures, { baseRenderData } from "../../fixtures";
import {
	TutorialStepLayout,
	TutorialStepLayoutData,
} from "./TutorialStepLayout.11ty";
import { screen } from "@testing-library/dom";
import { renderToString } from "jsx-async-runtime";

test("should render TutorialStepLayout", async () => {
	// @ts-ignore
	const tutorialStepLayoutData: TutorialStepLayoutData = {
		...baseRenderData,
		content: fixtures.content,
		...fixtures.tutorialStepItems[0].data,
		page: fixtures.tutorialStepItems[0].page,
	};
	const r = TutorialStepLayout.call(fixtures.context, tutorialStepLayoutData);
	document.body.innerHTML = await renderToString(r, {});
	// Make sure sidebar steps renders correctly
	const link: HTMLAnchorElement = screen.getByRole("link", {
		name: `Another Tutorial Step`,
	});
	expect(link.href).to.equal("/tutorials/some-tutorial/another-tutorialstep/");
});
