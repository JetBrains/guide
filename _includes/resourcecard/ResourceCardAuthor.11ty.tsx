// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type ResourceCardAuthorProps = {
  thumbnail: string;
  slug: string;
  title: string;
};
const ResourceCardAuthor = ({
  thumbnail,
  slug,
  title,
}: ResourceCardAuthorProps): JSX.Element => {
  return (
    <>
      {thumbnail && (
        <a className="level-item bio-card-author" href={slug}>
          <figure
            className="image is-rounded is-24x24"
            style="margin-left: 0.2rem; margin-right: 0.2rem"
          >
            {thumbnail && (
              <div className="image is-rounded is-24x24">
                <img
                  src={thumbnail}
                  alt={`rca-fluid`}
                  width="24px"
                  height="24px"
                  className="bio-resourcecard-logo"
                />
              </div>
            )}
          </figure>
          <span className="bio-card-author-label">{title}</span>
        </a>
      )}
    </>
  );
};

export default ResourceCardAuthor;
