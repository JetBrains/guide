import h from "vhtml";
import { expect, test } from "vitest";
import { ReferenceLayout, ReferenceLayoutProps } from "./ReferenceLayout.11y";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../fixtures";

const tip0 = fixtures.tipItems[0];
let renderProps: ReferenceLayoutProps = {
	...baseRenderData,
	...tip0.data,
	page: tip0.page,
	listing: ["<p>Some Title</p>"],
	pagination: fixtures.paginationProps.pagination,
};

test("make a ReferenceLayout", () => {
	document.body.innerHTML = (
		<ReferenceLayout {...renderProps}></ReferenceLayout>
	);
	expect(screen.getByText("Some Title")).to.exist;
});

test("does not show empty pagination", () => {
	document.body.innerHTML = (
		<ReferenceLayout {...renderProps}></ReferenceLayout>
	);
	expect(screen.getByLabelText("Pagination")).to.exist;
});
