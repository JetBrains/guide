/**
 * Generate data from obsoletes fields to provide redirects
 */
import { ReferenceCollection, ResourceCollection } from "./ResourceModels";
import * as fs from "fs";

export type Obsoletes = {
	[key: string]: string[];
};

export function getObsoletes(
	allReferences: ReferenceCollection,
	allResources: ResourceCollection
): string[] {
	const obsoletes: Obsoletes = {};
	let nginxRulesList: string[] = [];
	allReferences.forEach((reference) => {
		if (reference.obsoletes && reference.obsoletes.length) {
			obsoletes[reference.url] = reference.obsoletes;
			let redirectTo = reference.url.replace(/\/+$/, "");

			reference.obsoletes.forEach((data) => {
				let redirectFrom: string = data.replace(/\/+$/, "");
				let nginxRule: string =
					"rewrite ^/guide" +
					redirectFrom +
					"(/?.*)$ /guide" +
					redirectTo +
					"$1 permanent;";
				nginxRulesList.push(nginxRule);
			});
		}
	});
	allResources.forEach((resource) => {
		if (resource.obsoletes && resource.obsoletes.length) {
			obsoletes[resource.url] = resource.obsoletes;
		}
	});
	return nginxRulesList;
}

export function dumpObsoletes(
	allReferences: ReferenceCollection,
	allResources: ResourceCollection
): void {
	let finalContent: string = "";
	const obsoletes = getObsoletes(allReferences, allResources);
	//const content = JSON.stringify(obsoletes);
	obsoletes.forEach(function (e) {
		finalContent += e + "\n";
	});
	const target = `${__dirname}/../public/redirect.conf`;
	fs.writeFileSync(target, finalContent, { flag: "w+" });
}
