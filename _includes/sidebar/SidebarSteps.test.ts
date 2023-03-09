import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarSteps, { SidebarStepsProps } from "./SidebarSteps.11ty";
import fixtures from "../fixtures";
import { Tutorial } from "../resources/tutorial/TutorialModels";

test("SidebarSteps", () => {
  const url = "/tutorials/some-tutorial/";
  const tutorial = fixtures.resolvedCollections.allResources.get(
    url
  ) as Tutorial;
  const tutorialStep = tutorial.tutorialSteps[0];
  const props: SidebarStepsProps = {
    tutorialStep: tutorialStep,
    steps: tutorial.tutorialSteps,
  };
  document.body.innerHTML = SidebarSteps(props);
  const span: HTMLSpanElement = screen.getByText("1");
  expect(span.className).to.equal("steps-marker is-info");
  expect(screen.getByText("Some Tutorial Step")).to.exist;
});
