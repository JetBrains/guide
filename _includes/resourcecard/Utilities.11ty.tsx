import { AuthorFrontmatter } from "../resources/author/AuthorModels";
import h from "vhtml";
import { References } from "../../src/ResourceModels";

const lazyLoading = "lazy" as const;

export const AuthorIcon = (
	author: Pick<AuthorFrontmatter, "thumbnail" | "title">
) => (
	<img
		src={author.thumbnail}
		alt={author.title}
		loading={lazyLoading}
		class="avatar"
		data-template-src="authorThumbnail"
	/>
);

export function doesExist(resource: References | undefined): asserts resource {
	if (!resource) {
		throw new Error("Resource does not exist");
	}
}
