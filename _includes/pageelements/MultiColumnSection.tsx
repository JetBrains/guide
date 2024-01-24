export type MultiColumnProps = {
	children?: JSX.Element;
};

function MultiColumnSection({ children }: MultiColumnProps) {
	return (
		<section class="section has-background-grey-lighter">
			<div class="container">
				<div class="columns">
					{/*TODO ESM Need to re-invent children and two-columns*/}
					{children &&
						children.map((column) => (
							<div class="column content">{column}</div>
						))}
				</div>
			</div>
		</section>
	);
}

export default MultiColumnSection;
