// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import Thumbnail from "../Image.11ty";
import { Author } from "../references/author/AuthorModels";

export type SidebarPublishedProps = {
  displayDate: string;
  author: Author;
};
const SidebarPublished = ({
  displayDate,
  author,
}: SidebarPublishedProps): JSX.Element => {
  return (
    <div class="bio-page-sidenav-published-heading">
      <p class="menu-label bio-page-sidebar-published">Published</p>
      <ul class="menu-list">
        <li>
          <article class="media">
            <figure class="media-left">
              <div class="image is-rounded is-48x48">
                <Thumbnail
                  src={author.thumbnail}
                  alt={`${author.title} Thumbnail`}
                  className="bio-resourcecard-logo"
                />
              </div>
            </figure>
            <div class="media-content">
              <div class="content">
                <time class="bio-page-sidebar-published-date" datetime={displayDate}>
                  {displayDate}
                </time>
                <div>by:</div>
                <a aria-label="Author Sidebar" href={author.url}>
                  {author.title}
                </a>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </div>
  );
};

export default SidebarPublished;
