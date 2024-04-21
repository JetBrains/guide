import { expect, test } from "vitest";
import { renderToString } from "jsx-async-runtime";
import { Index } from "./index.11ty";
import { screen } from "@testing-library/dom";

test("render index", async () => {
	const result = <Index />;
	document.body.innerHTML = await renderToString(result);
	expect(screen.getByText("Hello TSX")).to.exist;
});
