import { expect, test } from "vitest";
import { renderToString } from "jsx-async-runtime";
import { MainLayout } from "./MainLayout.11ty";
import { screen } from "@testing-library/dom";
import { ViewProps } from "../eleventy";

test("render MainLayout", async () => {
	const viewProps: ViewProps = {
		content: "<p>This is <em>the body</em></p>",
		title: "My Site",
	};
	const result = MainLayout(viewProps);
	document.body.innerHTML = await renderToString(result);
	expect(screen.getByText(`Hello My Site`)).toBeTruthy();
	expect(screen.getByText(`the body`)).toBeTruthy();
});
