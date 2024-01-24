export type MultiColumnProps = {
	children: string[];
};

function MultiColumnSection({ children }: MultiColumnProps) {
	return (
		<section class="section has-background-grey-lighter">
			<div class="container">
				<div class="columns">
					{children.map((column) => (
						<div class="column content">{column}</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default MultiColumnSection;
