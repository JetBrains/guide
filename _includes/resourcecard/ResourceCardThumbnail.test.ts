import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCardThumbnail, {
  ResourceCardThumbnailProps,
} from "./ResourceCardThumbnail.11ty";

const props: ResourceCardThumbnailProps = {
  thumbnail: "some-thumbnail.png",
};

test("ResourceCardThumbnail", () => {
  document.body.innerHTML = ResourceCardThumbnail(props);
  const result = screen.getByAltText("rcg-thumbnail");
  expect(result).to.exist;
});
