import { expect, test } from "vitest";
import { TutorialsLayout } from "./TutorialsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";

test("should render TutorialsLayout", () => {
  const tutorialsLayoutData: ReferenceLayoutProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    listing: [""],
    title: "Some Title",
    resourceType: "tutorials",
    page: {
      fileSlug: "slug",
      url: "url",
      date: fixtures.date,
    },
    site: fixtures.site,
  };
  fixtures.context.getResources = () =>
    Array.from(fixtures.resolvedCollections.allResources.values());
  document.body.innerHTML = TutorialsLayout.call(
    fixtures.context,
    tutorialsLayoutData
  );
  const links = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links).to.exist;
});
