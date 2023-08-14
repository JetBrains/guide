import h, { JSX } from "vhtml";
import { LayoutContext } from "../../src/models";
import ListingSection from "../../_includes/pageelements/ListingSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";
import {
  ChannelFrontmatter,
  ChannelHomepageData,
} from "../../_includes/resources/channel/ChannelModels";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import MultiColumnSection from "../../_includes/pageelements/MultiColumnSection";

const subnav: ChannelFrontmatter["subnav"] = [
  { title: "GoLand", url: "https://www.jetbrains.com/go/" },
  { title: "Go Blog", url: "https://blog.jetbrains.com/go/" },
  { title: "Docs", url: "https://www.jetbrains.com/help/" },
];

class GoLandHomepage {
  data() {
    return {
      title: "GoLand Guide",
      layout: "",
      resourceType: "channel",
      date: new Date(Date.UTC(2020, 1, 11)),
      author: "pwe",
      subnav,
    };
  }

  render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
    const tips = this.getResources({
      resourceType: "tip",
      channel: "/goland/",
      limit: 3,
    });

    const playlists = this.getResources({
      resourceType: "playlist",
      channel: "/goland/",
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
          <ListingSection
            title={`Recent Tips`}
            resources={tips}
            moreLink={`/goland/tips/`}
          />
        )}
        <MultiColumnSection>
          <div>
            <h2>Learn something new, quickly</h2>

            <p>
              JetBrains tools like{" "}
              <a href="https://jetbrains.com/go/">GoLand</a> are powerful
              developer productivity tools. What is the best way to learn how to
              harness that power?
            </p>
            <p>
              You can find useful information on our Twitter account,{" "}
              <a href="https://twitter.com/GoLandIDE">@GoLandIDE</a> , or our{" "}
              <a href="https://blog.jetbrains.com/go/">product blog</a>. Plus,
              the{" "}
              <a href="https://www.jetbrains.com/go/learn/">documentation</a> is
              always there to help. However, wouldn't it be better if you had
              everything you needed to learn in one place?
            </p>

            <p>
              We have created the GoLand Guide, a collection of bite-sized
              visual resources, organized to help spark your learning. We hope
              it helps you get into the flow and excel at what you do.
            </p>
          </div>
          <div>
            <h2>Sharing Feedback and Contributing</h2>
            <p>
              The GoLand Guide is also an open project, with{" "}
              <a href="https://github.com/jetbrains/guide">
                a repository in GitHub
              </a>{" "}
              that hosts all the content. We write all the content in Markdown
              and render a static site. If you'd like to contribute to it,
              please refer to the{" "}
              <a href="https://github.com/jetbrains/guide/blob/master/README.md">
                README
              </a>{" "}
              for more information.
            </p>
          </div>
        </MultiColumnSection>

        {playlists && (
          <ListingSection
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
