import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import TipSidebar, { TipSidebarProps } from "./TipSidebar.11ty";
import fixtures from "../fixtures";
import { Author } from "../references/author/AuthorModels";
import { Product } from "../references/product/ProductModels";
import { Technology } from "../references/technology/TechnologyModels";
import { Topic } from "../references/topic/TopicModels";
import { References } from "../../src/ReferenceModels";

const tip = Array.from(fixtures.resolvedCollections.allResources.values())[0];
const references = tip.references as References;
export const tipSidebarProps: TipSidebarProps = {
  displayDate: tip.displayDate,
  author: references.author as Author,
  hasBody: true,
  products: references.products as Product[],
  technologies: references.technologies as Technology[],
  topics: references.topics as Topic[],
  longVideo: "something",
  seealsos: [
    { title: "See Also 1", href: "/see-also-1" },
    { title: "See Also 2", href: "/see-also-2" },
  ],
};

test("TipSidebar", () => {
  document.body.innerHTML = TipSidebar(tipSidebarProps);

  // Published
  expect(screen.getByText("Some Author")).to.exist;

  // Technologies, Products, Topics
  // expect(screen.getByText(fixtures.technologies[0].title)).to.exist;
  expect(screen.getByText(fixtures.products[0].title)).to.exist;
  // expect(screen.getByText(fixtures.topics[0].title)).to.exist;

  // Doclinks
  expect(screen.getByText("In Depth")).to.exist;
  expect(screen.getByText("See Also")).to.exist;
});
