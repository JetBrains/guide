import { Heading } from "../components/Heading";
import { ViewProps } from "../eleventy";

export type IndexProps = {
	filePathStem: string;
};

export function Index({ filePathStem }: IndexProps): JSX.Element {
	return <Heading name={filePathStem} />;
}

export function render({ page }: ViewProps): JSX.Element {
	return <Index filePathStem={page.filePathStem} />;
}
