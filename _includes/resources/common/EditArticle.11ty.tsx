export type EditArticleProps = {
	path: string;
};

const EditArticle = ({ path }: EditArticleProps): JSX.Element => {
	return (
		<div class="is-pulled-right is-size-7 mt-2">
			<a
				href={
					"https://github.com/JetBrains/guide/edit/main/" +
					path.replace("./", "")
				}
				class="has-text-grey-dark is-underlined"
			>
				Edit this page
			</a>
		</div>
	);
};

export default EditArticle;
