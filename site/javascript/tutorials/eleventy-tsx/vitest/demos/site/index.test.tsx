import { expect, test } from "vitest";
import { renderToString } from "jsx-async-runtime";
import { Index } from "./index.11ty";

test("render index", async () => {
	const result = <Index />;
	const rendered = await renderToString(result);
	expect(rendered).toEqual("<h1>Hello TSX</h1>");
});
