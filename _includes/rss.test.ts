import { expect, test } from "vitest";
import { RssLayout } from "./rss.11ty";
import { baseRenderData } from "./fixtures";
import { LayoutProps } from "../src/models";

const data: LayoutProps = {
	...baseRenderData,
	page: {
		url: "/rss.xml",
		date: new Date(),
		fileSlug: "rss.xml",
	},
};

test("can generate rss.xml", () => {
	// @ts-ignore
	const result = RssLayout(data);
	expect(result).to.contain("Another Tutorial");
});
