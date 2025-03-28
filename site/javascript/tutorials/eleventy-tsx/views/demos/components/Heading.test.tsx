import { expect, test } from "vitest";
import { jsxToString } from "jsx-async-runtime";
import { screen } from "@testing-library/dom";
import { Heading } from "./Heading";

test("render heading with default name", async () => {
	const result = <Heading />;
	document.body.innerHTML = await jsxToString(result);
	expect(screen.getByText("Hello TSX")).toBeTruthy();
});

test("render heading with custom name", async () => {
	const result = <Heading name={`World`} />;
	document.body.innerHTML = await jsxToString(result);
	expect(screen.getByText("Hello World")).toBeTruthy();
});
