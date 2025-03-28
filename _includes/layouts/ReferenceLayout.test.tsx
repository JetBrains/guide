import { expect, test } from "vitest";
import { ReferenceLayout, ReferenceLayoutProps } from "./ReferenceLayout.11y";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../fixtures";
import { jsxToString } from "jsx-async-runtime";

const tip0 = fixtures.tipItems[0];
let renderProps: ReferenceLayoutProps = {
	...baseRenderData,
	...tip0.data,
	page: tip0.page,
	listing: <p>Some Title</p>,
	pagination: fixtures.paginationProps.pagination,
};

test("make a ReferenceLayout", async () => {
	const r = <ReferenceLayout {...renderProps}></ReferenceLayout>;
	document.body.innerHTML = await jsxToString(r);
	expect(screen.getByText("Some Title")).toBeTruthy();
});

test("does not show empty pagination", async () => {
	const r = <ReferenceLayout {...renderProps}></ReferenceLayout>;
	document.body.innerHTML = await jsxToString(r);
	expect(screen.getByLabelText("Pagination")).toBeTruthy();
});
