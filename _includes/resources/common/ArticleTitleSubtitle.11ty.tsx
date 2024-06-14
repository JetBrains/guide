import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

export type ArticleTitleSubtitleProps = {
	title: string;
	subtitle: string | undefined;
};

const ArticleTitleSubtitle = ({
	title,
	subtitle,
}: ArticleTitleSubtitleProps): JSX.Element => {
	return (
		<Fragment>
			<h2 class="title is-size-2 is-size-3-mobile">{title}</h2>
			{subtitle && (
				<h3 class="subtitle is-size-4 pt-1 has-text-grey">{subtitle}</h3>
			)}
		</Fragment>
	);
};

export default ArticleTitleSubtitle;
