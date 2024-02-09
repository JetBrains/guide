import { writeFile } from "node:fs/promises";
import { TopicFrontmatter } from "../_includes/resources/topic/TopicModels";
import { ResourceMap } from "./ResourceModels";
import path from "upath";

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
	} as const;
}

function extractReferences(
	allReferencesList: TopicFrontmatter[],
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
		for (const allOf of schema.allOf as Array<any>) {
			if ("properties" in allOf) {
				propertiesToTraverse.push(allOf.properties);
			}
			if ("allOf" in allOf) {
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
				const nestedProperties = determinePropertiesToTraverse(allOf.allOf);
				propertiesToTraverse.push(...nestedProperties);
			}
		}
	}
	return propertiesToTraverse;
}

type ObjectMap = Record<string, any>;
type Schema<T> = T & {
	properties: ObjectMap;
	required: ObjectMap;
	$schema: string;
	$id: string;
	title: string;
	allOf: Array<any>;
};

function hasProperty<T extends string>(
	map: object,
	key: T
): map is Record<T, ObjectMap> {
	return key in map;
}

export async function dumpSchemas<T extends ObjectMap>(
	schemas: T,
	resourceMap: ResourceMap,
	outputPath: string
) {
	const resources = Array.from(resourceMap.values());
	const authors = extractReferences(resources, "author").sort();
	const topics = extractReferences(resources, "topic").sort();

	for (const [key, schema] of Object.entries(schemas)) {
		const thisSchema: Schema<T> = {
			...getPreamble(key),
			...{ properties: {} },
			...{ allOf: [] },
			...JSON.parse(JSON.stringify(schema)),
		};

		const resourceTypeName = key.toLowerCase();

		const propertiesToTraverse = featureFlags.traverseAllOfProperties
			? determinePropertiesToTraverse(thisSchema)
			: [thisSchema.properties];

		for (const properties of propertiesToTraverse) {
			// Remove resourceType
			if ("resourceType" in properties) {
				delete properties["resourceType"];
			}
			if ("required" in thisSchema) {
				thisSchema.required = thisSchema.required.filter(
					(it: any) => it !== "resourceType"
				);
			}
			if ("allOf" in thisSchema) {
				for (const allOf of thisSchema.allOf as Array<any>) {
					if ("required" in allOf) {
						allOf.required = allOf.required.filter(
							(it: any) => it !== "resourceType"
						);
					}
				}
			}

			// Rewrite author to an enum
			if (
				featureFlags.rewriteReferenceProperties &&
				hasProperty(properties, "author")
			) {
				properties["author"] = {
					enum: authors,
					description: properties["author"]["description"],
				};
			}

			// Rewrite topics open array to an array of enum
			if (
				featureFlags.rewriteReferenceProperties &&
				hasProperty(properties, "topics")
			) {
				properties["topics"]["items"] = { enum: topics };
				if ("type" in properties["topics"]["items"]) {
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
			if (
				featureFlags.rewriteDateProperties &&
				hasProperty(properties, "date")
			) {
				properties["date"]["type"] = "string";
				properties["date"]["format"] = "date";
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
