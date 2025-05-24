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
	title: "Java",
	subtitle: "Learning resources for Java\nand related technologies.",
	resourceType: "channel",
	date: new Date(Date.UTC(2020, 1, 11)),
	author: "hs",
	// TODO Paul get this out of the schema
	accent: "primary",
	icon: "fa-brands fa-java",
	hero: "/assets/splashes/java.svg",
	logo: "thumbnail.png",
	subnav: [
		{ title: "Download", url: "https://www.jetbrains.com/idea/" },
		{ title: "Blog", url: "https://blog.jetbrains.com/idea/" },
		{ title: "Docs", url: "https://www.jetbrains.com/help/" },
	],
};

export default class JavaHomepage {
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

		const tutorials = this.getResources({
			resourceTypes: ["tutorial"],
			channel: channel.url,
			limit: 4,
		});

		const playlists = this.getResources({
			resourceTypes: ["playlist"],
			channel: channel.url,
			limit: 4,
		});

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					subtitle={channel.subtitle!}
					image={channel.hero!}
					titleExtraClass={"has-text-white"}
					subtitleExtraClass={"has-text-white"}
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
						<p>
							JetBrains tools like IntelliJ IDEA are powerful developer
							productivity tools. What is the best way to learn how to harness
							that power?
						</p>

						<p>
							You can find useful information on our{" "}
							<a href="https://twitter.com/intellijidea"> Twitter page</a>, or
							our <a href="https://blog.jetbrains.com/idea/">product blog</a>.
							Or videos on our{" "}
							<a href="https://www.youtube.com/intellijidea">
								{" "}
								YouTube channel
							</a>
							. Plus, the{" "}
							<a href="https://www.jetbrains.com/idea/">documentation</a> is
							always there to help.
						</p>

						<p>
							We have also created the IntelliJ IDEA Guide, a collection of
							bite-sized visual resources, organized to help spark your
							learning. We hope it helps you get into the flow and excel at what
							you do.
						</p>
					</div>
					<div>
						<h2>Sharing feedback and contributing</h2>
						<p>
							The IntelliJ IDEA Guide is also an open project, with{" "}
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
