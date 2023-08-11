import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import ListingSection from "../../_includes/pageelements/ListingSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";

export type PyCharmHomepageData = LayoutProps &
  BaseFrontmatter & {
    subtitle?: string;
  };

export class PyCharmHomepage {
  data() {
    return {
      title: "PyCharm Guide",
      layout: "",
      eleventyExcludeFromCollections: true,
    };
  }

  render(this: LayoutContext, data: PyCharmHomepageData): JSX.Element {
    const tips = this.getResources({
      resourceType: "tip",
      tag: "pycharm_tip",
      limit: 3,
    });

    const tutorials = this.getResources({
      resourceType: "tutorial",
      tag: "pycharm_tutorial",
      limit: 3,
    });

    const playlists = this.getResources({
      resourceType: "playlist",
      tag: "pycharm_playlist",
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
