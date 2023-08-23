import { writeFile } from "node:fs/promises";
import path from "upath";
import { ReferenceFrontmatter } from "./ReferenceModels";

// Some feature flags to opt-in/opt-out of, depending how far we want to go with JSON schemas:
const featureFlags = {
	// traverse JSON schema's "allOf" node in addition to the schema's own "properties" node
	traverseAllOfProperties: true,

	// rewrite date properties in a format WebStorm can work with (hey have to be strings)
	rewriteDateProperties: true,

	// rewrite reference properties to an enum - this enables code completion for topics, authors, ...
	// false is recommended when one schema is shared across all sites
	rewriteReferenceProperties: true,
};

function getPreamble(resourceType: string) {
	return {
		$schema: "http://json-schema.org/draft-07/schema#",
		$id: `https://www.jetbrains.com/guide/${resourceType.toLowerCase()}.schema.json`,
		title: `JetBrains Guide ${resourceType}`,
	};
}

function extractReferences(
	allReferencesList: ReferenceFrontmatter[],
	resourceType: string
): string[] {
	return allReferencesList
		.filter((r) => r.resourceType == resourceType)
		.map((r) => r.label) as string[];
}

function determinePropertiesToTraverse(schema: object): object[] {
	const propertiesToTraverse = [];
	if ("properties" in schema) {
		propertiesToTraverse.push(schema.properties);
	}
	if ("allOf" in schema) {
		// @ts-ignore
		for (const allOf of schema.allOf) {
			if ("properties" in allOf) {
				propertiesToTraverse.push(allOf.properties);
			}
			if ("allOf" in allOf) {
				// @ts-ignore
				const nestedProperties = determinePropertiesToTraverse(allOf.allOf);
				propertiesToTraverse.push(...nestedProperties);
			}
		}
	}
	if (Array.isArray(schema)) {
		for (const allOf of schema) {
			if ("properties" in allOf) {
				propertiesToTraverse.push(allOf.properties);
			}
			if ("allOf" in allOf) {
				// @ts-ignore
				const nestedProperties = determinePropertiesToTraverse(allOf.allOf);
				propertiesToTraverse.push(...nestedProperties);
			}
		}
	}
	return propertiesToTraverse;
}

export async function dumpSchemas(
	schemas: { [key: string]: object },
	allReferencesList: ReferenceFrontmatter[],
	outputPath: string
) {
	const authors = extractReferences(allReferencesList, "author").sort();
	const topics = extractReferences(allReferencesList, "topic").sort();

	for (const [key, schema] of Object.entries(schemas)) {
		const thisSchema = {
			...getPreamble(key),
			...{ properties: {} },
			...{ allOf: [] },
			...JSON.parse(JSON.stringify(schema)),
		};

		const resourceTypeName = key.toLowerCase();

		if ("resourceType" in thisSchema.properties) {
			delete thisSchema.properties["resourceType"];
		}

		const propertiesToTraverse = featureFlags.traverseAllOfProperties
			? determinePropertiesToTraverse(thisSchema)
			: [thisSchema.properties];

		for (const properties of propertiesToTraverse) {
			// Rewrite author to an enum
			// @ts-ignore
			if (featureFlags.rewriteReferenceProperties && "author" in properties) {
				// @ts-ignore
				properties["author"] = {
					enum: authors,
					// @ts-ignore
					description: properties["author"]["description"],
				};
			}

			// Rewrite topics open array to an array of enum
			// @ts-ignore
			if (featureFlags.rewriteReferenceProperties && "topics" in properties) {
				// @ts-ignore
				properties["topics"]["items"] = { enum: topics };
				// @ts-ignore
				if ("type" in properties["topics"]["items"]) {
					// @ts-ignore
					delete properties["topics"]["items"]["type"];
				}
			}

			// Rewrite technologies open array to an array of enum
			// @ts-ignore
			// if (featureFlags.rewriteReferenceProperties && "technologies" in properties) {
			//     // @ts-ignore
			//     properties["technologies"]["items"] = { "enum": technologies };
			//     // @ts-ignore
			//     if ("type" in properties["technologies"]["items"]) {
			//         // @ts-ignore
			//         delete properties["technologies"]["items"]["type"];
			//     }
			// }

			// Rewrite date to be a string with date format
			// @ts-ignore
			if (featureFlags.rewriteDateProperties && "date" in properties) {
				// @ts-ignore
				properties["date"]["type"] = "string";
				// @ts-ignore
				properties["date"]["format"] = "date";
				// @ts-ignore
				if ("instanceOf" in properties["date"]) {
					delete properties["date"]["instanceOf"];
				}
			}
		}

		await writeFile(
			path.join(outputPath, `${resourceTypeName}.schema.json`),
			JSON.stringify(thisSchema, null, 2)
		);
	}
}
