import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { LinkLayout, LinkLayoutData } from "./LinkLayout.11ty";
import fixtures, { baseRenderData } from "../../fixtures";
import { renderToString } from "jsx-async-runtime";

test("should render LinkLayout", async () => {
	const link0 = fixtures.linkItems[0];
	const renderProps: LinkLayoutData = {
		...baseRenderData,
		...link0.data,
		page: link0.page,
	};
	const firstLinkURL = fixtures.articles[0].url;
	fixtures.context.getResource = () => fixtures.resourceMap.get(firstLinkURL)!;
	const r = LinkLayout.call(fixtures.context, renderProps);
	document.body.innerHTML = await renderToString(r, {});
	expect(screen.getByText(link0.data.title)).to.exist;
});
