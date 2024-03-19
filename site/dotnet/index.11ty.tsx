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
import {
	PLAYLIST_RESOURCE,
	TIP_RESOURCE,
	TUTORIAL_RESOURCE,
	TUTORIAL_STEP_RESOURCE,
} from "../../src/resourceType";

const frontmatter: ChannelFrontmatter = {
	title: ".NET",
	subtitle:
		"A learning journey into .NET\nand tools like ReSharper, Rider and more.",
	resourceType: "channel",
	date: new Date(Date.UTC(2023, 10, 3)),
	author: "maartenba",
	logo: "thumbnail.png",
	hero: "/assets/splashes/dotnet.svg",
	subnav: [
		{ title: "Downloads", url: "https://www.jetbrains.com/dotnet/" },
		{ title: "Blog", url: "https://blog.jetbrains.com/dotnet/" },
		{ title: "Docs", url: "https://www.jetbrains.com/help/" },
	],
};

export default class DotNetHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;

		const topics = this.getResources({
			resourceTypes: "topic",
			channel: channel.url,
			limit: 6,
			customFilter: (r) =>
				r.label != undefined &&
				(r.label.indexOf("blazor") >= 0 ||
					r.label.indexOf("csharp") >= 0 ||
					r.label.indexOf("fsharp") >= 0 ||
					r.label.indexOf(".net") >= 0 ||
					r.label.indexOf("asp.net") >= 0),
		});

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

		const profilingContent = this.getResources({
			resourceTypes: [TIP_RESOURCE, TUTORIAL_RESOURCE, TUTORIAL_STEP_RESOURCE],
			limit: 4,
			customFilter: (r) =>
				r.topics?.includes(".net") == true &&
				r.topics?.includes("profiling") == true,
			sorter: (a, b) =>
				a.slug.indexOf("rider-profiling") >= 0 || a.date > b.date ? -1 : 1,
		});

		const eventPlaylists = this.getResources({
			resourceTypes: [PLAYLIST_RESOURCE],
			channel: channel.url,
			limit: 4,
			customFilter: (r) =>
				r.slug.indexOf("day-online") >= 0 || r.slug.indexOf("days-online") >= 0,
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
				<MultiColumnSection>
					<div class="columns is-multiline is-centered">
						{topics.map((topic) => {
							let figure: JSX.Element;
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
								<div class="column mb-1 is-6 is-2-desktop py-5 has-box-hover has-text-centered has-position-relative">
									<a
										href={topic.url}
										aria-label={`Topic`}
										class="is-size-5 has-text-weight-bold title is-stretched-link"
									>
										<figure class="image is-48x48 mb-1 mx-auto">
											{figure}
										</figure>
										{topic.title}
									</a>
								</div>
							);
						})}
					</div>
				</MultiColumnSection>

				{aspNetTutorials && (
					<ListingSection
						title={`Learn ASP.NET Core`}
						subtitle={`Tutorials that help you build amazing web experiences with .NET.`}
						resources={aspNetTutorials}
						moreLink={`${channel.url}technologies/asp.net/`}
						separator={false}
						includeCardFooter={false}
					/>
				)}

				{refactoringTips && (
					<ListingSection
						title={`Learn about refactoring`}
						resources={refactoringTips}
						moreLink={`/tags/refactoring/`}
						separator={true}
						includeCardFooter={false}
					/>
				)}

				{profilingContent && (
					<ListingSection
						title={`Make your .NET apps faster!`}
						resources={profilingContent}
						moreLink={`/tags/profiling/`}
						separator={false}
						includeCardFooter={false}
						includeContentType={true}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{tutorials && (
					<ListingSection
						title={`Latest tutorials`}
						resources={tutorials}
						moreLink={`${channel.url}tutorials/`}
						separator={false}
					/>
				)}

				{tips && (
					<ListingSection
						title={`Latest tips`}
						resources={tips}
						moreLink={`${channel.url}tips/`}
						separator={false}
					/>
				)}

				{eventPlaylists && (
					<ListingSection
						title={`Event recordings`}
						resources={eventPlaylists}
						separator={false}
						includeCardFooter={false}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}
			</BaseLayout>
		);
	}
}
