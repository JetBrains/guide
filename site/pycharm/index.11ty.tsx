import h, { JSX } from "vhtml";
import { LayoutContext } from "../../src/models";
import ListingSection from "../../_includes/pageelements/ListingSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";
import {
  ChannelFrontmatter,
  ChannelHomepageData,
} from "../../_includes/resources/channel/ChannelModels";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";

const subnav: ChannelFrontmatter["subnav"] = [
  { title: "PyCharm", url: "https://www.jetbrains.com/pycharm/" },
  { title: "IDEA Blog", url: "https://blog.jetbrains.com/pycharm/" },
  { title: "Docs", url: "https://www.jetbrains.com/help/" },
];

class PyCharmHomepage {
  data() {
    return {
      title: "PyCharm Guide",
      layout: "",
      resourceType: "channel",
      date: new Date(Date.UTC(2020, 1, 11)),
      author: "pwe",
      subnav,
    };
  }

  render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
    const tips = this.getResources({
      resourceType: "tip",
      channel: "/pycharm/",
      limit: 3,
    });

    const tutorials = this.getResources({
      resourceType: "tutorial",
      channel: "/pycharm/",
      limit: 3,
    });

    const playlists = this.getResources({
      resourceType: "playlist",
      channel: "/pycharm/",
      limit: 3,
    });

    return (
      <BaseLayout {...data}>
        <HeroSection
          title="PyCharm Guide"
          subtitle="Well-organized collection of learning resources for PyCharm."
          image="/assets/pycharm_splash.svg"
        />
        {tips && (
          <ListingSection
            title={`Recent Tips`}
            resources={tips}
            moreLink={`/pycharm/tips/`}
          />
        )}
        {tutorials && (
          <ListingSection
            title={`Recent Tutorials`}
            resources={tutorials}
            moreLink={`/pycharm/tutorials/`}
            separator={true}
          />
        )}
        {playlists && (
          <ListingSection
            title={`Recent Playlists`}
            resources={playlists}
            moreLink={`/pycharm/playlists/`}
            separator={true}
          />
        )}
      </BaseLayout>
    );
  }
}

module.exports = PyCharmHomepage;
