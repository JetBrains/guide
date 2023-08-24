import { expect, test } from "vitest";
import fixtures from "../../fixtures";
import {
	TutorialStepLayout,
	TutorialStepLayoutData,
} from "./TutorialStepLayout.11ty";
import { screen } from "@testing-library/dom";

test("should render TutorialStepLayout", () => {
	// @ts-ignore
	const tutorialStepLayoutData: TutorialStepLayoutData = {
		collections: { ...fixtures.resolvedCollections, all: fixtures.all },
		content: fixtures.content,
		...fixtures.tutorialStepItems[0].data,
		page: fixtures.tutorialStepItems[0].page,
	};
	document.body.innerHTML = TutorialStepLayout.call(
		fixtures.context,
		tutorialStepLayoutData
	);

	// Make sure sidebar steps renders correctly
	const link: HTMLAnchorElement = screen.getByRole("link", {
		name: `Another Tutorial Step`,
	});
	expect(link.href).to.equal("/tutorials/some-tutorial/another-tutorialstep/");
});
