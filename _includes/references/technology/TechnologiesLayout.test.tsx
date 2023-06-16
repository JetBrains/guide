import { expect, test } from "vitest";
import { TechnologiesLayout } from "./TechnologiesLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";

test("should render TechnologiesLayout", () => {
  const renderProps: ReferenceLayoutProps = {
    ...baseRenderData,
    title: "These Technologies",
    resourceType: "technologies",
    listing: [],
    page: {
      fileSlug: "fileSlug",
      url: "/fileSlug",
      date: fixtures.date,
    },
  };
  fixtures.context.getReferences = () => fixtures.technologies;
  document.body.innerHTML = TechnologiesLayout.call(
    fixtures.context,
    renderProps
  );
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Technology",
  });
  expect(links[0].href).to.equal("/technologies/ste/");
});
