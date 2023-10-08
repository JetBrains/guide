export const onVisible = function(element, callback) {
	const options = {
		root: document
	};
	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			callback(entry, observer);
		});
	}, options);
	observer.observe(element);
};

export function getContentType(resourceType, linkURL) {
	switch (resourceType) {
		case "tutorialstep":
			return "Part of tutorial";
		case "link":
			if (
				linkURL.indexOf("youtube.com") >= 0 ||
				linkURL.indexOf("youtu.be") >= 0
			) {
				return "YouTube";
			} else if (linkURL.indexOf("blog.jetbrains.com") >= 0) {
				return "JetBrains Blog";
			} else if (
				linkURL.indexOf("jetbrains.com") >= 0 &&
				linkURL.indexOf("help") >= 0
			) {
				return "Documentation";
			} else if (linkURL.indexOf("medium.com") >= 0) {
				return "Medium";
			}
			return "Link";
		default:
			return resourceType;
	}
}