import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import TipSidebar, { TipSidebarProps } from "./TipSidebar.11ty";
import fixtures from "../fixtures";
import { Author } from "../references/author/AuthorModels";
import { Topic } from "../references/topic/TopicModels";
import { References } from "../../src/ReferenceModels";

const tip = Array.from(fixtures.resolvedCollections.allResources.values())[2];
const references = tip.references as References;
export const tipSidebarProps: TipSidebarProps = {
  displayDate: tip.displayDate,
  author: references.author as Author,
  hasBody: true,
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

  // Topics
  expect(screen.getByText(fixtures.topics[0].title)).to.exist;

  // Doc links
  expect(screen.getByText("In Depth")).to.exist;
  expect(screen.getByText("See Also")).to.exist;
});
