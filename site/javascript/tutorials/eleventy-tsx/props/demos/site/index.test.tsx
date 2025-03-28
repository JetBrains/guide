import { expect, test } from "vitest";
import { jsxToString } from "jsx-async-runtime";
import { Index } from "./index.11ty";
import { screen } from "@testing-library/dom";

test("render index", async () => {
	const result = <Index />;
	document.body.innerHTML = await jsxToString(result);
	expect(screen.getByText("Hello TSX")).toBeTruthy();
});
