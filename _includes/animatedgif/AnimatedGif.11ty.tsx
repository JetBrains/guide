import VideoPlayer from "../video/VideoPlayer.11ty";

export type AnimatedGifProps = {
	file: string;
	width?: number;
	height?: number;
	style?: any;
};

const AnimatedGif = (animatedGif: AnimatedGifProps): JSX.Element => {
	return animatedGif.file.endsWith(".webm") ? (
		<VideoPlayer
			source={animatedGif.file}
			width={animatedGif.width}
			height={animatedGif.height}
		/>
	) : (
		<img
			src={animatedGif.file}
			alt="Tip Screenshot"
			width={animatedGif.width}
			height={animatedGif.height}
			class="animated-gif"
		/>
	);
};

export default AnimatedGif;
