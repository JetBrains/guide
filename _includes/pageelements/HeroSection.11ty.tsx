import h from "vhtml";

export type HeroSectionProps = {
	title: string;
	titleExtraClass?: string;
	subtitle: string;
	subtitleExtraClass?: string;
	image: string;
	extraStyle?: string;
	extraContent?: string;
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
	const style = `background: url('${image}') center center; background-repeat: no-repeat; background-size: cover; ${extraStyle}`;
	return (
		<section class="hero is-medium" style={style}>
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
						{subtitle}
					</p>
					{extraContent}
				</div>
			</div>
		</section>
	);
}

export default HeroSection;
