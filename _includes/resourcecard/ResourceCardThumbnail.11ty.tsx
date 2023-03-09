// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type ResourceCardThumbnailProps = {
  thumbnail: string;
};
const ResourceCardThumbnail = ({
  thumbnail,
}: ResourceCardThumbnailProps): JSX.Element => {
  return (
    <figure className="image is-96x96">
      <img src={thumbnail} alt={`rcg-thumbnail`} width="96" height="96" />
    </figure>
  );
};

export default ResourceCardThumbnail;
