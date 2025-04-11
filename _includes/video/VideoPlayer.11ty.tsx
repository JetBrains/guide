export type VideoPlayerProps = {
	source: string | { url: string; start: number; end: number };
	width?: number;
	height?: number;
	vertical?: boolean;
};

const VideoPlayer = ({
	source,
	width,
	height,
	vertical,
}: VideoPlayerProps): JSX.Element => {
	const { url, start, end } =
		typeof source === "string"
			? { url: source, start: undefined, end: undefined }
			: { url: source.url, start: source.start, end: source.end };
	let ratio = `"ratio": "${vertical ? "9:16" : "16:9"}"`;
	let plyrConfig = `\{${ratio}\}`;
	if (url.endsWith(".webm")) {
		let style = "aspect-ratio:" + (vertical ? "9/16" : "16/9") + ";";
		if (width) {
			style += `max-width: ${width}px;`;
		}
		if (height) {
			style += `max-height: ${height}px;`;
		}
		return (
			<div style={style}>
				<video
					class="video-player"
					playsinline
					controls
					data-start={start}
					data-end={end}
					data-plyr-config={plyrConfig}
				>
					<source src={url} type="video/webm" />
				</video>
			</div>
		);
	} else {
		return (
			<div
				title="Video Player"
				class="video-player"
				data-start={start}
				data-end={end}
				data-plyr-provider="youtube"
				data-plyr-config={plyrConfig}
				data-plyr-embed-id={`${url}?iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`}
			></div>
		);
	}
};

export default VideoPlayer;
