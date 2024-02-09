import fs from "fs";
import { Window } from "happy-dom";

export function makeDoc(html) {
	/* Given a string of HTML, return a Happy-DOM document. */
	const window1 = new Window();
	const domParser = new window1.DOMParser();
	return domParser.parseFromString(html, "text/xml");
}

function writeLunrIndex() {
	const results = [];

	// Read _site/lunr_index.html and decode into array of objects
	const htmlString = fs.readFileSync("_site/lunr.html", "utf8");
	// const htmlDoc = parse(htmlString);
	const htmlDoc = makeDoc(htmlString);
	const records = htmlDoc.querySelectorAll("div.record");
	records.forEach((element) => {
		const pres = element.querySelector("pre");
		const mostlyFullResult = JSON.parse(pres.textContent);
		const imgs = element.querySelectorAll("img");
		imgs.forEach((img) => {
			mostlyFullResult[img.dataset.key] = img.src;
		});
		results.push(mostlyFullResult);
	});

	// Write to _site/lunr_index.json
	fs.writeFileSync("_site/lunr.json", JSON.stringify({ results }));

	// Delete _site/lunr_index.html
	fs.unlink("_site/lunr.html", () => {});
}

writeLunrIndex();
