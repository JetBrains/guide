import {expect, test} from "vitest";
import { getSnippetByKey, remoteUrlParse } from "./RemoteSnippets";

test("can parse remote resource with block", async () => {
  const result = await remoteUrlParse("https://gist.githubusercontent.com/khalidabuhakmeh/7dc8c3ef3bb23ef2b7a597ad4d5f694e/raw/2967b12aa2f66ac7d3e89d7e410913b551c9b6ed/test.cs", "Hello World")
  const code = result.trim()
  expect(code).to.contains(`public void HelloWorld()
{
    return "Hello, World!"
}`);
});

test("can parse an in-memory code block", () => {
  // this text has indents
  const text = `
            public string Name => "Khalid";
          
            // snippet: Hello World
            public void HelloWorld()
            {
                return "Hello, World!"
            }
            // end snippet
`;

  const code = getSnippetByKey(text, "Hello World", ".cs");
  expect(code).to.contains(`public void HelloWorld()
{
    return "Hello, World!"
}`);
})

test("can parse an in-memory cshtml code block", () => {
  // this text has indents
  const text = `
            @* snippet: Cool Beans *@
            <h1>@Model.Khalid Says So!</h1>
            @* end snippet *@
`;

  const code = getSnippetByKey(text, "Cool Beans", ".cshtml");
  expect(code).to.contains(`<h1>@Model.Khalid Says So!</h1>`);
})

test("can parse an in-memory html code block", () => {
  // this text has indents
  const text = `
            <!-- snippet: TikTok Maarten -->
            <h1>Maarten ❤️ Dance!</h1>
            <!-- end snippet -->
`;

  const code = getSnippetByKey(text, "TikTok Maarten", ".html");
  expect(code).to.contains(`<h1>Maarten ❤️ Dance!</h1>`);
})
