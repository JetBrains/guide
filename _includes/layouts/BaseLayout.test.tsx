import { expect, test } from "vitest";

import { BaseLayout, BaseLayoutProps } from "./BaseLayout.11ty";
import fixtures, { baseRenderData } from "../fixtures";
import { screen } from "@testing-library/dom";
import { jsxToString } from "jsx-async-runtime";

test("BaseLayout for Tip", async () => {
	const tip0 = fixtures.tipItems[0];
	const renderProps: BaseLayoutProps = {
		...baseRenderData,
		...tip0.data,
		page: tip0.page,
		children: [],
	};
	const r = BaseLayout.call(fixtures.context, renderProps);
	document.body.innerHTML = await jsxToString(r);
	expect(document.body).toBeTruthy();
});
test("BaseLayout for Channel", async () => {
	const channelItem = fixtures.channelItems[0];
	const pageLayoutData: BaseLayoutProps = {
		...baseRenderData,
		...channelItem.data,
		page: channelItem.page,
		children: [],
	};

	const r = BaseLayout.call(fixtures.context, pageLayoutData);
	document.body.innerHTML = await jsxToString(r);
	const subnavTitle: HTMLAnchorElement = screen.getByRole("link", {
		name: "Channel",
	});
	expect(subnavTitle.href).to.equal(pageLayoutData.page.url);
});
