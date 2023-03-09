import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import Sidebar, { SidebarProps } from "./Sidebar.11ty";
import h from "vhtml";

const children = [
  h("main", {
    dangerouslySetInnerHTML: { __html: `<button>B42</button>` },
  }),
];
const props: SidebarProps = { children };

test("Sidebar", () => {
  document.body.innerHTML = Sidebar(props);
  const result = screen.getByRole("button");
  expect(result).to.exist;
});
