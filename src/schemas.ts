import {writeFile} from 'node:fs/promises';
import path from "upath";
import {ReferenceFrontmatter} from "./ReferenceModels";

function getPreamble(resourceType: string) {
    return {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "$id": `https://www.jetbrains.com/guide/${resourceType.toLowerCase()}.schema.json`,
        "title": `JetBrains Guide ${resourceType}`,
    }
}

function extractReferences(allReferencesList: ReferenceFrontmatter[],
                           resourceType: string) : string[] {
    return allReferencesList
      .filter(r => r.resourceType == resourceType)
      .map(r => r.label) as string[]
}

export async function dumpSchemas(schemas: { [key: string]: object },
                                  allReferencesList: ReferenceFrontmatter[],
                                  outputPath: string
) {
    const authors = extractReferences(allReferencesList, "author").sort();
    const topics = extractReferences(allReferencesList, "topic").sort();
    const technologies = extractReferences(allReferencesList, "technology").sort();

    for (const [key, schema] of Object.entries(schemas)) {
        const thisSchema = {
            ...getPreamble(key),
            ...{"properties": []},
            ...schema,
        };

        const resourceTypeName = key.toLowerCase();

        if ("resourceType" in thisSchema.properties)
        {
            delete thisSchema.properties["resourceType"];
        }

        // Rewrite author to an enum
        if ("author" in thisSchema.properties) {
            // @ts-ignore
            thisSchema.properties["author"] = {
                "enum": authors,
                // @ts-ignore
                "description": thisSchema.properties["author"]["description"]
            };
        }

        // Rewrite topics open array to an array of enum
        if ("topics" in thisSchema.properties) {
            // @ts-ignore
            thisSchema.properties["topics"]["items"] = { "enum": topics };
            // @ts-ignore
            if ("type" in thisSchema.properties["topics"]["items"]) {
                // @ts-ignore
                delete thisSchema.properties["topics"]["items"]["type"];
            }
        }

        // Rewrite technologies open array to an array of enum
        if ("technologies" in thisSchema.properties) {
            // @ts-ignore
            thisSchema.properties["technologies"]["items"] = { "enum": technologies };
            // @ts-ignore
            if ("type" in thisSchema.properties["technologies"]["items"]) {
                // @ts-ignore
                delete thisSchema.properties["technologies"]["items"]["type"];
            }
        }

        // Rewrite date to be a string with date format
        if ("date" in thisSchema.properties) {
            // @ts-ignore
            thisSchema.properties["date"]["type"] = "string";
            // @ts-ignore
            thisSchema.properties["date"]["format"] = "date";
            // @ts-ignore
            if ("instanceOf" in thisSchema.properties["date"]) {
                delete thisSchema.properties["date"]["instanceOf"];
            }
        }

        await writeFile(path.join(outputPath, `${resourceTypeName}.schema.json`),
          JSON.stringify(thisSchema, null, 2));
    }
}
