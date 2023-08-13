import { expect, test } from "vitest";
// @ts-ignore
import TutorialsLayout from "./TutorialsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";

test("should render TutorialsLayout", () => {
  const tutorialsLayoutData: ReferenceLayoutProps = {
    ...baseRenderData,
    listing: [""],
    title: "Some Title",
    resourceType: "tutorials",
    page: {
      fileSlug: "slug",
      url: "url",
      date: fixtures.date,
    },
    pagination: fixtures.paginationProps.pagination,
  };
  const firstTutorialURL = fixtures.tips[0].url;
  fixtures.context.getResource = () =>
    fixtures.resolvedCollections.allResources.get(firstTutorialURL)!;
  const tutorialsLayout = new TutorialsLayout();
  document.body.innerHTML = tutorialsLayout.render.call(
    fixtures.context,
    tutorialsLayoutData
  );
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links[0].href).to.equal("/tips/some-tip/");
});
