import { expect, test } from "vitest";
import fixtures from "../../fixtures";
import {
  TutorialStepLayout,
  TutorialStepLayoutData,
} from "./TutorialStepLayout.11ty";
import { screen } from "@testing-library/dom";

test("should render TutorialStepLayout", () => {
  // @ts-ignore
  const tutorialStepLayoutData: TutorialStepLayoutData = {
    collections: { ...fixtures.resolvedCollections, all: fixtures.all },
    content: fixtures.content,
    ...fixtures.tutorialStepItems[0].data,
    page: fixtures.tutorialStepItems[0].page,
    site: fixtures.site,
  };
  document.body.innerHTML = TutorialStepLayout.call(
    fixtures.context,
    tutorialStepLayoutData
  );

  // Make sure sidebar steps renders correctly
  const cards = screen.getAllByRole("link", { name: "Tutorial Step" });
  expect(cards).to.exist;
  if (cards) {
    expect(cards.length).to.equal(3);
    const spans0 = cards[0].getElementsByClassName("steps-content");
    expect(spans0.length).to.equal(1);
  }

  // Top navigation
});
