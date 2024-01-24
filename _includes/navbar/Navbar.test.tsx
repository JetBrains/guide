import { expect, test } from "vitest";

import Navbar from "./Navbar.11ty";
import { renderToString } from "jsx-async-runtime";

test("Navbar", async () => {
	const r = (
		<Navbar
			featuredResource={undefined}
			technologies={[]}
			solutions={[]}
			topics={[]}
		/>
	);
	document.body.innerHTML = await renderToString(r, {});
	const result = document.querySelector("nav");
	expect(result && result.tagName).to.equal("NAV");
});
