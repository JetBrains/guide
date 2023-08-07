import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import SectionListing from "../../_includes/sectionlisting/SectionListing.11ty";

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
              <h1 class="title">{data.title}</h1>
              <p class="subtitle">{data.subtitle}</p>
            </div>
          </div>
        </section>
        <SectionListing
          title={`Recent Tips`}
          resources={tips}
          moreLink={`/dotnet/tips/`}
        />
        <section class="container">
          <hr />
        </section>
        <SectionListing
          title={`Recent Tutorials`}
          resources={tutorials}
          moreLink={`/dotnet/tutorials/`}
        />
      </BaseLayout>
    );
  }
}

module.exports = DotNetHomepage;
