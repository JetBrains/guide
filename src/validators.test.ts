import { expect, test } from "vitest";
import { validateContent, validateFrontmatter } from "./validators";
import { TipFrontmatter } from "../_includes/resources/tip/TipModels";

test("validates good frontmatter", () => {
	const frontmatter = {
		title: "A Good Tip",
		body: "Some *content*",
		id: "some-id",
		author: "some-author",
		slug: "some-slug",
		url: "/tips/some-slug",
		date: new Date(),
		resourceType: "tip",
		thumbnail: "thumbnail.png",
		inputFolder: "site/webstorm-pycharm-webstorm-guide/tips/some-slug/",
	};
	const validation = () =>
		validateFrontmatter(TipFrontmatter, frontmatter, "tip1.md");
	expect(validation).not.toThrow();
});

test("validates bad frontmatter", () => {
	const frontmatter = { age: 49 };
	const validation = () =>
		validateFrontmatter(TipFrontmatter, frontmatter, "tip1.md");
	expect(validation).toThrow("Validation failure");
	expect(validation).toThrow("tip1.md");
});

test("validates bad content", () => {
	const content =
		"\n" +
		"\n" +
		"| Name              | macOS Shortcut  | Windows / Linux Shortcut    |\n" +
		"| ----------------- | --------------- | --------------------------- |\n" +
		"| Find Action       | <kbd>⌘⇧A<kbd>   | <kbd>Ctrl+Shift+A</kbd>     |\n" +
		"| Project Structure | <kbd>⌘;</kbd>   | <kbd>Ctrl+Alt+Shift+S</kbd> |";
	const validation = () => validateContent(content, "tip1.md");
	expect(validation).toThrow("Validation failure");
	expect(validation).toThrow("tip1.md");
	expect(validation).toThrow("<kbd>");
});

test("validates more bad content", () => {
	const content =
		"You’ll need to restart your IDE, <production filler content> but then you’re all set.";
	const validation = () => validateContent(content, "tip1.md");

	expect(validation).toThrow("Validation failure");
	expect(validation).toThrow("tip1.md");
	expect(validation).toThrow("<production filler content>");
});

test("validates even more bad content", () => {
	const content = "<kbc>" + "</kbd>";
	const validation = () => validateContent(content, "tip1.md");

	expect(validation).toThrow("Validation failure");
	expect(validation).toThrow("tip1.md");
	expect(validation).toThrow("<kbc>");
	expect(validation).toThrow("</kbd>");
});

test("validates content with <br>", () => {
	const content = "<br>";
	const validation = () => validateContent(content, "tip1.md");

	expect(validation).not.toThrow("Validation failure");
});

test("validates content with <img>", () => {
	const content = "<img>";
	const validation = () => validateContent(content, "tip1.md");

	expect(validation).not.toThrow("Validation failure");
});

test("validates content with self-closing tags", () => {
	const content = `<img src="/url/"/>`;
	const validation = () => validateContent(content, "tip1.md");

	expect(validation).not.toThrow("Validation failure");
});
