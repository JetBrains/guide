import {expect, test} from "vitest";
import {absolutePaths} from "./absolutePaths";

const transform = function (html: string) : string {
  const plugin = absolutePaths({
    prefix: "/pycharm/guide"
  });
  // @ts-ignore
  return plugin.transformIndexHtml(html) ;
}

test("replaces a root path in anchor", () => {
  const content = `<a href="/public">test</a>`;
  const actual = transform(content);
  expect(actual).to.equal(`<a href="/pycharm/guide/public">test</a>`);
});

test("replaces a root path in anchor", () => {
  const content = `<a href="/tips">test</a>`;
  const actual = transform(content);
  expect(actual).to.equal(`<a href="/pycharm/guide/tips">test</a>`);
});

test("ignores already rooted path", () => {
  const content = `<a href="/pycharm/guide/">test</a>`;
  const actual = transform(content);
  expect(actual).to.equal(`<a href="/pycharm/guide/">test</a>`);
});

test("ignores already rooted path", () => {
  const content = `<a href="/tips">test</a>`;
  const actual = transform(content);
  expect(actual).to.equal(`<a href="/pycharm/guide/tips">test</a>`);
});

test("ignores relative paths", () => {
  const content = `<a href="../tips">test</a>`;
  const actual = transform(content);
  expect(actual).to.equal(content);
})

test("ignores if src includes __VITE_ASSET__", () => {
  const content = `<link rel="icon" href="__VITE_ASSET__123456789__" type="image/x-icon">`
  const actual = transform(content);
  expect(actual).to.be.equal(content);
})
