import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarStep, { SidebarStepProps } from "./SidebarStep.11ty";

const props: SidebarStepProps = {
  label: "some-label",
  target: "some-target",
  marker: 2,
  isActive: true,
};

test("SidebarStep", () => {
  document.body.innerHTML = SidebarStep(props);
  const result: HTMLAnchorElement = screen.getByRole("link");
  expect(result.href).to.equal("some-target");
  const span: HTMLSpanElement = screen.getByText("2");
  expect(span.className).to.equal("steps-marker is-info");
  expect(screen.getByText("some-label")).to.exist;
});
