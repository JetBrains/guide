export type HeroSectionProps = {
	title: string;
	titleExtraClass?: string;
	subtitle: string;
	subtitleExtraClass?: string;
	image: string;
	extraStyle?: string;
	extraContent?: JSX.Element;
};

function HeroSection({
	title,
	titleExtraClass,
	subtitle,
	subtitleExtraClass,
	image,
	extraStyle = "",
	extraContent = "",
}: HeroSectionProps) {
	const subtitleHtml = subtitle ? subtitle.replace("\n", "<br/>") : "";
	return (
		<section class="hero is-medium channel-hero">
			<div class="hero-body">
				<div class="container">
					<h1
						class={`mt-2 mb-4 is-size-1 has-text-weight-bold ${
							titleExtraClass || ""
						}`}
					>
						{title}
					</h1>
					<p class={`subtitle mb-5 ${subtitleExtraClass || "has-text-grey"}`}>
						{subtitleHtml}
					</p>
					{extraContent}
				</div>
			</div>
			<picture>
				<img src={image} alt={title} aria-hidden={true} />
			</picture>
		</section>
	);
}

export default HeroSection;
