import { expect, test } from "vitest";
import { renderToString } from "jsx-async-runtime";
import { render, Index } from "./index.11ty";
import { screen } from "@testing-library/dom";
import { ViewProps } from "../eleventy";

test("renders Index component", async () => {
	const result = renderToString(<Index filePathStem="/index" />);
	document.body.innerHTML = await renderToString(result);
	expect(screen.getByText(`Hello /index`)).toBeTruthy();
});
test("render index view", async () => {
	const viewProps: ViewProps = {
		page: { filePathStem: "/index" },
	};
	// Let's do this as a call, rather than TSX, to remind
	// ourselves that this is a view, not a "component".
	const result = render(viewProps);
	document.body.innerHTML = await renderToString(result);
	expect(screen.getByText(`Hello /index`)).toBeTruthy();
});
