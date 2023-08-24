import h, { JSX } from "vhtml";

export type ImageProps = {
	src: string;
	alt?: string;
	className?: string;
};

const Thumbnail = ({ src, alt, className }: ImageProps): JSX.Element => {
	const loading = "lazy" as const;
	return <img loading={loading} src={src} alt={alt} class={className} />;
};

export default Thumbnail;
