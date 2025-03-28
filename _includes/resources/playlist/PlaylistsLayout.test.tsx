import { expect, test } from "vitest";
import { PlaylistsLayout, PlaylistsLayoutProps } from "./PlaylistsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";
import { jsxToString } from "jsx-async-runtime";

test("should render PlaylistLayout", async () => {
	const title = "These Tips";
	const renderProps: PlaylistsLayoutProps = {
		...baseRenderData,
		title,
		resourceType: "playlists" as any,
		page: {
			fileSlug: "slug",
			url: "url",
			date: fixtures.date,
		},
		pagination: fixtures.paginationProps.pagination,
	};
	const firstResource = Array.from(fixtures.resourceMap.values())[0];
	fixtures.context.getResource = () => firstResource;
	document.body.innerHTML = await jsxToString(
		PlaylistsLayout.call(fixtures.context, renderProps),
	);
	const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
		name: firstResource.title,
	});
	expect(links[0].href).to.equal(firstResource.url);
});
