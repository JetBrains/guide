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
import {
	PLAYLIST_RESOURCE,
	TIP_RESOURCE,
	TUTORIAL_RESOURCE,
} from "../../src/resourceType";
import ResourceCard from "../../_includes/resourcecard/ResourceCard.11ty";

const frontmatter: ChannelFrontmatter = {
	title: "Game Development",
	subtitle: "Learn how to build games with Unity and Unreal Engine.",
	resourceType: "channel",
	date: new Date(Date.UTC(2020, 1, 11)),
	author: "maartenba",
	thumbnail: "thumbnail.png",
	hero: "/assets/gamedev_splash.svg",
	subnav: [
		{ title: "Download", url: "https://www.jetbrains.com/gamedev/" },
		{
			title: "Unity",
			url: "https://blog.jetbrains.com/dotnet/tag/unity/",
		},
		{
			title: "Unreal",
			url: "https://blog.jetbrains.com/dotnet/tag/unreal-engine/",
		},
	],
};

class GameDevHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;

		const unityTutorials = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE],
			channel: channel.url,
			limit: 2,
			customFilter: (r) => r.topics?.includes("unity") == true,
			sorter: (a, b) => (a.date > b.date ? 1 : -1),
		});

		const unrealTutorials = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE],
			channel: channel.url,
			limit: 2,
			customFilter: (r) => r.topics?.includes("unreal") == true,
			sorter: (a, b) => (a.date > b.date ? 1 : -1),
		});

		const tips = this.getResources({
			resourceTypes: [TIP_RESOURCE],
			channel: channel.url,
			limit: 4,
		});

		const eventPlaylists = this.getResources({
			resourceTypes: [PLAYLIST_RESOURCE],
			channel: channel.url,
			limit: 4,
			customFilter: (r) => r.slug.indexOf("day-online") >= 0,
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

				<section className="section has-background-grey-lighter">
					<div className="container">
						<div className="columns">
							<div className="column">
								<h2 className="mt-2 mb-4 is-size-1-desktop is-size-2-touch has-text-weight-bold">
									Learn Unity
								</h2>
								<p className="subtitle has-text-grey mb-5">
									Level up your game development workflow.
								</p>
								{unityTutorials && (
									<div className="columns is-multiline">
										{unityTutorials.map((resource) => {
											return (
												<ResourceCard
													resource={resource}
													columnClassName="is-6"
													includeCardFooter={false}
												></ResourceCard>
											);
										})}
									</div>
								)}
							</div>
							<div className="column">
								<h2 className="mt-2 mb-4 is-size-1-desktop is-size-2-touch has-text-weight-bold">
									Learn Unreal Engine
								</h2>
								<p className="subtitle has-text-grey mb-5">
									Build games with Unreal Engine.
								</p>
								{unrealTutorials && (
									<div className="columns is-multiline">
										{unrealTutorials.map((resource) => {
											return (
												<ResourceCard
													resource={resource}
													columnClassName="is-6"
													includeCardFooter={false}
												></ResourceCard>
											);
										})}
									</div>
								)}
							</div>
						</div>
					</div>
				</section>

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

module.exports = GameDevHomepage;
