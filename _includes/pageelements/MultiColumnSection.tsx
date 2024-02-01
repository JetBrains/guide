export type MultiColumnProps = {
	children?: JSX.Children;
};

function MultiColumnSection({ children }: MultiColumnProps) {
	let columns: JSX.Element;
	if (Array.isArray(children)) {
		columns = (
			<div class="columns">
				{children.map((column) => (
					<div class="column content">{column}</div>
				))}
			</div>
		);
	} else {
		// Just one child, so not a sequence
		columns = (
			<div class="columns">
				<div class="column content">{children}</div>
			</div>
		);
	}
	return (
		<section class="section has-background-grey-lighter">
			<div class="container">{columns}</div>
		</section>
	);
}

export default MultiColumnSection;
