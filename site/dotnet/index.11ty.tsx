import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import SectionListing from "../../_includes/pageelements/SectionListing.11ty";
import BlockquoteSection from "../../_includes/pageelements/BlockquoteSection.11ty";
import CallToActionSection from "../../_includes/pageelements/CallToActionSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";

export type DotNetHomepageData = LayoutProps &
  BaseFrontmatter & {
    subtitle?: string;
  };

export class DotNetHomepage {
  data() {
    return {
      layout: "",
      eleventyExcludeFromCollections: true,
    };
  }

  render(this: LayoutContext, data: DotNetHomepageData): JSX.Element {
    const tips = this.getResources({
      resourceType: "tip",
      tag: "dotnet_tip",
      limit: 3,
    });

    const playlists = this.getResources({
      resourceType: "playlist",
      tag: "dotnet_playlist",
      limit: 3,
    });

    return (
      <BaseLayout {...data}>
        <HeroSection
          title=".NET Tools Guide"
          subtitle="Learning resources for ReSharper, Rider and more."
          image="/assets/dotnet_splash.png"
        />
        {tips && (
          <SectionListing
            title={`Recent Tips`}
            resources={tips}
            moreLink={`/dotnet/tips/`}
          />
        )}
        <BlockquoteSection
          name="Michael Kennedy"
          title="Host"
          imageSrc="https://www.jetbrains.com/pycharm/img/user-imgs/img-michael-kennedy.png"
        >
          <p className="subtitle has-text-grey">
            I'm in the unique position of asking over 100 industry experts the
            following question on my Talk Python To Me podcast. "When you write
            some Python code, what editor do you open up?" While the answers
            vary, it is frequently PyCharm. The reasons the guests give are
            usually the same reasons I've been a PyCharm advocate for years.
          </p>
          <p className="subtitle has-text-grey">
            That's just a few reasons I open PyCharm daily to build my web
            properties and manage the software that runs my business.
          </p>
        </BlockquoteSection>

        {playlists && (
          <SectionListing
            title={`Recent Playlists`}
            resources={playlists}
            moreLink={`/dotnet/playlists/`}
          />
        )}

        <CallToActionSection
          title="Use your IDE on your favorite cloud platform."
          message="Experience a new compact application that connects you to lorem ipsum garbage stuff hey!"
          url="#"
          imageUrl="https://static.shuffle.dev/uploads/files/30/30bcf69416b378dce9b87d07a3491e56c3e9fdc6/Gateway-1680x1100.webp"
        />
      </BaseLayout>
    );
  }
}

module.exports = DotNetHomepage;
