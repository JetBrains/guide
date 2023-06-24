import { expect, test } from "vitest";
import { getObsoletes } from "./obsoletes";
import fixtures from "../_includes/fixtures";

test("should collect JSON data about obsoletes", () => {
  const { allReferences, allResources } = fixtures.collections;
  const obsoletes = getObsoletes(allReferences, allResources);
  expect(obsoletes["/tips/some-tip/"].length).toEqual(2);
});
