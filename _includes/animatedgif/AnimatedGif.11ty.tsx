import h, { JSX } from "vhtml";
import VideoPlayer from "../video/VideoPlayer.11ty";

export type AnimatedGifProps = {
	file: string;
	width: number;
	height: number;
	style?: JSX.StyleHTMLAttributes;
};

const AnimatedGif = (animatedGif: AnimatedGifProps): JSX.Element => {
	return animatedGif.file.endsWith(".webm") ? (
		<VideoPlayer source={animatedGif.file} />
	) : (
		<img src={animatedGif.file} alt="Tip Screenshot" className="animated-gif" />
	);
};

export default AnimatedGif;
