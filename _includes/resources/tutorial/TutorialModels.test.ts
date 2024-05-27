import { expect, test } from "vitest";
import { resolveChildPath, Tutorial } from "./TutorialModels";
import fixtures from "../../fixtures";

test("resolve an array of child paths", () => {
	const rootPathPrefix = "/paul-everitt";
	const tutorialItem = "./first/";
	const result = resolveChildPath(rootPathPrefix, tutorialItem);
	expect(result).to.equal(`${rootPathPrefix}/first/`);
});

test("resolve parent/child tutorials and steps", () => {
	const { tutorialItems } = fixtures;
	const tutorial0 = fixtures.resourceMap.get(
		tutorialItems[0].page.url,
	) as Tutorial;
	expect(tutorial0).toBeTruthy();
	const tutorialStep0 = tutorial0.tutorialSteps[0];
	expect(tutorialStep0).toBeTruthy();
	expect(tutorialStep0.parentTutorial == tutorial0).to.be.true;
});
