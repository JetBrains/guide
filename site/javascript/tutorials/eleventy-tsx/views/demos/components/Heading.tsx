export type HeadingProps = {
	name?: string;
};

export function Heading({ name = "TSX" }: HeadingProps): JSX.Element {
	return <h1>Hello {name}</h1>;
}
