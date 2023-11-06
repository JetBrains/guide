import * as fs from "fs";
import { Markdown, getMarkdownFiles } from "./file.utils";
import filePath from "upath";

export type Obsoletes = {
	[key: string]: string[];
};

function createNginxRule(redirectFrom: string, redirectTo: string) {
	let nginxRule: string =
		"rewrite ^/guide" +
		redirectFrom +
		"(/?.*)$ /guide/" +
		redirectTo +
		"$1 permanent;";
	return nginxRule;
}

export function getObsoletesFromMarkdown(
	markdownDocuments: Markdown[]
): string[] {
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
					.relative(
						filePath.join(__dirname, "../site"),
						path.replace(/\/+$/, "")
					)
					.split("/index.md");

				obsoletes.forEach((data) => {
					let redirectFrom: string = data.replace(/\/+$/, "");
					let nginxRule = createNginxRule(redirectFrom, redirectTo);
					nginxRulesList.push(nginxRule);
				});
			}
		});
	return nginxRulesList;
}

export function dumpObsoletes(): void {
	let finalContent: string = "";

	// Generate obsoletes from all Markdown files.
	// Note this does not take into account channels and other custom TSX files.
	const markdownDocuments = getMarkdownFiles();
	const obsoletes = getObsoletesFromMarkdown(markdownDocuments);

	// Append other rewrites
	obsoletes.push(createNginxRule("/idea", "java"));
	obsoletes.push(createNginxRule("/pycharm", "python"));
	obsoletes.push(createNginxRule("/webstorm", "javascript"));

	// Write file
	obsoletes.forEach(function (e) {
		finalContent += e + "\n";
	});
	const target = `${__dirname}/../deployment/helm/redirect.conf`;
	fs.writeFileSync(target, finalContent, { flag: "w+" });
}

export async function testObsoletes(file: string, urlPrefix: string) {
	let errors: string = "";
	const needsRewriteOfObsolete =
		urlPrefix.indexOf("localhost") >= 0 || urlPrefix.indexOf("labs.jb.gg") >= 0;

	const obsoletes = fs.readFileSync(file, "utf8").split("\n");
	for (let i = 0; i < obsoletes.length; i++) {
		let obsolete = obsoletes[i];

		if (obsolete.startsWith("#")) continue;
		if (obsolete.length <= 2) continue;

		if (needsRewriteOfObsolete) {
			obsolete = obsolete
				.replace("/dotnet/guide", "/guide/dotnet")
				.replace("/go/guide", "/guide/go")
				.replace("/idea/guide", "/guide/idea")
				.replace("/pycharm/guide", "/guide/pycharm")
				.replace("/webstorm/guide", "/guide/webstorm");
		}

		const obsoleteUrl = urlPrefix.replace(/\/+$/, "") + obsolete;
		try {
			const response = await fetch(obsoleteUrl, { redirect: "manual" });
			if (response.status >= 400) {
				errors += response.status + " - " + obsoleteUrl + "\n";
			}
		} catch (e) {
			console.log(e);
			console.log(obsoleteUrl);
		}
	}

	if (errors.length > 0) throw errors;
}
