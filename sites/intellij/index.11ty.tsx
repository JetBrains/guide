import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";

export type IntelliJHomepageData = LayoutProps &
  BaseFrontmatter & { subtitle?: string };

export class IntelliJHomepage {
  data() {
    return {
      title: "IntelliJ IDEA Guide",
      subtitle:
        "Learning resources for IntelliJ IDEA and related technologies.",
      layout: "",
    };
  }

  render(this: LayoutContext, data: IntelliJHomepageData): JSX.Element {
    return (
      <BaseLayout {...data}>
        <div class="content">
          <section
            class="hero is-medium"
            style="background: url('/assets/intellij-idea-beam.svg') center center; background-repeat: no-repeat; background-size: cover;"
          >
            <div className="hero-body">
              <div className="container">
                <h1 className="title" style="color: white;">{data.title}</h1>
                <div className="columns">
                  <div className="column is-two-thirds">
                    <p className="is-size-4" style="color: white;">
                      Find out how you can be more productive with a series of
                      tips and tricks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section has-background-light">
            <div className="container">
              <h1 className="title">Learn Something New Quickly</h1>
              <div>
                <div className="is-size-5">
                  To start learning, jump to the section you find most
                  interesting from two broad categories:
                </div>

                <div className="container" style="margin-top: 2rem">
                  <div className="columns">
                    <div className="column">
                      <a href="/tips/">
                        <div className="card">
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <h1 className="is-size-4">Tips</h1>
                              </div>
                            </div>
                            <div className="content">
                              <p className="is-size-5">
                                Go through handy tips and tricks grouped by
                                topics and technologies.
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div className="column">
                      <a href="/tutorials/">
                        <div className="card">
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <h1 className="is-size-4">Tutorials</h1>
                              </div>
                            </div>
                            <div className="content">
                              <p className="is-size-5">
                                Explore our step-by-step tutorials grouped by
                                topics and technologies.
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </BaseLayout>
    );
  }
}

module.exports = IntelliJHomepage;
