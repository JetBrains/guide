/* */
import { Document, Window } from "happy-dom";
import { getByRole } from "@testing-library/dom";

export function makeDocument(content: string): Document {
  /* Set up the global document using the full doc in build results */
  const newWindow = new Window({
    settings: {
      disableJavaScriptFileLoading: true,
      disableJavaScriptEvaluation: true,
      disableCSSFileLoading: true,
      enableFileSystemHttpRequests: true,
    },
  });
  const domParser = new newWindow.DOMParser();
  return domParser.parseFromString(content, "text/html");
}

export type Assertion = {
  (body: any, url: string): void;
};
export type Assertions = Assertion[];

export type ByRoleProps = { role: string; text?: string };
export function byRole({ role, text }: ByRoleProps): Assertion {
  const options = text ? { name: text } : {};
  return (body: any, url: string): void => {
    try {
      getByRole(body, role, options);
    } catch (err) {
      throw new Error(`Page "${url} failed byRole for "${role}: ${text}"`);
    }
  };
}

export type BuildResult = {
  url: string;
  content: string;
};

export class TestCases {
  testCases: Map<string, Assertions>;

  constructor() {
    this.testCases = new Map();
  }

  add(url: string, assertions: Assertions) {
    this.testCases.set(url, assertions);
  }

  validate(results: BuildResult[]): void {
    /* For each result in the build, find any test cases and validate. */
    for (const { url, content } of results) {
      const newDocument = makeDocument(content);
      const assertions = this.testCases.get(url);
      for (const assertion of assertions ? assertions : []) {
        assertion(newDocument.body, url);
      }
    }
  }
}
