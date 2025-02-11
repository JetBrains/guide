import fs from "fs";
import path from "upath";
import matter from "gray-matter";

type ReleaseType = "EAP" | "RC" | "Release";
type ChangeType =
	| "Bug"
	| "Feature"
	| "Task"
	| "Usability"
	| "Performance"
	| "Exception"
	| "Cosmetics";

interface ReleaseNote {
	product: string;
	version: string;
	build: string;
	type: ReleaseType;
	changes: Change[];
}

interface Change {
	technology: string;
	type: ChangeType;
	issueId: string;
	issueUrl: string;
	description: string;
}

function parseVersionInfo(title: string): {
	product: string;
	version: string;
	build: string;
	type: ReleaseType;
} {
	// Example: "WebStorm 2024.2 EAP 6 (242.18071.16 build)"
	const match = title.match(
		/^([^(]+?)\s+([\d.]+(?:\s+EAP\s+\d+|\s+RC)?)\s+\(([\d.]+)\s+build\)/,
	);
	if (!match) {
		throw new Error(`Invalid release notes title: ${title}`);
	}

	const [, product, version, build] = match;
	let type: ReleaseType = "Release";
	if (version.includes("EAP")) {
		type = "EAP";
	} else if (version.includes("RC")) {
		type = "RC";
	}

	return { product, version, build, type };
}

function parseMarkdownTable(content: string): Change[] {
	const changes: Change[] = [];
	const lines = content.split("\n");
	let currentTechnology = "";

	for (const line of lines) {
		// Skip header and separator lines
		if (line.startsWith("#") || line.startsWith("|--") || !line.trim()) {
			continue;
		}

		if (line.startsWith("|")) {
			const cells = line
				.split("|")
				.map((cell) => cell.trim())
				.filter(Boolean);
			if (cells.length === 4) {
				const [tech, type, issue, description] = cells;

				// If first cell is not empty, update current technology
				if (tech !== "") {
					currentTechnology = tech.replace(/^\*\*|\*\*$/g, "");
				}

				// Extract issue ID and URL
				const issueMatch = issue.match(/\[([^\]]+)\]\(([^)]+)\)/);
				if (!issueMatch) {
					continue;
				}

				changes.push({
					technology: currentTechnology,
					type: type as ChangeType,
					issueId: issueMatch[1],
					issueUrl: issueMatch[2],
					description: description.replace(/<[^>]+>/g, "").trim(),
				});
			}
		}
	}

	return changes;
}

function parseReleaseNotes(filePath: string): ReleaseNote | null {
	console.log(`Processing file: ${filePath}`);
	const content = fs.readFileSync(filePath, "utf-8").trim();
	if (!content) {
		console.log(`Skipping empty file: ${filePath}`);
		return null;
	}
	const lines = content.split("\n");
	const title = lines[0].replace(/^#\s+/, "");
	console.log(`Title: "${title}"`);
	const versionInfo = parseVersionInfo(title);
	const changes = parseMarkdownTable(content);

	return {
		...versionInfo,
		changes,
	};
}

function aggregateByTechnology(
	releaseNotes: ReleaseNote[],
): Map<string, Change[]> {
	const techMap = new Map<string, Change[]>();

	for (const note of releaseNotes) {
		for (const change of note.changes) {
			const changes = techMap.get(change.technology) || [];
			changes.push(change);
			techMap.set(change.technology, changes);
		}
	}

	// Sort technologies alphabetically
	return new Map([...techMap.entries()].sort());
}

export function generateReleaseNotesHtml(): string {
	const releaseNotesDir = path.join(process.cwd(), "release_notes");
	const files = fs
		.readdirSync(releaseNotesDir)
		.filter((file) => file.endsWith(".md"))
		.map((file) => path.join(releaseNotesDir, file));

	const releaseNotes = files
		.map(parseReleaseNotes)
		.filter((note): note is ReleaseNote => note !== null);
	const techMap = aggregateByTechnology(releaseNotes);

	let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JetBrains Release Notes</title>
    <link rel="preload" as="font" href="https://resources.jetbrains.com/storage/jetbrains-sans/JetBrainsSans.woff2" crossorigin="anonymous" />
    <link rel="stylesheet" href="/assets/site.scss" />
</head>
<body>
    <div class="section has-background-black has-glow-purple-transparent">
        <div class="container">
            <h1 class="title is-size-1 has-text-white">JetBrains Release Notes</h1>
        </div>
    </div>
    <div class="section">
        <div class="container">`;

	for (const [technology, changes] of techMap) {
		html += `
            <div class="box mb-6">
                <h2 class="title is-4">${technology}</h2>
                <div class="content">
                    <ul>`;

		for (const change of changes) {
			const typeClass = change.type === "Feature" ? "has-text-success" : "";
			html += `
                        <li>
                            <span class="tag ${typeClass} mr-2">${change.type}</span>
                            <a href="${change.issueUrl}" class="mr-2">${change.issueId}</a>
                            ${change.description}
                        </li>`;
		}

		html += `
                    </ul>
                </div>
            </div>`;
	}

	html += `
        </div>
    </div>
</body>
</html>`;

	return html;
}

export function generateReleaseNotes(): void {
	const html = generateReleaseNotesHtml();
	const outputDir = path.join(process.cwd(), "_site");
	const outputPath = path.join(outputDir, "release-notes.html");

	// Create _site directory if it doesn't exist
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	fs.writeFileSync(outputPath, html);
}
