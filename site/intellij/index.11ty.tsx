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
  { title: "IntelliJ IDEA", url: "https://www.jetbrains.com/idea/" },
  { title: "IDEA Blog", url: "https://blog.jetbrains.com/idea/" },
  { title: "Docs", url: "https://www.jetbrains.com/help/" },
];

class IntelliJHomepage {
  data() {
    return {
      title: "IntelliJ IDEA Guide",
      layout: "",
      resourceType: "channel",
      date: new Date(Date.UTC(2020, 1, 11)),
      author: "hs",
      subnav,
    };
  }

  render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
    const tips = this.getResources({
      resourceType: "tip",
      channel: "/intellij/",
      limit: 3,
    });

    const tutorials = this.getResources({
      resourceType: "tutorial",
      channel: "/intellij/",
      limit: 3,
    });

    const playlists = this.getResources({
      resourceType: "playlist",
      channel: "/intellij/",
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

        <MultiColumnSection>
          <div>
            <p>
              JetBrains tools like IntelliJ IDEA are powerful developer
              productivity tools. What is the best way to learn how to harness
              that power?
            </p>

            <p>
              You can find useful information on our{" "}
              <a href="https://twitter.com/intellijidea"> Twitter page</a>, or
              our <a href="https://blog.jetbrains.com/idea/">product blog</a>.
              Plus, the{" "}
              <a href="https://www.jetbrains.com/idea/">documentation</a> is
              always there to help.
            </p>

            <p>
              We have also created the IntelliJ IDEA Guide, a collection of
              bite-sized visual resources, organized to help spark your
              learning. We hope it helps you get into the flow and excel at what
              you do.
            </p>
          </div>
          <div>
            <h2>Sharing Feedback and Contributing</h2>
            <p>
              The IntelliJ IDEA Guide is also an open project, with{" "}
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
