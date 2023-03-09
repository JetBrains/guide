import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCardAuthor, {
  ResourceCardAuthorProps,
} from "./ResourceCardAuthor.11ty";

const props: ResourceCardAuthorProps = {
  thumbnail: "some-thumbnail.png",
  slug: "some-slug",
  title: "Some Title",
};

test("ResourceCardAuthor", () => {
  document.body.innerHTML = ResourceCardAuthor(props);
  const link: HTMLAnchorElement = screen.getByRole("link");
  expect(link.href).to.equal("some-slug");
  const img: HTMLImageElement = screen.getByAltText("rca-fluid");
  expect(img.src).to.equal("some-thumbnail.png");
});
