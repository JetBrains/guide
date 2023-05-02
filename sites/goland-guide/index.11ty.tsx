import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import ResourceCard from "../../_includes/resourcecard/ResourceCard.11ty";

export type GoLandHomepageData = LayoutProps & BaseFrontmatter & { subtitle?: string };

export class GoLandHomepage {
  data() {
    return {
      title: "GoLand Guide",
      subtitle: "The Hitchhiker's Guide to GoLand",
      layout: "",
    };
  }

  render(this: LayoutContext, data: GoLandHomepageData): JSX.Element {
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
            style="background: url('/assets/goland_splash.svg') center center; background-repeat: no-repeat; background-size: cover"
          >
            <div class="hero-body">
              <div class="container">
                <h1 class="title">{data.title}</h1>
                <h2 className="subtitle">{data.subtitle}</h2>
              </div>
            </div>
          </section>
          <section className={"section has-background-light"}>
            <div className="bd-main-container container">
              <div className="columns">
                <div className="column is-three-quarters-desktop">
                  <div className="bd-content content">
                    <h2>Learn something new, quickly</h2>

                    <p>JetBrains tools like <a href="https://jetbrains.com/go/">GoLand</a> are
                      powerful developer productivity tools. What is the best way to learn how
                      to harness that power?
                    </p>
                    <p>You can find useful information on our Twitter account, <a
                      href="https://twitter.com/GoLandIDE">@GoLandIDE</a>, or our <a
                      href="https://blog.jetbrains.com/go/">product blog</a>.

                      Plus, the <a href="https://www.jetbrains.com/go/learn/">documentation</a> is
                      always there to help. However, wouldn't it be better if you had everything you
                      needed to learn in one place?</p>

                    <p>We have created the GoLand Guide, a collection of bite-sized visual resources,
                      organized to help spark your learning. We hope it helps you get into the flow
                      and excel at what you do.</p>

                    <h2>Sharing Feedback and Contributing</h2>
                    <p>The GoLand Guide is also an open project, with <a
                      href="https://github.com/jetbrains/guide">a repository in GitHub</a> that
                      hosts all the content. We write all the content in Markdown and render a static site.
                      If you'd like to contribute to it, please refer to the <a
                        href="https://github.com/jetbrains/guide/blob/master/README.md">README</a>&nbsp;for more information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section has-background-light">
            <div className="container">
              <h2 className="title">Recent Tips</h2>
              <div className="columns">
                <div className="column is-four-fifths-desktop bio-resourcecards"
                     dangerouslySetInnerHTML={{ __html: listing }}>
                </div>
                <div className="column is-one-fifth-desktop is-hidden-touch bio-sidebar-page">
                  <aside className="bd-side bio-page-sidebar">
                    <p className="menu-label bio-page-sidebar-published">Browse...</p>
                    <ul className="menu-list pt-0">
                      <li>
                        <a href="/playlists/">
                          <span className="icon">
                            <i className="fas fa-arrow-right" />
                          </span>
                          Playlists
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
                      <li>
                        <a href="/technologies/">
                          <span className="icon">
                            <i className="fas fa-arrow-right" />
                          </span>
                          Technologies
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

module.exports = GoLandHomepage;
