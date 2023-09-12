import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TopicLayout, TopicLayoutData } from "./TopicLayout.11ty";
import fixtures, { baseRenderData } from "../../fixtures";

test("should render TopicLayout", () => {
	const topicLayoutData: TopicLayoutData = {
		...baseRenderData,
		...fixtures.topicItems[0].data,
		page: fixtures.topicItems[0].page,
	};
	document.body.innerHTML = TopicLayout.call(fixtures.context, topicLayoutData);
	const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
		name: "Resource",
	});
	expect(links.length).to.equal(5);
	expect(links[2].href).to.equal("/tips/some-tip/");
});
