import h from "vhtml";
import { expect, test } from "vitest";
import { metaOpenGraphImagePlugin, getRootUrl, MetaOpenGraphImage } from "./metaOpenGraphImagePlugin";

const siteUrl = "https://jetbrains.com/pycharm/guide";
const transform = function (html:string) : string {
  const plugin = metaOpenGraphImagePlugin();
  // @ts-ignore
  return plugin.transformIndexHtml(html);
}

test("can find image tag and inject to head", () => {
  const viteAsset = "__VITE_ASSET__1234568__";
  const img = `<img lazy="true" data-meta=\"${siteUrl}\" src=\"${viteAsset}\" style="display:none">`;
  const content =
    `<html>
      <head></head>
      <body>${img}</body>
    </html>`;

  const result = transform(content) as string;
  expect(result.includes(`<meta property="og:image" content="https://jetbrains.com/pycharm/guide${viteAsset}">`)).to.be.true;
  expect(result.includes(`<img data-meta`)).to.be.false;
});

test("can get host url from site url", () => {
  const url = getRootUrl("https://jetbrains.com/pycharm/guide");
  expect(url).to.be.equal("https://jetbrains.com");
})

test("component jsx returns and image tag", () => {
  const html = <MetaOpenGraphImage siteUrl={`https://example.com`} src={`/card.png`} />
  expect(html).to.be.equal(`<img alt="" lazy="true" data-meta="https://example.com" src="/card.png" style="display:none">`)
})

test("component handles null or undefined src values", () => {
  const html = <MetaOpenGraphImage siteUrl={`https://example.com`} src={null} />
  expect(html).to.be.equal("")
})