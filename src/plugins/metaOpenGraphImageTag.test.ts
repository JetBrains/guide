import { expect, test } from "vitest";
import { metaOpenGraphImageTag } from "./metaOpenGraphImageTag";

const siteUrl = "https://jetbrains.com/pycharm/guide";
const transform = function (html:string) : string {
  const plugin = metaOpenGraphImageTag();
  // @ts-ignore
  return plugin.transformIndexHtml(html);
}

test("can find image tag and inject to head", () => {
  const viteAsset = "__VITE_ASSET__1234568__";
  const img = `<img data-meta=\"${siteUrl}\" src=\"${viteAsset}\" style="display:none">`;
  const content =
    `<html>
      <head></head>
      <body>${img}</body>
    </html>`;

  const result = transform(content) as string;
  expect(result.includes(`<meta property="og:image" content="https://jetbrains.com/pycharm/guide${viteAsset}">`)).to.be.true;
  expect(result.includes(`<img data-meta`)).to.be.false;
})