import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SeeAlso, { SeeAlsoProps } from "./SeeAlso.11ty";
import { renderToString } from "jsx-async-runtime";

const props: SeeAlsoProps = {
	items: [
		{ title: "See Also 1", href: "/see-also-1" },
		{ title: "See Also 2", href: "/see-also-2" },
	],
};

test("SeeAlso", async () => {
	const r = SeeAlso(props);
	document.body.innerHTML = await renderToString(r, {});
	const result = screen.getByRole("link", { name: "See Also 1" });
	expect(result).to.exist;
});
