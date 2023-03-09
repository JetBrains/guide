import h, { JSX } from "vhtml";

export type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

const Thumbnail = ({ src, alt, className }: ImageProps): JSX.Element => {
  // @ts-ignore
  return <img loading={`lazy`} src={src} alt={alt} class={className} />;
};

export default Thumbnail;
