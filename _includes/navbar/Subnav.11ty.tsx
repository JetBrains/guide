import { Channel } from "../resources/channel/ChannelModels";

export type SubnavProps = {
	channel: Channel;
};
const Subnav = ({ channel }: SubnavProps): JSX.Element => {
	return (
		<nav className="navbar navbar-secondary">
			<div className="container">
				<div className="navbar-brand">
					<div className="navbar-item is-size-5 has-text-weight-semibold pl-0">
						<a
							href={channel.url}
							className="is-hidden-touch"
							aria-label="Channel"
						>
							{channel.title}
						</a>
						<a href={channel.url} className="is-hidden-desktop ml-5">
							{channel.title}
						</a>
					</div>
				</div>
				{channel.subnav && (
					<div className="navbar-end is-hidden-touch">
						{channel.subnav.map((link) => (
							<a className="navbar-item" href={link.url}>
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
