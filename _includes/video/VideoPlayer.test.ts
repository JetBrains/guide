import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import VideoPlayer, { VideoPlayerProps } from "./VideoPlayer.11ty";
import { renderToString } from "jsx-async-runtime";

const props: VideoPlayerProps = {
	source: "https://youtu.be/8sSlWDiwdkc",
};

test("VideoPlayer", async () => {
	const r = VideoPlayer(props);
	document.body.innerHTML = await renderToString(r, {});
	const video: HTMLMediaElement = screen.getByTitle("Video Player");
	expect(video.outerHTML).contains(props.source);
	expect(video.dataset.plyrEmbedId).to.contain(props.source);
});
