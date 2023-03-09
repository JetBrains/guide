import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarDoclink, { SidebarDoclinkProps } from "./SidebarDoclink.11ty";

const props: SidebarDoclinkProps = {
  label: "Some Label",
  target: "some-target",
};

test("SidebarDoclink", () => {
  document.body.innerHTML = SidebarDoclink(props);
  const result: HTMLAnchorElement = screen.getByRole("link");
  expect(result).to.exist;
  expect(result.href).to.equal("about:blank#some-target");
});
