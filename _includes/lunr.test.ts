import { expect, test } from "vitest";
import { LunrLayout } from "./lunr.11ty";
import { baseRenderData } from "./fixtures";
import { LayoutProps } from "../src/models";

const data: LayoutProps = {
  ...baseRenderData,
  page: {
    url: "/lunr_index.json",
    date: new Date(),
    fileSlug: "lunr_index.json",
  },
};

test("can generate lunr.json", () => {
  // @ts-ignore
  const result = LunrLayout(data);
  const json = JSON.parse(result);

  expect(json.results.length).to.be.greaterThan(0);
});
