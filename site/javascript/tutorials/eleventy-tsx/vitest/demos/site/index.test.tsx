import { expect, test } from "vitest";
import { jsxToString } from "jsx-async-runtime";
import { Index } from "./index.11ty";

test("render index", async () => {
	const result = <Index />;
	const rendered = await jsxToString(result);
	expect(rendered).toEqual("<h1>Hello TSX</h1>");
});
