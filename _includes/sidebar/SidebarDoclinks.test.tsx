import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarDoclinks, { SidebarDoclinksProps } from "./SidebarDoclinks.11ty";

const props: SidebarDoclinksProps = {
  links: [{ label: "Some Label", target: "some-target" }],
};

test("SidebarDoclinks", () => {
  document.body.innerHTML = SidebarDoclinks(props);
  const result: HTMLAnchorElement = screen.getByRole("link");
  expect(result).to.exist;
  expect(result.href).to.equal("about:blank#some-target");
});
