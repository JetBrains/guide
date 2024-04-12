import { expect, test, describe, beforeAll } from "vitest";
import Ajv from "ajv";

describe("Confirm JSON Schema validation from types", () => {
	let ajv: Ajv;

	beforeAll(() => {
		ajv = new Ajv();
	});

	test("Validate a generated schema", async () => {
		const schema = {
			type: "object",
			properties: {
				foo: { type: "integer" },
				bar: { type: "string" },
			},
			required: ["foo"],
			additionalProperties: false,
		};

		const validate = ajv.compile(schema);

		const data = {
			foo: 1,
			bar: "abc",
		};

		const valid = validate(data);
		expect(valid).toBeTruthy();
	});
});
