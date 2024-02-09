export type BlockquoteSectionProps = {
	name: string;
	imageSrc: string;
	title: string;
	children: string[];
};

function BlockquoteSection({
	title,
	children,
	imageSrc,
	name,
}: BlockquoteSectionProps): JSX.Element {
	return (
		<section class="section has-background-dark">
			<div class="container">
				<div class="is-vcentered columns is-multiline is-centered">
					<div class="column">
						<div class="is-flex is-align-items-center">
							<div class="is-vcentered columns is-multiline">
								<div class="column is-6 is-4-desktop">
									<img
										class="image is-fullwidth is-128x128"
										src={imageSrc}
										alt={name}
									/>
									<h4 class="mt-2 mb-2 is-size-4 has-text-weight-bold has-text-grey-lighter">
										{name}
									</h4>
									<p class="has-text-grey">{title}</p>
								</div>
								<div class="column is-12 is-8-desktop">{children}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default BlockquoteSection;
