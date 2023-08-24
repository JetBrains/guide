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
	title: ".NET Tools Guide",
	subtitle: "Learning resources for ReSharper, Rider and more.",
	resourceType: "channel",
	date: new Date(Date.UTC(2020, 1, 11)),
	author: "maartenba",
	thumbnail: "thumbnail.png",
	hero: "/assets/dotnet_splash.svg",
	subnav: [
		{ title: "Download", url: "https://www.jetbrains.com/dotnet/" },
		{ title: "Blog", url: "https://blog.jetbrains.com/dotnet/" },
		{ title: "Docs", url: "https://www.jetbrains.com/help/" },
	],
};

class DotNetHomepage {
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
			limit: 3,
		});

		const tutorials = this.getResources({
			resourceTypes: ["tutorial"],
			channel: channel.url,
			limit: 3,
		});

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					subtitle={channel.subtitle!}
					image={channel.hero!}
				/>
				{tips && (
					<ListingSection
						title={`Recent Tips`}
						resources={tips}
						moreLink={`${channel.url}tips/`}
					/>
				)}
				<MultiColumnSection>
					<div>
						<h2>Learn something new, quickly</h2>
						<p>
							JetBrains tools included in the{" "}
							<a href="https://www.jetbrains.com/dotnet/">dotUltimate pack</a>{" "}
							are powerful developer productivity tools. What is the best way to
							learn how to harness that power?
						</p>
						<p>
							You can find useful information on our Twitter accounts,{" "}
							<a href="https://twitter.com/ReSharper">@ReSharper</a> and{" "}
							<a href="https://twitter.com/JetBrainsRider">@JetBrainsRider</a> ,
							or our{" "}
							<a href="https://blog.jetbrains.com/dotnet/">product blog</a>.
							Plus, the{" "}
							<a href="https://www.jetbrains.com/resharper/documentation/documentation.html">
								documentation
							</a>{" "}
							is always there to help. However, wouldn't it be better if you had
							everything you needed to learn in one place?
						</p>
						<p>
							We have created the .NET Tools Guide, a collection of bite-sized
							visual resources, organized to help spark your learning. We hope
							it helps you get into the flow and excel at what you do.
						</p>
					</div>
					<div>
						<h2>Sharing Feedback and Contributing</h2>
						<p>
							The .NET Tools Guide is also an open project, with{" "}
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
						title={`Recent Tutorials`}
						resources={tutorials}
						moreLink={`${channel.url}tutorials/`}
					/>
				)}
			</BaseLayout>
		);
	}
}

module.exports = DotNetHomepage;
