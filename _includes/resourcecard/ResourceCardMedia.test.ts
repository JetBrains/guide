import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCardMedia, {
  ResourceCardMediaProps,
} from "./ResourceCardMedia.11ty";

const props: ResourceCardMediaProps = {
  href: "/some-href",
  title: "Some Title",
  subtitle: "Some Subtitle",
  resourceType: "SomeType",
};

test("ResourceCardMedia", () => {
  document.body.innerHTML = ResourceCardMedia(props);
  const a: HTMLAnchorElement = screen.getByRole("link");
  expect(a.href).to.equal("/some-href");
  expect(screen.getByText("Some Title")).to.exist;
  expect(screen.getByText("(SomeType)")).to.exist;
});
