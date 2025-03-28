import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout, TipLayoutData } from "./TipLayout.11ty";
import fixtures, { baseRenderData } from "../../fixtures";
import { jsxToString } from "jsx-async-runtime";

test("should render TipLayout", async () => {
	const tip0 = fixtures.tipItems[0];
	const renderProps: TipLayoutData = {
		...baseRenderData,
		...tip0.data,
		page: tip0.page,
	};
	document.body.innerHTML = await jsxToString(
		TipLayout.call(fixtures.context, renderProps),
	);
	expect(screen.getAllByText(tip0.data.title)[0]).toBeTruthy();
});
