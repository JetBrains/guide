import { expect, test } from "vitest";
import { TopicsLayout } from "./TopicsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";

test("should render TopicsLayout", () => {
	const topicsLayoutProps: ReferenceLayoutProps = {
		...baseRenderData,
		...fixtures.topicItems[0].data,
		listing: [""],
		page: {
			url: "/topics",
			fileSlug: "some-slug",
			date: fixtures.date,
		},
	};
	fixtures.context.getReferences = () => fixtures.topics;
	document.body.innerHTML = TopicsLayout.call(
		fixtures.context,
		topicsLayoutProps
	);
	const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
		name: "Topic",
	});
	expect(links[0].href).to.equal("/topics/ap/");
});
