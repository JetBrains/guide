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
                <h2 className="subtitle">{data.subtitle}</h2>
              </div>
            </div>
          </section>
          <section className="section has-background-light">
            <div className="container">
              <h2 className="title">Recent Tips &amp; Tutorials</h2>
              <div className="columns">
                <div
                  className="column is-four-fifths-desktop bio-resourcecards"
                  dangerouslySetInnerHTML={{ __html: listing }}
                ></div>
                <div className="column is-one-fifth-desktop is-hidden-touch bio-sidebar-page">
                  <aside className="bd-side bio-page-sidebar">
                    <p className="menu-label bio-page-sidebar-published">
                      Browse...
                    </p>
                    <ul className="menu-list pt-0">
                      <li>
                        <a href="/tutorials/">
                          <span className="icon">
                            <i className="fas fa-arrow-right" />
                          </span>
                          Tutorials
                        </a>
                      </li>
                      <li>
                        <a href="/technologies/">
                          <span className="icon">
                            <i className="fas fa-arrow-right" />
                          </span>
                          Technologies
                        </a>
                      </li>
                      <li>
                        <a href="/topics/">
                          <span className="icon">
                            <i className="fas fa-arrow-right" />
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
