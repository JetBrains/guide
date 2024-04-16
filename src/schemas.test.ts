import { beforeAll, describe, expect, test } from "vitest";
import Ajv from "ajv";
import fixtures from "../_includes/fixtures";
import { resourceClasses } from "../_includes/config";
import { dumpSchemasToString } from "./schemas";
import addFormats from "ajv-formats";

const resourceSchema = {
	$schema: "http://json-schema.org/draft-07/schema#",
	$id: "https://www.jetbrains.com/guide/resource.schema.json",
	title: "JetBrains Guide resource",
	properties: {
		title: {
			description: "Title of this resource",
			type: "string",
		},
		subtitle: {
			description: "Subtitle of this resource",
			type: "string",
		},
		obsoletes: {
			description: "Paths that should redirect to this resource",
			type: "array",
			items: {
				type: "string",
			},
		},
		author: {
			enum: [
				"ap",
				"brentroose",
				"citizenmatt",
				"da",
				"dlsniper",
				"dw",
				"ed",
				"er",
				"hs",
				"jb",
				"khalidabuhakmeh",
				"maartenba",
				"mahataqi",
				"matkoch",
				"md",
				"mm",
				"ni",
				"pwe",
				"rachelappel",
				"sb",
				"sf",
				"svk",
				"taniagoral",
				"tg",
				"tv",
				"vb",
				"vt",
				"wht",
			],
			description: "Author of this resource",
		},
		date: {
			description: "Date this resource was published",
			format: "date",
			type: "string",
		},
		channel: {
			description: "Possible channel this resource is in",
			type: "string",
		},
		tags: {
			description: "11ty tag data",
			type: "array",
			items: {
				type: "string",
			},
		},
		topics: {
			description: "Topics related to this resource",
			type: "array",
			items: {
				enum: [
					".net",
					"ai",
					"angular",
					"asp.net",
					"aws",
					"blazor",
					"build",
					"completion",
					"containers",
					"coverage",
					"cra",
					"csharp",
					"css",
					"customizing",
					"data",
					"databases",
					"debugging",
					"django",
					"dotcover",
					"dotmemory",
					"dottrace",
					"editing",
					"emmet",
					"fastapi",
					"fsharp",
					"gamedev",
					"gcp",
					"generics",
					"gettingstarted",
					"git",
					"go",
					"gradle",
					"groovy",
					"html",
					"ide",
					"inspections",
					"interface",
					"java",
					"javascript",
					"jest",
					"json",
					"junit",
					"kotlin",
					"kubernetes",
					"latest",
					"livetemplates",
					"markup",
					"maven",
					"mongodb",
					"navigation",
					"nodejs",
					"packagesearch",
					"platform",
					"plugins",
					"postgreSQL",
					"profiling",
					"pytest",
					"python",
					"quick-fixes",
					"react",
					"refactoring",
					"resharper",
					"rider",
					"riderflow",
					"running",
					"security",
					"settings",
					"sphinx",
					"spring",
					"testing",
					"tomcat",
					"tricks",
					"typescript",
					"ui",
					"unity",
					"unreal",
					"vcs",
					"web",
				],
			},
		},
	},
	type: "object",
	required: ["title", "author", "date"],
};

describe("Confirm JSON Schema validation from types", () => {
	let ajv: Ajv;

	beforeAll(() => {
		ajv = new Ajv();
		addFormats(ajv);
	});

	test("Validate a generated schema", async () => {
		// Simulate data collected during 11ty config phase
		const schemas = Object.entries(resourceClasses).reduce(
			(acc, [key, resourceClass]: [string, any]) => {
				return { ...acc, [key]: resourceClass.frontmatterSchema };
			},
			{}
		);
		const resourceMap = fixtures.resourceMap;
		const firstResource = {
			title: "Some Tip",
			date: "2020-01-01",
			resourceType: "tip",
			author: "pwe",
			topics: ["ai"],
			thumbnail: "thumbnail.png",
		};

		const pathsAndSchemas = dumpSchemasToString(schemas, resourceMap, "");

		for (const [path, schema] of Object.entries(pathsAndSchemas)) {
			// Only do resource.schema.json for now
			if (path.includes("resource")) {
				const validate = ajv.compile(resourceSchema);
				const valid = validate(firstResource);
				expect(valid).toBeTruthy();
			}
		}
	});
});
