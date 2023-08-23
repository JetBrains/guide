import { vi } from "vitest";

// @ts-ignore
const happyDOMSettings = window.happyDOM.settings;
happyDOMSettings.disableJavaScriptFileLoading = true;
happyDOMSettings.disableJavaScriptEvaluation = true;
happyDOMSettings.disableCSSFileLoading = true;
happyDOMSettings.disableIframePageLoading = true;
happyDOMSettings.disableComputedStyleRendering = true;
happyDOMSettings.enableFileSystemHttpRequests = false;

// import Image from "@11ty/eleventy-img";
vi.mock("@11ty/eleventy-img", () => {
	const mockImage = vi.fn();
	// @ts-ignore
	mockImage.statsSync = () => {
		return {};
	};
	// @ts-ignore
	mockImage.generateHTML = vi.fn();
	return {
		default: mockImage,
		Image: mockImage,
	};
});
