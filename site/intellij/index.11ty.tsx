import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import ListingSection from "../../_includes/pageelements/ListingSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";

export type IntelliJHomepageData = LayoutProps &
  BaseFrontmatter & {
    subtitle?: string;
  };

export class IntelliJHomepage {
  data() {
    return {
      title: "IntelliJ IDEA Guide",
      layout: "",
      eleventyExcludeFromCollections: true,
    };
  }

  render(this: LayoutContext, data: IntelliJHomepageData): JSX.Element {
    const tips = this.getResources({
      resourceType: "tip",
      tag: "intellij_tip",
      limit: 3,
    });

    const tutorials = this.getResources({
      resourceType: "tutorial",
      tag: "intellij_tutorial",
      limit: 3,
    });

    const playlists = this.getResources({
      resourceType: "playlist",
      tag: "intellij_playlist",
      limit: 3,
    });

    return (
      <BaseLayout {...data}>
        <HeroSection
          title="IntelliJ IDEA Guide"
          titleExtraClass="has-text-white"
          subtitle="Learning resources for IntelliJ IDEA and related technologies."
          subtitleExtraClass="has-text-light"
          image="/assets/intellij-idea-beam.svg"
        />
        {tips && (
          <ListingSection
            title={`Recent Tips`}
            resources={tips}
            moreLink={`/intellij/tips/`}
          />
        )}
        <section class="section has-background-grey-lighter">
          <div class="container">
            <div class="columns">
              <div class="column is-three-quarters-desktop">
                <div class="content">
                  <p>
                    JetBrains tools like IntelliJ IDEA are powerful developer
                    productivity tools. What is the best way to learn how to
                    harness that power?
                  </p>

                  <p>
                    You can find useful information on our{" "}
                    <a href="https://twitter.com/intellijidea"> Twitter page</a>
                    , or our{" "}
                    <a href="https://blog.jetbrains.com/idea/">product blog</a>.
                    Plus, the{" "}
                    <a href="https://www.jetbrains.com/idea/">documentation</a>{" "}
                    is always there to help.
                  </p>

                  <p>
                    We have also created the IntelliJ IDEA Guide, a collection
                    of bite-sized visual resources, organized to help spark your
                    learning. We hope it helps you get into the flow and excel
                    at what you do.
                  </p>
                  <h2>Sharing Feedback and Contributing</h2>
                  <p>
                    The IntelliJ IDEA Guide is also an open project, with{" "}
                    <a href="https://github.com/jetbrains/guide">
                      a repository in GitHub
                    </a>{" "}
                    that hosts all the content. We write all the content in
                    Markdown and render a static site. If you'd like to
                    contribute to it, please refer to the{" "}
                    <a href="https://github.com/jetbrains/guide/blob/master/README.md">
                      README
                    </a>{" "}
                    for more information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {tutorials && (
          <ListingSection
            title={`Recent Tutorials`}
            resources={tutorials}
            moreLink={`/intellij/playlists/`}
          />
        )}
        {playlists && (
          <ListingSection
            title={`Recent Playlists`}
            resources={playlists}
            moreLink={`/intellij/playlists/`}
            separator={true}
          />
        )}
      </BaseLayout>
    );
  }
}

module.exports = IntelliJHomepage;
