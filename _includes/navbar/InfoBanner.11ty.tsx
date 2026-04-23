export type InfoBannerProps = {
	children?: JSX.Children;
	show?: boolean;
};

const InfoBanner = ({
	children,
	show = false,
}: InfoBannerProps): JSX.Element | null => {
	if (!show) return null;
	return (
		<section class="has-background-info has-text-white py-2 has-text-centered">
			<span class="icon-text">
				<span class="icon">
					<i class="fa-solid fa-circle-info"></i>
				</span>
				<span>{children}</span>
			</span>
		</section>
	);
};

export default InfoBanner;
