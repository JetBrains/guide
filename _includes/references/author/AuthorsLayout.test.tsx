import { expect, test } from "vitest";
import { AuthorsLayout } from "./AuthorsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";

test("should render AuthorsLayout", () => {
  const renderProps: ReferenceLayoutProps = {
    ...baseRenderData,
    title: "Authors",
    resourceType: "author",
    listing: [""],
    page: {
      url: "/authors",
      fileSlug: "some-slug",
      date: fixtures.date,
    },
  };
  fixtures.context.getReferences = () => fixtures.authors;
  document.body.innerHTML = AuthorsLayout.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Author",
  });
  expect(links[0].href).to.equal("/authors/aa/");
});
