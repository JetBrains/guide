import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCardTopics, {
  ResourceCardTopicProps,
} from "./ResourceCardTopics.11ty";

const props: ResourceCardTopicProps = {
  items: [
    { label: "Some Label 1", slug: "/some-slug-1" },
    { label: "Some Label 2", slug: "/some-slug-2" },
    { label: "Some Label 3", slug: "/some-slug-3" },
  ],
};

test("ResourceCardTopic", () => {
  document.body.innerHTML = ResourceCardTopics(props);
  const results: HTMLAnchorElement[] = screen.getAllByRole("link");
  expect(results[0].href).to.equal("/some-slug-1");
});
