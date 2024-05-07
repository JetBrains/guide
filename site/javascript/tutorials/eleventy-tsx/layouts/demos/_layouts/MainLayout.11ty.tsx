import { ViewProps } from "../eleventy";
import { Heading } from "../components/Heading";

export function MainLayout({ content, title }: ViewProps): JSX.Element {
	return (
		<html lang="en">
			<head>
				<title>{title}</title>
			</head>
			<body>
				<Heading name={title} />
				{content}
			</body>
		</html>
	);
}

export const render = MainLayout;
