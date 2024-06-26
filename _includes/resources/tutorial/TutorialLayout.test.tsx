import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TutorialLayout, TutorialLayoutData } from "./TutorialLayout.11ty";
import fixtures from "../../fixtures";
import { renderToString } from "jsx-async-runtime";

test("should render TutorialLayout", async () => {
	const tutorialLayoutData: TutorialLayoutData = {
		commandLineArgs: { pathprefix: "/pycharm/guide" },
		collections: { ...fixtures },
		content: fixtures.content,
		...fixtures.tutorialItems[0].data,
		page: fixtures.tutorialItems[0].page,
	};
	document.body.innerHTML = await renderToString(
		TutorialLayout.call(fixtures.context, tutorialLayoutData),
	);
	const cards = screen.getAllByRole("link", { name: "Resource" });
	expect(cards && cards.length).to.equal(3);
});
