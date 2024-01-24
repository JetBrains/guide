import { Channel } from "../resources/channel/ChannelModels";

export type SubnavProps = {
	channel: Channel;
};
const Subnav = ({ channel }: SubnavProps): JSX.Element => {
	return (
		<nav class="navbar navbar-secondary">
			<div class="container">
				<div class="navbar-brand">
					<div class="navbar-item is-size-5 has-text-weight-semibold pl-0">
						<a href={channel.url} class="is-hidden-touch" aria-label="Channel">
							{channel.title}
						</a>
						<a href={channel.url} class="is-hidden-desktop ml-5">
							{channel.title}
						</a>
					</div>
				</div>
				{channel.subnav && (
					<div class="navbar-end is-hidden-touch">
						{channel.subnav.map((link) => (
							<a class="navbar-item" href={link.url}>
								{link.title}
							</a>
						))}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Subnav;
