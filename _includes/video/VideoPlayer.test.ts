import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import VideoPlayer, { VideoPlayerProps } from "./VideoPlayer.11ty";
import { renderToString } from "jsx-async-runtime";

test("VideoPlayer with YouTube", async () => {
	const props: VideoPlayerProps = {
		source: "https://youtu.be/8sSlWDiwdkc",
	};
	document.body.innerHTML = await renderToString(VideoPlayer(props));
	const video: HTMLMediaElement = screen.getByTitle("Video Player");
	expect(video.outerHTML).contains(props.source);
	expect(video.dataset.plyrEmbedId).to.contain(props.source);
});

test("VideoPlayer with WebM", async () => {
	const props: VideoPlayerProps = {
		source: "test.webm",
		width: 1366,
		height: 768,
	};
	document.body.innerHTML = await renderToString(VideoPlayer(props));
	const video = screen.getByRole("video");
	expect(video.classList.contains("video-player")).toBe(true);
	const source = video.querySelector("source");
	expect(source?.getAttribute("src")).toBe(props.source);
	expect(source?.getAttribute("type")).toBe("video/webm");
});
