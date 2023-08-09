import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import SectionListing from "../../_includes/pageelements/SectionListing.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";

export type GoLandHomepageData = LayoutProps &
  BaseFrontmatter & {
    subtitle?: string;
  };

export class GoLandHomepage {
  data() {
    return {
      title: "GoLand Guide",
      layout: "",
      eleventyExcludeFromCollections: true,
    };
  }

  render(this: LayoutContext, data: GoLandHomepageData): JSX.Element {
    const tips = this.getResources({
      resourceType: "tip",
      tag: "goland_tip",
      limit: 3,
    });

    const playlists = this.getResources({
      resourceType: "playlist",
      tag: "goland_playlist",
      limit: 3,
    });

    return (
      <BaseLayout {...data}>
        <HeroSection
          title="GoLand Guide"
          subtitle="The Hitchhiker's Guide to GoLand"
          image="/assets/goland_splash.svg"
        />
        {tips && (
          <SectionListing
            title={`Recent Tips`}
            resources={tips}
            moreLink={`/goland/tips/`}
          />
        )}

        <section className="section has-background-grey-lighter">
          <div className="columns">
            <div className="column is-three-quarters-desktop">
              <div className="bd-content content">
                <div className="content">
                  <h2>Learn something new, quickly</h2>

                  <p>
                    JetBrains tools like
                    <a href="https://jetbrains.com/go/">GoLand</a> are powerful
                    developer productivity tools. What is the best way to learn
                    how to harness that power?
                  </p>
                  <p>
                    You can find useful information on our Twitter account,
                    <a href="https://twitter.com/GoLandIDE">@GoLandIDE</a>, or
                    our
                    <a href="https://blog.jetbrains.com/go/">product blog</a>.
                    Plus, the
                    <a href="https://www.jetbrains.com/go/learn/">
                      documentation
                    </a>
                    is always there to help. However, wouldn't it be better if
                    you had everything you needed to learn in one place?
                  </p>

                  <p>
                    We have created the GoLand Guide, a collection of bite-sized
                    visual resources, organized to help spark your learning. We
                    hope it helps you get into the flow and excel at what you
                    do.
                  </p>

                  <h2>Sharing Feedback and Contributing</h2>
                  <p>
                    The GoLand Guide is also an open project, with
                    <a href="https://github.com/jetbrains/guide">
                      a repository in GitHub
                    </a>
                    that hosts all the content. We write all the content in
                    Markdown and render a static site. If you'd like to
                    contribute to it, please refer to the
                    <a href="https://github.com/jetbrains/guide/blob/master/README.md">
                      README
                    </a>
                    &nbsp;for more information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {playlists && (
          <SectionListing
            title={`Recent Playlists`}
            resources={playlists}
            moreLink={`/goland/playlists/`}
          />
        )}
      </BaseLayout>
    );
  }
}

module.exports = GoLandHomepage;
