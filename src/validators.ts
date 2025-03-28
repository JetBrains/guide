import url from "url";
import { Value } from "@sinclair/typebox/value";

export function validateFrontmatter(
	resourceType: any,
	frontmatter: any,
	url: string,
) {
	/* Throw an exception if validation fails */
	if (!Value.Check(resourceType, frontmatter)) {
		const errors = [...Value.Errors(resourceType, frontmatter)];
		const message = errors
			.map(
				(error) =>
					`Validation failure: ${error.path} failed with ${error.message} in ${url}`,
			)
			.join("\n");
		throw new Error(message);
	}
}

export function validateContent(content: string, url: string) {
	function throwError(suspiciousTag: string) {
		const message =
			`Validation failure: suspicious HTML tags found in ${url}:` +
			`\n   ${suspiciousTag}\n` +
			`Did you mistype a tag name or forget to match opening and closing tags?\n` +
			`If it's not a tag name, please use '&lt;' instead of '<'.`;
		throw new Error(message);
	}

	const withoutCodeBlocks = content
		.replace(/````[\s\S]*?````/g, "")
		.replace(/```[\s\S]*?```/g, "")
		.replace(/`[\s\S]*?`/g, "");

	const htmlTagRegex =
		/<\/([a-zA-Z0-9]+)>|<([a-zA-Z0-9]+)(?:\s+[^>]*)?([\/\\])>|<([a-zA-Z0-9]+)(?:\s+[^>]*)?[^\/]?>/g;

	let match;
	const tags: [string, string][] = [];

	while ((match = htmlTagRegex.exec(withoutCodeBlocks)) !== null) {
		const closingTag = match[1]; // Captures closing tags, e.g., `/div` in `</div>`
		const openingTag = match[2] ? match[2] : match[4]; // Captures opening tags, e.g., `div` in `<div>`
		if (
			match[3] === "\\" || // Closing bracket is ignored like in `<project\>`
			openingTag === "source" ||
			openingTag === "img" ||
			openingTag === "br" ||
			openingTag === "hr"
		) {
			continue;
		}
		const isSelfClosing = match[3] === "/"; // Detects self-closing tags, e.g., `/` in `<img />`

		// If it's a closing tag, ensure it matches the last opened tag
		if (closingTag) {
			const [lastOpeningTag, fullMatch] = tags.pop() || ["", ""];
			if (lastOpeningTag !== closingTag) {
				// Tag mismatch
				throwError(fullMatch + "[...]" + match[0]);
			}
		} else if (openingTag) {
			if (!isSelfClosing) {
				// Push opening tags (non-self-closing) onto the stack
				tags.push([openingTag, match[0]]);
			}
		}
	}

	// If the stack is not empty, there are unclosed tags
	if (tags.length !== 0) {
		throwError(tags[0][1]);
	}
}
