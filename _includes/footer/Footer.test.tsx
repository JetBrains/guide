import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import Footer, { FooterProps } from "./Footer.11ty";
import { renderToString } from "jsx-async-runtime";

const props: FooterProps = { copyright: "Copyright" };

test("Footer", async () => {
	const r = Footer(props);
	document.body.innerHTML = await renderToString(r, {});
	expect(screen.getByRole("link", { name: "Terms of Use" })).to.exist;
});
