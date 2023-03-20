import {expect, test} from "vitest";
import {parse} from "./RemoteSnippets";

test("can parse remote resource with block", async () => {
  const result = await parse("https://gist.githubusercontent.com/khalidabuhakmeh/7dc8c3ef3bb23ef2b7a597ad4d5f694e/raw/2967b12aa2f66ac7d3e89d7e410913b551c9b6ed/test.cs", "Hello World")
  const code = result.trim()
  expect(code).to.contains(`public void HelloWorld()
{
    return "Hello, World!"
}`);
})
