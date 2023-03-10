import {expect, test} from "vitest";
import {absolutifyPaths} from "./absolutifyPaths";

const transform = function (html: string) : string {
  const plugin = absolutifyPaths({
    prefix: "/pycharm/guide"
  });
  // @ts-ignore
  return plugin.transformIndexHtml(html) ;
}

test("replaces a root path in anchor", () => {
  const content = `<a href="/">test</a>`;
  const actual = transform(content);
  expect(actual).to.equal(`<a href="/pycharm/guide/">test</a>`);
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