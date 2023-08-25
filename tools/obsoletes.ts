import * as fs from "fs";
import { Markdown, getMarkdownFiles } from "./file.utils";
import filePath from "upath";

export type Obsoletes = {
	[key: string]: string[];
};

export function getObsoletes(markdownDocuments: Markdown[]): string[] {
	let nginxRulesList: string[] = [];

	markdownDocuments
		.filter(
			(doc) => doc.frontmatter.obsoletes && doc.frontmatter.obsoletes.length > 0
		)
		.forEach((reference) => {
			const { path, frontmatter } = reference;
			const { obsoletes } = frontmatter;
			if (obsoletes && obsoletes.length > 0) {
				let [redirectTo] = filePath
					.relative(filePath.join(__dirname, ".."), path.replace(/\/+$/, ""))
					.split("/index.md");

				obsoletes.forEach((data) => {
					let redirectFrom: string = data.replace(/\/+$/, "");
					let nginxRule: string =
						"rewrite ^/guide" +
						redirectFrom +
						"(/?.*)$ /guide/" +
						redirectTo +
						"$1 permanent;";
					nginxRulesList.push(nginxRule);
				});
			}
		});
	return nginxRulesList;
}

export function dumpObsoletes(): void {
	let finalContent: string = "";
	const documents = getMarkdownFiles();

	const obsoletes = getObsoletes(documents);
	//const content = JSON.stringify(obsoletes);
	obsoletes.forEach(function (e) {
		finalContent += e + "\n";
	});
	const target = `${__dirname}/../deployment/helm/redirect.conf`;
	fs.writeFileSync(target, finalContent, { flag: "w+" });
}
