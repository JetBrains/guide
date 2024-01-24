import VideoPlayer from "../video/VideoPlayer.11ty";

export type AnimatedGifProps = {
	file: string;
	width: number;
	height: number;
	style?: any;
};

const AnimatedGif = (animatedGif: AnimatedGifProps): JSX.Element => {
	return animatedGif.file.endsWith(".webm") ? (
		<VideoPlayer source={animatedGif.file} />
	) : (
		<img src={animatedGif.file} alt="Tip Screenshot" class="animated-gif" />
	);
};

export default AnimatedGif;
