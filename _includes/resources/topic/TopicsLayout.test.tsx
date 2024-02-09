import { expect, test } from "vitest";
import { TopicsLayout } from "./TopicsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";
import { renderToString } from "jsx-async-runtime";

test("should render TopicsLayout", async () => {
	const topicsLayoutProps: ReferenceLayoutProps = {
		...baseRenderData,
		...fixtures.topicItems[0].data,
		listing: <div></div>,
		page: {
			url: "/topics",
			fileSlug: "some-slug",
			date: fixtures.date,
		},
	};
	fixtures.context.getResources = () => fixtures.topics as any;
	const r = TopicsLayout.call(fixtures.context, topicsLayoutProps);
	document.body.innerHTML = await renderToString(r, {});
	const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
		name: "Tag",
	});
	expect(links[0].href).to.equal("/topics/ap/");
});
