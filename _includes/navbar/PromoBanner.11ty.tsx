import { Channel } from "../resources/channel/ChannelModels";

export type PromoBannerProps = {
	channel: Channel;
};
const PromoBanner = ({ channel }: PromoBannerProps): JSX.Element => {
	return (
		<>
			{channel.slug == "dotnet" && new Date() <= new Date(2024, 9, 26) && (
				<section class="hero is-primary has-text-white">
					<div class="container hero-body p-2 is-align-content-center level">
						<div class="level-item mr-4">
							Join us for a free 2-day community event &ndash; JetBrains .NET
							Days Online 2024
						</div>
						<div class="level-item">
							<a
								class="button is-rounded is-white"
								href="https://lp.jetbrains.com/dotnet-days-2024/?utm_source=google&utm_medium=referral&utm_campaign=guide&utm_content=guide"
							>
								Register now!
							</a>
						</div>
					</div>
				</section>
			)}
			{channel.slug == "javascript" && new Date() <= new Date(2024, 10, 24) && (
				<section class="hero is-primary has-text-white">
					<div class="container hero-body p-2 is-align-content-center level">
						<div class="level-item mr-4">
							Join us for a free community event &ndash; JetBrains JavaScript
							Day 2024
						</div>
						<div class="level-item">
							<a
								class="button is-rounded is-white"
								href="https://lp.jetbrains.com/javascript-day-2024/?utm_source=google&utm_medium=referral&utm_campaign=guide&utm_content=guide"
							>
								Register now!
							</a>
						</div>
					</div>
				</section>
			)}
			{channel.slug == "gamedev" && new Date() <= new Date(2024, 10, 10) && (
				<section class="hero is-primary has-text-white">
					<div class="container hero-body p-2 is-align-content-center level">
						<div class="level-item mr-4">
							Join us for a free community event &ndash; JetBrains GameDev Days
							2024
						</div>
						<div class="level-item">
							<a
								class="button is-rounded is-white"
								href="https://lp.jetbrains.com/gamedev-days-2024/?utm_source=google&utm_medium=referral&utm_campaign=guide&utm_content=guide"
							>
								Register now!
							</a>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default PromoBanner;
