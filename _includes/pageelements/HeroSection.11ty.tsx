export type HeroSectionProps = {
	title: string;
	titleExtraClass?: string;
	subtitle: string;
	subtitleExtraClass?: string;
	image: string;
	extraImageStyle?: string;
	extraContent?: JSX.Element;
};

function HeroSection({
	title,
	titleExtraClass,
	subtitle,
	subtitleExtraClass,
	image,
	extraImageStyle = "",
	extraContent = "",
}: HeroSectionProps) {
	const subtitleHtml = subtitle ? subtitle.replace("\n", "<br/>") : "";
	return (
		<section class="hero is-medium channel-hero">
			<div class="hero-body">
				<div class="container">
					<h1
						class={`mt-2 mb-4 title is-size-1 is-size-3-mobile has-text-weight-semibold ${
							titleExtraClass || ""
						}`}
					>
						{title}
					</h1>
					<p
						class={`subtitle is-size-2 is-size-4-mobile mb-5 ${subtitleExtraClass || "has-text-grey"}`}
					>
						{subtitleHtml}
					</p>
					{extraContent}
				</div>
			</div>
			<picture style={extraImageStyle}>
				<img src={image} alt={title} aria-hidden={true} />
			</picture>
		</section>
	);
}

export default HeroSection;
