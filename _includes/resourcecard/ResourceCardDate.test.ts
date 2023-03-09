import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCardDate, {
  ResourceCardDateProps,
} from "./ResourceCardDate.11ty";

const props: ResourceCardDateProps = { date: "some-date" };

test("ResourceCardDate", () => {
  document.body.innerHTML = ResourceCardDate(props);
  const result = screen.getByText("some-date");
  expect(result).to.exist;
});
