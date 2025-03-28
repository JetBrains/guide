import { expect, test } from "vitest";
// @ts-ignore
import TutorialsLayout from "./TutorialsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";

test("should render TutorialsLayout", async () => {
	const tutorialsLayoutData: ReferenceLayoutProps = {
		...baseRenderData,
		listing: <div></div>,
		title: "Some Title",
		resourceType: "tutorials" as any,
		page: {
			fileSlug: "slug",
			url: "url",
			date: fixtures.date,
			inputPath: "",
		},
		pagination: fixtures.paginationProps.pagination,
	};
	const firstTutorialURL = fixtures.tips[0].url;
	fixtures.context.getResource = () =>
		fixtures.resourceMap.get(firstTutorialURL)!;
	const tutorialsLayout = new TutorialsLayout();
	document.body.innerHTML = await tutorialsLayout.render.call(
		fixtures.context,
		tutorialsLayoutData,
	);
	const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
		name: fixtures.tips[0].title,
	});
	expect(links[0].href).to.equal("http://localhost:3000/tips/some-tip/");
});
