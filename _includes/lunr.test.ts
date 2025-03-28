import { expect, test } from "vitest";
import { LunrBase } from "./lunr.11ty";
import { baseRenderData } from "./fixtures";
import { LayoutProps } from "../src/models";

const data: LayoutProps = {
	...baseRenderData,
	page: {
		url: "/lunr_index.json",
		date: new Date(),
		fileSlug: "lunr_index.json",
		inputPath: "",
	},
};

test("can generate lunr.json", () => {
	// @ts-ignore
	const lb = new LunrBase();
	const results = lb.getRecords(data.collections, "/somepath/");
	expect(results.length).to.be.greaterThan(0);
});

test("can generate lunr.json with path prefix", () => {
	const lb = new LunrBase();
	const results = lb.getRecords(data.collections, "/somepath/");
	expect(results[0].url).to.equal("/somepath/tips/some-tip/");
});
