import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import SectionListing from "../../_includes/pageelements/SectionListing.11ty";
import BlockquoteSection from "../../_includes/pageelements/BlockquoteSection.11ty";

export type DotNetHomepageData = LayoutProps &
  BaseFrontmatter & {
    subtitle?: string;
  };

export class DotNetHomepage {
  data() {
    return {
      title: ".NET Tools Guide",
      subtitle: "Learning resources for ReSharper, Rider and more.",
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
    const tutorials = this.getResources({
      resourceType: "tutorial",
      tag: "dotnet_tip",
      limit: 3,
    });

    return (
      <BaseLayout {...data}>
        <section
          class="hero is-medium"
          style="background: url('/assets/dotnet_splash.png') center center; background-repeat: no-repeat; background-size: cover"
        >
          <div class="hero-body">
            <div class="container">
              <h1 class="mt-2 mb-4 is-size-1 has-text-weight-bold">
                {data.title}
              </h1>
              <p class="subtitle has-text-grey mb-5">{data.subtitle}</p>
            </div>
          </div>
        </section>
        {tips && (
          <SectionListing
            title={`Recent Tips`}
            resources={tips}
            moreLink={`/dotnet/tips/`}
          />
        )}
        {tips && (
          <SectionListing
            title={`Recent Tips`}
            resources={tips}
            moreLink={`/dotnet/tips/`}
            separator={true}
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

        {tutorials && (
          <SectionListing
            title={`Recent Tutorials`}
            resources={tutorials}
            moreLink={`/dotnet/tutorials/`}
          />
        )}
      </BaseLayout>
    );
  }
}

module.exports = DotNetHomepage;
