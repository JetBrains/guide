import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import VideoPlayer, { VideoPlayerProps } from "./VideoPlayer.11ty";
import { jsxToString } from "jsx-async-runtime";

test("VideoPlayer", async () => {
	const props: VideoPlayerProps = {
		source: "https://youtu.be/8sSlWDiwdkc",
	};
	document.body.innerHTML = await jsxToString(VideoPlayer(props));
	const video: HTMLMediaElement = screen.getByTitle("Video Player");
	expect(video.outerHTML).contains(props.source);
	expect(video.dataset.plyrEmbedId).to.contain(props.source);
});

test("VideoPlayer supports verticals from YouTube", async () => {
	const props: VideoPlayerProps = {
		source: "https://youtu.be/LUbg9QkRDxQ",
		vertical: true,
	};
	document.body.innerHTML = await jsxToString(VideoPlayer(props));
	const video: HTMLMediaElement = screen.getByTitle("Video Player");
	expect(video.outerHTML).contains(props.source);
	expect(video.dataset.plyrEmbedId).to.contain(props.source);
	expect(video.dataset.plyrConfig).to.contain("9:16");
});
