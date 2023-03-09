import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import Heading, { HeadingProps } from "./Heading.11ty";

const props: HeadingProps = {
  title: "title1",
  subtitle: "subtitle1",
};

test("Heading", () => {
  document.body.innerHTML = Heading(props);
  expect(screen.getByText("title1")).to.exist;
  expect(screen.getByText("subtitle1")).to.exist;
});
