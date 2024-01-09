import { expect, test } from "vitest";

import Navbar from "./Navbar.11ty";

test("Navbar", () => {
	document.body.innerHTML = (
		<Navbar
			featuredResource={undefined}
			technologies={[]}
			solutions={[]}
			topics={[]}
		/>
	);

	const result = document.querySelector("nav");
	expect(result && result.tagName).to.equal("NAV");
});
