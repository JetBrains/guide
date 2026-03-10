export type InfoBannerProps = {
	children?: JSX.Children;
};

const InfoBanner = ({ children }: InfoBannerProps): JSX.Element => {
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
