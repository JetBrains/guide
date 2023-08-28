import { expect, test } from "vitest";
import { getObsoletes } from "./obsoletes";

test("should collect JSON data about obsoletes", () => {
	const obsoletes = getObsoletes([
		{
			path: "/tips/some-tip/",
			frontmatter: { obsoletes: ["webstorm/author/pwe", "pycharm/author/pwe"] },
		},
		{
			path: "/tips/some-other-tip/",
			frontmatter: { obsoletes: ["webstorm/author/jw"] },
		},
	] as any);
	expect(obsoletes.length).toEqual(3);
});
