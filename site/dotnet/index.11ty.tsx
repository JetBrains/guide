import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import SectionListing from "../../_includes/sectionlisting/SectionListing.11ty";

type DotNetHomepageData = LayoutProps &
  BaseFrontmatter & {
    subtitle?: string;
  };

class DotNetHomepage {
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
    }).slice(0, 3);
    const tutorials = this.getResources({
      resourceType: "tutorial",
      tag: "dotnet_tip",
    }).slice(0, 3);

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
        {tutorials.length !== 0 ? (
          <>
            <section class="container">
              <hr />
            </section>
            <SectionListing
              title={`Recent Tutorials`}
              resources={tutorials}
              moreLink={`/dotnet/tutorials/`}
            />
          </>
        ) : (
          ""
        )}
      </BaseLayout>
    );
  }
}

module.exports = DotNetHomepage;
