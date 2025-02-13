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
	version: string;
	releaseType: ReleaseType;
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

function normalizeTechnology(tech: string, description: string = ""): string {
	// Remove any leading/trailing whitespace and markdown
	tech = tech.trim().replace(/^\*\*|\*\*$/g, "");
	description = description.trim();

	// Convert to lowercase for case-insensitive matching
	const techLower = tech.toLowerCase();
	const descLower = description.toLowerCase();

	// Check for specific technology mentions in the description first
	if (descLower.includes("c#")) return "C#";
	if (descLower.includes("c++")) return "C++";
	if (descLower.includes("typescript")) return "TypeScript";
	if (descLower.includes("javascript")) return "JavaScript";
	if (descLower.includes("python")) return "Python";
	if (
		descLower.includes("java ") ||
		descLower.includes("java.") ||
		descLower.includes("java,")
	)
		return "Java Development";
	if (descLower.includes("kotlin")) return "Kotlin";
	if (descLower.includes("rust")) return "Rust";
	if (descLower.includes("go ") || descLower.includes("golang")) return "Go";

	// AI-related
	if (
		techLower.includes("ai") ||
		techLower.includes("assistant") ||
		techLower.includes("copilot")
	) {
		return "AI and Machine Learning";
	}

	// IDE-related
	if (
		techLower.includes("ide") ||
		techLower.includes("editor") ||
		tech.startsWith("UI.")
	) {
		return "IDE and Editor";
	}

	// Java-related
	if (
		techLower.includes("java") ||
		tech.startsWith("JavaX.") ||
		tech.startsWith("Jakarta.") ||
		techLower.includes("jvm")
	) {
		return "Java Development";
	}

	// Language-related
	if (
		techLower.includes("lang") ||
		techLower.includes("kotlin") ||
		techLower.includes("typescript") ||
		techLower.includes("javascript")
	) {
		return "Languages";
	}

	// Remote Development
	if (
		techLower.includes("remote") ||
		techLower.includes("ssh") ||
		techLower.includes("gateway")
	) {
		return "Remote Development";
	}

	// SQL and Databases
	if (
		techLower.includes("sql") ||
		techLower.includes("database") ||
		techLower.includes("db")
	) {
		return "Databases and SQL";
	}

	// Version Control
	if (
		techLower.includes("vcs") ||
		techLower.includes("git") ||
		tech.startsWith("Version Control")
	) {
		return "Version Control";
	}

	// Framework-related
	if (tech.startsWith("Frameworks.")) {
		return "Frameworks";
	}

	// Tools-related
	if (tech.startsWith("Tools.")) {
		return "Development Tools";
	}

	// Build-related
	if (
		techLower.includes("build") ||
		techLower.includes("gradle") ||
		techLower.includes("maven")
	) {
		return "Build Tools";
	}

	return tech;
}

function parseMarkdownTable(
	content: string,
	version: string,
	releaseType: ReleaseType,
): Change[] {
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

				// Extract issue ID and URL
				const issueMatch = issue.match(/\[([^\]]+)\]\(([^)]+)\)/);
				if (!issueMatch) {
					continue;
				}

				// If first cell is not empty or we find a technology in description, update current technology
				if (tech !== "") {
					currentTechnology = normalizeTechnology(tech, description);
				} else {
					const techFromDesc = normalizeTechnology("", description);
					if (techFromDesc !== "") {
						currentTechnology = techFromDesc;
					}
				}

				changes.push({
					technology: currentTechnology,
					type: type as ChangeType,
					issueId: issueMatch[1],
					issueUrl: issueMatch[2],
					description: description.replace(/<[^>]+>/g, "").trim(),
					version,
					releaseType,
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
	const changes = parseMarkdownTable(
		content,
		versionInfo.version,
		versionInfo.type,
	);

	return {
		...versionInfo,
		changes,
	};
}

function getBaseVersion(version: string): string {
	// Remove EAP/RC suffix and keep only the base version
	return version.replace(/\s+(?:EAP\s+\d+|RC)$/, "");
}

function aggregateByVersion(
	releaseNotes: ReleaseNote[],
): Map<string, Map<string, Change[]>> {
	const versionMap = new Map<string, Map<string, Change[]>>();
	const seenTickets = new Set<string>();

	for (const note of releaseNotes) {
		for (const change of note.changes) {
			// Skip if we've already seen this ticket
			if (seenTickets.has(change.issueId)) {
				continue;
			}
			seenTickets.add(change.issueId);

			const baseVersion = getBaseVersion(change.version);

			if (!versionMap.has(baseVersion)) {
				versionMap.set(baseVersion, new Map());
			}
			const techMap = versionMap.get(baseVersion)!;

			if (!techMap.has(change.technology)) {
				techMap.set(change.technology, []);
			}
			techMap.get(change.technology)!.push(change);
		}
	}

	// Sort versions in descending order and technologies alphabetically within each version
	return new Map(
		[...versionMap.entries()]
			.sort((a, b) => b[0].localeCompare(a[0]))
			.map(([version, techMap]) => [
				version,
				new Map([...techMap.entries()].sort()),
			]),
	);
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
	const versionMap = aggregateByVersion(releaseNotes);

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

	for (const [version, techMap] of versionMap) {
		const releaseType = [...techMap.values()][0][0].releaseType;
		html += `
            <div class="box mb-6">
                <h2 class="title is-4">Version ${version}</h2>
                <div class="content">`;

		for (const [technology, changes] of techMap) {
			html += `
                    <h3 class="title is-5">${technology}</h3>
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
                    </ul>`;
		}

		html += `
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
