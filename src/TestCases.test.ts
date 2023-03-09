import { expect, test } from "vitest";
import { byRole, makeDocument, BuildResult, TestCases } from "./TestCases";

test("update document with content results", () => {
  const content = `<html lang="en"><head><title>Doc</title></head><body>x</body></html>`;
  const newDocument = makeDocument(content);
  expect(newDocument.body.innerText).to.equal("x");
});
test("run successful byRole assertion", () => {
  const assertion = byRole({ role: "link", text: "Target" });
  const newDocument = makeDocument(`<a href="/target">Target</a>`);
  const body = newDocument.body;
  const url = "/some-url";
  expect(() => assertion(body, url)).not.toThrowError();
});

test("run failed byRole assertion", () => {
  const assertion = byRole({ role: "link", text: "Target" });
  const newDocument = makeDocument(`<a href="/target">XXXTarget</a>`);
  const body = newDocument.body;
  const url = "/some-url";
  expect(() => assertion(body, url)).toThrowError();
});

test("run a test cases with no errors", () => {
  const assertion = byRole({ role: "link", text: "Target" });

  const tcs = new TestCases();
  tcs.add("/some-url", [assertion]);
  const results: BuildResult[] = [
    { url: "/some-url", content: `<a href="/target">Target</a>` },
  ];
  expect(() => tcs.validate(results)).not.toThrowError();
});

test("run a test cases with errors", () => {
  const assertion = byRole({ role: "link", text: "Target" });

  const tcs = new TestCases();
  tcs.add("/some-url", [assertion]);
  const results: BuildResult[] = [
    { url: "/some-url", content: `<a href="/target">XXXTarget</a>` },
  ];
  expect(() => tcs.validate(results)).toThrowError();
});
