import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import ListingSection from "../../_includes/pageelements/ListingSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";

export type WebStormHomepageData = LayoutProps &
  BaseFrontmatter & {
    subtitle?: string;
  };

export class WebStormHomepage {
  data() {
    return {
      title: "WebStorm Guide",
      layout: "",
      eleventyExcludeFromCollections: true,
    };
  }

  render(this: LayoutContext, data: WebStormHomepageData): JSX.Element {
    const tips = this.getResources({
      resourceType: "tip",
      tag: "webstorm_tip",
      limit: 3,
    });

    const tutorials = this.getResources({
      resourceType: "tutorial",
      tag: "webstorm_tutorial",
      limit: 3,
    });

    return (
      <BaseLayout {...data}>
        <HeroSection
          title="WebStorm Guide"
          subtitleExtraClass="has-text-black"
          subtitle="Using WebStorm or any other JetBrains IDE with JavaScript support? Explore a collection of learning resources to increase your
        productivity and start making amazing JavaScript apps faster."
          image="/assets/webstorm-beam.svg"
        />
        {tips && (
          <ListingSection
            title={`Recent Tips`}
            resources={tips}
            moreLink={`/webstorm/tips/`}
          />
        )}
        <section className="section has-background-grey-lighter">
          <div class="container">
            <div className="columns">
              <div className="column is-three-quarters-desktop">
                <div className="bd-content content">
                  <div className="content">
                    <p>
                      Have you ever found a tip about how to do a specific thing
                      in a JetBrains IDE faster and caught yourself thinking,
                      “Wow, I didn’t know about that, I wonder what other
                      productivity boosters I’ve missed?”
                    </p>
                    <p>
                      You can find some information about such productivity
                      boosters on
                      <a href="https://twitter.com/WebStormIDE">Twitter</a> or
                      our
                      <a href="https://blog.jetbrains.com/webstorm/">
                        product blog
                      </a>
                      . Plus, the
                      <a href="https://www.jetbrains.com/help/webstorm/meet-webstorm.html">
                        documentation
                      </a>
                      is always there to help. For those who don’t have much
                      time to learn but still want to get better at what they
                      do, we’ve created the WebStorm Guide. The Guide comprises
                      a collection of bite-sized visual resources, organized to
                      help spark your learning.
                    </p>
                    <p>
                      Despite the name of the Guide,
                      <strong>
                        the information in it is also applicable to other
                        JetBrains IDEs
                      </strong>
                      that have JavaScript support, including PyCharm
                      Professional, GoLand, and IntelliJ IDEA Ultimate.
                    </p>
                    <h2>Sharing Feedback and Contributing</h2>
                    <p>
                      If you have any ideas about how to make this Guide better
                      or want to share your feedback with us, feel free to fill
                      out
                      <a href="https://forms.gle/eenYd4sngtV4rQ3f7">
                        this short survey
                      </a>
                      .
                      <a href="https://github.com/jetbrains/guide/issues">
                        If you want to report an issue, you can do it here
                      </a>
                      .
                    </p>
                    <p>
                      The WebStorm Guide is also an open project, with
                      <a href="https://github.com/jetbrains/guide">
                        a repository in GitHub
                      </a>
                      that hosts all the content. We write all the content in
                      Markdown and use Gatsby to render a static site.
                      <strong style="padding-left: 0.2rem; padding-right: 0.2rem">
                        We encourage you to contribute to the Guide if you have
                        any ideas!
                      </strong>
                      Please refer to the
                      <a href="https://github.com/jetbrains/guide/blob/master/README.md">
                        README
                      </a>
                      for more information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {tutorials && (
          <ListingSection
            title={`Recent Tutorials`}
            resources={tutorials}
            moreLink={`/webstorm/playlists/`}
            separator={true}
          />
        )}
      </BaseLayout>
    );
  }
}

module.exports = WebStormHomepage;
