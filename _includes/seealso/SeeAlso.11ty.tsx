type SeeAlsoItem = {
	title: string;
	href: string;
};

export type SeeAlsos = SeeAlsoItem[];

export type SeeAlsoProps = {
	items: SeeAlsos;
};

const SeeAlso = ({ items }: SeeAlsoProps): JSX.Element => {
	if (items.length) {
		return (
			<div>
				<header id="see-also" class="is-size-3 is-bold">
					See Also
				</header>
				<div class="content">
					<ul>
						{items.map((see) => (
							<li>
								<a href={see.href}>{see.title}</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
	return <></>;
};

export default SeeAlso;
