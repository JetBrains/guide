import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";

export type WebStormHomepageData = LayoutProps & BaseFrontmatter;

export class WebStormHomepage {
  data() {
    return {
      title: "WebStorm Guide",
      subtitle: "Learning resources",
      layout: "",
    };
  }

  render(this: LayoutContext, data: WebStormHomepageData): JSX.Element {
    return (
      <BaseLayout {...data}>
        <div class="content">
          <section
            class="hero is-medium"
            style="background: url('/assets/webstorm-beam.svg') center center; background-repeat: no-repeat; background-size: cover"
          >
            <div class="hero-body">
              <div class="container">
                <h1 class="title">{data.title}</h1>
                <div class="columns">
                  <div class="column is-two-thirds">
                    <p class="is-size-4">
                      Using WebStorm or any other JetBrains IDE with
                      <a
                        style="padding-left: 0.3em"
                        href="https://www.jetbrains.com/products.html#lang=js"
                      >
                        JavaScript support
                      </a>
                      ? Explore a collection of learning resources to increase
                      your productivity and start making amazing JavaScript apps
                      faster.
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
                  To start learning, simply jump to the section you find most
                  interesting from three categories:
                </div>

                <div class="container" style="margin-top: 2rem">
                  <div class="columns">
                    <div class="column">
                      <div class="card">
                        <div class="card-content">
                          <div class="media">
                            <div class="media-content">
                              <a href="/technologies/">
                                <h1 class="is-size-4">Technologies</h1>
                              </a>
                            </div>
                          </div>
                          <div class="content">
                            <p class="is-size-5">
                              Jump to all tips and tricks grouped by language,
                              library, and framework.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="card">
                        <div class="card-content">
                          <div class="media">
                            <div class="media-content">
                              <a href="/topics/">
                                <h1 class="is-size-4">Topics</h1>
                              </a>
                            </div>
                          </div>
                          <div class="content">
                            <p class="is-size-5">
                              Explore a collection of tips organized by topic,
                              such as debugging or code editing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <div class="card">
                        <div class="card-content">
                          <div class="media">
                            <div class="media-content">
                              <a href="/tutorials/">
                                <h1 class="is-size-4">Tutorials</h1>
                              </a>
                            </div>
                          </div>
                          <div class="content">
                            <p class="is-size-5">
                              Go through detailed lessons to learn how to work
                              with specific technologies.
                            </p>
                          </div>
                        </div>
                      </div>
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

module.exports = WebStormHomepage;
