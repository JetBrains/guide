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
import FeaturedResource from "../../_includes/pageelements/FeaturedResource.11ty";
import { Topic } from "../../_includes/references/topic/TopicModels";
import {
	PLAYLIST_RESOURCE,
	TIP_RESOURCE,
	TUTORIAL_RESOURCE,
} from "../../src/resourceType";

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

		const topics = this.getReferences({
			resourceTypes: ["topic"],
			customFilter: (r) =>
				r.label != undefined &&
				(r.label.indexOf("blazor") >= 0 ||
					r.label.indexOf("csharp") >= 0 ||
					r.label.indexOf("fsharp") >= 0 ||
					r.label.indexOf(".net") >= 0 ||
					r.label.indexOf("asp.net") >= 0 ||
					r.label.indexOf("gaming") >= 0),
		}) as Topic[];

		const tips = this.getResources({
			resourceTypes: [TIP_RESOURCE],
			channel: channel.url,
			limit: 4,
		});

		const tutorials = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE],
			channel: channel.url,
			limit: 4,
		});

		const refactoringTips = this.getResources({
			resourceTypes: [TIP_RESOURCE],
			channel: channel.url,
			limit: 4,
			customFilter: (r) => r.topics?.includes("refactoring") == true,
		});

		const aspNetTutorials = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE],
			channel: channel.url,
			limit: 4,
			customFilter: (r) =>
				r.topics?.includes("asp.net") == true &&
				r.topics?.includes("docker") == false,
			sorter: (a, b) => (a.date > b.date ? 1 : -1),
		});

		const eventPlaylists = this.getResources({
			resourceTypes: [PLAYLIST_RESOURCE],
			channel: channel.url,
			limit: 4,
			customFilter: (r) =>
				r.slug.indexOf("day-online") >= 0 || r.slug.indexOf("days-online") >= 0,
		});

		const dockerTutorial = this.getResource("/dotnet/tutorials/docker-dotnet/");

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					subtitle={channel.subtitle!}
					image={channel.hero!}
				/>
				<MultiColumnSection>
					<div>
						<h2 class="title">Learn something new, quickly</h2>
						<p>
							We have created the JetBrains Guide, a collection of resources to
							help you understand a topic or technology. We hope it helps you
							get into the flow and excel at what you do.
						</p>
						<p></p>
					</div>
					<div class="columns is-multiline">
						{topics.map((topic) => {
							let figure: string;
							if (topic.icon) {
								figure = (
									<i class={`${topic.icon} has-text-${topic.accent} fa-2x`} />
								);
							} else if (topic.logo) {
								figure = <img src={topic.logo} alt={topic.title} />;
							} else {
								figure = (
									<i class={`fas fa-file has-text-${topic.accent} fa-2x`} />
								);
							}

							return (
								<div className="column mb-1 is-6 is-4-desktop py-5 has-box-hover has-text-centered has-position-relative">
									<a
										href={topic.url}
										aria-label={`Topic`}
										className="is-size-5 has-text-weight-bold title is-stretched-link"
									>
										<figure className="image is-48x48 mb-1 mx-auto">
											{figure}
										</figure>
										{topic.title}
									</a>
								</div>
							);
						})}
					</div>
				</MultiColumnSection>

				<FeaturedResource resource={dockerTutorial}>
					<p>
						Many software development teams are containerizing their .NET
						applications. While Docker and containerization open the doors to
						cloud-native and planet-scale applications, containerization is not
						only about that!
					</p>{" "}
					<p>
						With Docker containers, you can package your .NET apps and
						dependencies into portable containers that serve as the unit of
						deployment, no matter where you want to run the application.
						Containers make sure deployment happens in a well-known environment.
					</p>{" "}
					<p>
						This tutorial aims to inform .NET developers who may have heard
						about Docker but aren't sure what it is, why they should care, and
						how it fits into developing their distributed .NET applications.
					</p>
				</FeaturedResource>

				{aspNetTutorials && (
					<ListingSection
						title={`Learn ASP.NET Core`}
						subtitle={`Tutorials that help you build amazing web experiences with .NET.`}
						resources={aspNetTutorials}
						moreLink={`${channel.url}technologies/asp.net/`}
						separator={true}
						includeCardFooter={false}
					/>
				)}

				{refactoringTips && (
					<ListingSection
						title={`Learn about refactoring`}
						resources={refactoringTips}
						moreLink={`/topics/refactoring/`}
						separator={true}
						includeCardFooter={false}
					/>
				)}

				{tutorials && (
					<ListingSection
						title={`Recent Tutorials`}
						resources={tutorials}
						moreLink={`${channel.url}tutorials/`}
						separator={true}
					/>
				)}

				{tips && (
					<ListingSection
						title={`Recent Tips`}
						resources={tips}
						moreLink={`${channel.url}tips/`}
						separator={false}
					/>
				)}

				{eventPlaylists && (
					<ListingSection
						title={`Past Events`}
						resources={eventPlaylists}
						separator={true}
					/>
				)}
			</BaseLayout>
		);
	}
}

module.exports = DotNetHomepage;
