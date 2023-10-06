import { parse } from "node-html-parser";
import fs from "fs";

function writeLunrIndex() {
	const results = [];

	// Read _site/lunr_index.html and decode into array of objects
	const htmlString = fs.readFileSync("_site/lunr.html", "utf8");
	const htmlDoc = parse(htmlString);
	htmlDoc.childNodes[0].childNodes.forEach((element) => {
		const mostlyFullResult = JSON.parse(element.firstChild.textContent);
		element.getElementsByTagName("img").forEach((img) => {
			const keyName = img.attributes["data-key"];
			mostlyFullResult[keyName] = img.attributes["src"];
		});
		results.push(mostlyFullResult);
	});

	// Write to _site/lunr_index.json
	fs.writeFileSync("_site/lunr.json", JSON.stringify({ results }));

	// Delete _site/lunr_index.html
	fs.unlink("_site/lunr.html", () => {});
}

writeLunrIndex();
