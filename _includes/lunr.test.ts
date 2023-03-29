import {expect, test} from "vitest";
import {LunrLayout} from "./lunr.11ty";
import {baseRenderData} from "./fixtures";
import {LayoutProps} from "../src/models";

const data : LayoutProps = {
  ...baseRenderData,
  page : { url : "/lunr_index.json", date: new Date(), fileSlug: "lunr_index.json" },
}

test("can generate lunr.json", () => {
  // @ts-ignore
  const result = LunrLayout(data);
  const json = JSON.parse(result);

  expect(json.results.length).to.be.greaterThan(0);
});

test("can generate lunr.json with path prefix", () => {
  data.commandLineArgs.pathprefix = "/pycharm/guide"
  // @ts-ignore
  const result = LunrLayout(data);
  const json = JSON.parse(result);

  expect(json.results[0].url).to.contain(data.commandLineArgs.pathprefix);
})
