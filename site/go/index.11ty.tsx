import h, { JSX } from "vhtml";
import { LayoutContext } from "../../src/models";
import ListingSection from "../../_includes/pageelements/ListingSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";
import {
	Channel,
	ChannelFrontmatter,
	ChannelHomepageData,
} from "../../_includes/resources/channel/ChannelModels";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import MultiColumnSection from "../../_includes/pageelements/MultiColumnSection";

const frontmatter: ChannelFrontmatter = {
	title: "Go",
	subtitle: "The Hitchhiker's Guide to Go",
	resourceType: "channel",
	date: new Date(Date.UTC(2020, 1, 11)),
	author: "pwe",
	accent: "primary",
	icon: "fa-brands fa-golang",
	hero: "/assets/go_splash.svg",
	logo: "thumbnail.png",
	subnav: [
		{ title: "Download", url: "https://www.jetbrains.com/go/" },
		{ title: "Blog", url: "https://blog.jetbrains.com/go/" },
		{ title: "Docs", url: "https://www.jetbrains.com/help/" },
	],
};

class GoHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;
		const tips = this.getResources({
			resourceTypes: ["tip"],
			channel: channel.url,
			limit: 4,
		});

		const playlists = this.getResources({
			resourceTypes: ["playlist"],
			channel: channel.url,
			limit: 4,
		});

		const tutorials = this.getResources({
			resourceTypes: ["tutorial"],
			channel: channel.url,
			limit: 4,
		});

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					titleExtraClass={"has-text-white"}
					subtitle={channel.subtitle!}
					subtitleExtraClass={"has-text-white"}
					image={channel.hero!}
				/>
				{tips && (
					<ListingSection
						title={`Latest tips`}
						resources={tips}
						moreLink={`${channel.url}tips/`}
					/>
				)}
				<MultiColumnSection>
					<div>
						<h2>Learn something new, quickly</h2>

						<p>
							JetBrains tools like{" "}
							<a href="https://jetbrains.com/go/">GoLand</a> are powerful
							developer productivity tools. What is the best way to learn how to
							harness that power?
						</p>
						<p>
							You can find useful information on our Twitter account,{" "}
							<a href="https://twitter.com/GoLandIDE">@GoLandIDE</a> , or our{" "}
							<a href="https://blog.jetbrains.com/go/">product blog</a>. Plus,
							the{" "}
							<a href="https://www.jetbrains.com/go/learn/">documentation</a> is
							always there to help. However, wouldn't it be better if you had
							everything you needed to learn in one place?
						</p>

						<p>
							We have created the GoLand Guide, a collection of bite-sized
							visual resources, organized to help spark your learning. We hope
							it helps you get into the flow and excel at what you do.
						</p>
					</div>
					<div>
						<h2>Sharing feedback and contributing</h2>
						<p>
							The GoLand Guide is also an open project, with{" "}
							<a href="https://github.com/jetbrains/guide">
								a repository in GitHub
							</a>{" "}
							that hosts all the content. We write all the content in Markdown
							and render a static site. If you'd like to contribute to it,
							please refer to the{" "}
							<a href="https://github.com/jetbrains/guide/blob/master/README.md">
								README
							</a>{" "}
							for more information.
						</p>
					</div>
				</MultiColumnSection>

				{tutorials && (
					<ListingSection
						title={`Latest tutorials`}
						resources={tutorials}
						moreLink={`${channel.url}tutorials/`}
					/>
				)}
				{playlists && (
					<ListingSection
						title={`Recent playlists`}
						resources={playlists}
						moreLink={`${channel.url}playlists/`}
						separator={true}
					/>
				)}
			</BaseLayout>
		);
	}
}

module.exports = GoHomepage;
