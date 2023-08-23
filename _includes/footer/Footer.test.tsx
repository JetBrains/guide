import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import Footer, { FooterProps } from "./Footer.11ty";

const props: FooterProps = { copyright: "Copyright" };

test("Footer", () => {
	document.body.innerHTML = Footer(props);
	expect(screen.getByRole("link", { name: "Terms of Use" })).to.exist;
});
