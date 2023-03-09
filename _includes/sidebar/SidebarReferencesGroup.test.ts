import { test } from "vitest";

import SidebarReferencesGroup, {
  SidebarReferencesGroupProps,
} from "./SidebarReferencesGroup.11ty";

const props: SidebarReferencesGroupProps = {
  reftype: "some-reftype",
  accent: "some-accent",
  references: [],
};

test("SidebarReferencesGroup", () => {
  document.body.innerHTML = SidebarReferencesGroup(props);
  // TODO Bring back sidebars
  // const results: HTMLAnchorElement[] = screen.getAllByRole("link");
  // expect(results.length).to.equal(3);
  // expect(results[0].href).to.equal("/some-reftype/ref1/");
});
