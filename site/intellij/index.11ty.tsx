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
      eleventyExcludeFromCollections: true,
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
            <div class="hero-body">
              <div class="container">
                <h1 class="title" style="color: white;">
                  {data.title}
                </h1>
                <div class="columns">
                  <div class="column is-two-thirds">
                    <p class="is-size-4" style="color: white;">
                      Find out how you can be more productive with a series of
                      tips and tricks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="section has-background-light">
            <div class="container">
              <h1 class="title">Learn Something New Quickly</h1>
              <div>
                <div class="is-size-5">
                  To start learning, jump to the section you find most
                  interesting from two broad categories:
                </div>

                <div class="container" style="margin-top: 2rem">
                  <div class="columns">
                    <div class="column">
                      <a href="/tips/">
                        <div class="card">
                          <div class="card-content">
                            <div class="media">
                              <div class="media-content">
                                <h1 class="is-size-4">Tips</h1>
                              </div>
                            </div>
                            <div class="content">
                              <p class="is-size-5">
                                Go through handy tips and tricks grouped by
                                topics and technologies.
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="column">
                      <a href="/tutorials/">
                        <div class="card">
                          <div class="card-content">
                            <div class="media">
                              <div class="media-content">
                                <h1 class="is-size-4">Tutorials</h1>
                              </div>
                            </div>
                            <div class="content">
                              <p class="is-size-5">
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
