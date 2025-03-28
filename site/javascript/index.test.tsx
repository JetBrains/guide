import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../_includes/fixtures";
import { ChannelHomepageData } from "../../_includes/resources/channel/ChannelModels";

// @ts-ignore
import WebStormHomepage from "./index.11ty";
import { jsxToString } from "jsx-async-runtime";

test("should render WebStormHomepage", async () => {
	const channelItem = fixtures.channelItems[0];
	const pageLayoutData: ChannelHomepageData = {
		...baseRenderData,
		...channelItem.data,
		page: channelItem.page,
	};

	const context = {
		...fixtures.context,
		getResource: () => fixtures.channels[0],
	};

	const homepage = new WebStormHomepage();
	const r = homepage.render.call(context, pageLayoutData);
	document.body.innerHTML = await jsxToString(r);
	const subnavTitle: HTMLAnchorElement = screen.getByRole("link", {
		name: "Channel",
	});
	expect(subnavTitle.href).to.equal(pageLayoutData.page.url);
});
