import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import Heading, { HeadingProps } from "./Heading.11ty";
import { renderToString } from "jsx-async-runtime";

const props: HeadingProps = {
	title: "title1",
	subtitle: "subtitle1",
};

test("Heading", async () => {
	const r = Heading(props);
	document.body.innerHTML = await renderToString(r, {});
	expect(screen.getByText("title1")).to.exist;
	expect(screen.getByText("subtitle1")).to.exist;
});
