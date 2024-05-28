export type VideoPlayerProps = {
	source: string | { url: string; start: number; end: number };
	width?: number;
	height?: number;
};

const VideoPlayer = ({
	source,
	width,
	height,
}: VideoPlayerProps): JSX.Element => {
	const { url, start, end } =
		typeof source === "string"
			? { url: source, start: undefined, end: undefined }
			: { url: source.url, start: source.start, end: source.end };
	if (url.endsWith(".webm")) {
		return (
			<video
				class="video-player"
				width={width}
				height={height}
				playsinline
				controls
				data-start={start}
				data-end={end}
			>
				<source src={url} type="video/webm" />
			</video>
		);
	} else {
		return (
			<div
				title="Video Player"
				class="video-player"
				data-start={start}
				data-end={end}
				data-plyr-provider="youtube"
				data-plyr-embed-id={`${url}?iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`}
			></div>
		);
	}
};

export default VideoPlayer;
