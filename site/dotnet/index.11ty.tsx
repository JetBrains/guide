import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import ResourceCard from "../../_includes/resourcecard/ResourceCard.11ty";

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
    const tips = this.getResources().slice(0, 15);
    const listing = (
      <>
        {tips.map((tip) => {
          return <ResourceCard resource={tip}></ResourceCard>;
        })}
      </>
    );
    return (
      <BaseLayout {...data}>
        <div class="content">
          <section
            class="hero is-medium"
            style="background: url('/assets/dotnet_splash.png') center center; background-repeat: no-repeat; background-size: cover"
          >
            <div class="hero-body">
              <div class="container">
                <h1 class="title">{data.title}</h1>
                <h2 class="subtitle">{data.subtitle}</h2>
              </div>
            </div>
          </section>
          <section class="section has-background-light">
            <div class="container">
              <h2 class="title">Recent Tips &amp; Tutorials</h2>
              <div class="columns">
                <div
                  class="column is-four-fifths-desktop bio-resourcecards"
                  dangerouslySetInnerHTML={{ __html: listing }}
                ></div>
                <div class="column is-one-fifth-desktop is-hidden-touch bio-sidebar-page">
                  <aside class="bd-side bio-page-sidebar">
                    <p class="menu-label bio-page-sidebar-published">
                      Browse...
                    </p>
                    <ul class="menu-list pt-0">
                      <li>
                        <a href="/tutorials/">
                          <span class="icon">
                            <i class="fas fa-arrow-right" />
                          </span>
                          Tutorials
                        </a>
                      </li>
                      <li>
                        <a href="/technologies/">
                          <span class="icon">
                            <i class="fas fa-arrow-right" />
                          </span>
                          Technologies
                        </a>
                      </li>
                      <li>
                        <a href="/topics/">
                          <span class="icon">
                            <i class="fas fa-arrow-right" />
                          </span>
                          Topics
                        </a>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
          </section>
        </div>
      </BaseLayout>
    );
  }
}

module.exports = DotNetHomepage;
