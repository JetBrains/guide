import { expect, test } from "vitest";
import { AuthorsLayout } from "./AuthorsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";
import { renderToString } from "jsx-async-runtime";

test("should render AuthorsLayout", async () => {
	const renderProps: ReferenceLayoutProps = {
		...baseRenderData,
		title: "Authors",
		resourceType: "author",
		listing: <div></div>,
		page: {
			url: "/authors",
			fileSlug: "some-slug",
			date: fixtures.date,
		},
	};
	const r = AuthorsLayout.call(fixtures.context, renderProps);
	document.body.innerHTML = await renderToString(r, {});
	const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
		name: "Author",
	});
	expect(links[0].href).to.equal("/authors/aa/");
});
