import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { AuthorLayout } from "./AuthorLayout.11ty";
import fixtures, { baseRenderData } from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";
import { renderToString } from "jsx-async-runtime";

test("should render AuthorLayout", async () => {
	const renderProps: ReferenceLayoutProps = {
		...baseRenderData,
		...fixtures.authorItems[0].data,
		page: fixtures.authorItems[0].page,
		listing: <div></div>,
	};

	const r = AuthorLayout.call(fixtures.context, renderProps);
	document.body.innerHTML = await renderToString(r, {});
	const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
		name: fixtures.tutorialStepItems[2].data.title,
	});
	expect(links[0].href).to.equal(
		"/tutorials/some-tutorial/third-tutorialstep/"
	);
});
