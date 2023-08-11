// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { LayoutContext, LayoutProps } from "../src/models";
import { PageFrontmatter } from "../_includes/resources/page/PageModels";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import FeaturedResource from "../_includes/pageelements/FeaturedResource.11ty";
import MultiColumnSection from "../_includes/pageelements/MultiColumnSection";
import ListingSection from "../_includes/pageelements/ListingSection.11ty";

export type IndexPageProps = LayoutProps & PageFrontmatter;

export class IndexPage {
  data() {
    return {
      title: "JetBrains Guide",
      subtitle: "Learn about technologies and become a badass developer.", // TODO PAUL
      layout: "",
      eleventyExcludeFromCollections: true,
    };
  }

  render(this: LayoutContext, data: IndexPageProps): JSX.Element {
    const featuredResource = this.getResources({
      resourceType: "tutorial",
      limit: 1,
    })[0];
    const latestContent = this.getResources({ limit: 12 });

    return (
      <BaseLayout {...data}>
        <section class="section has-glow-cold-green">
          <div class="container">
            <div class="columns is-multiline">
              <div class="column is-8">
                <h1 class="mt-2 mb-4 is-size-1 has-text-weight-bold">
                  Welcome to the JetBrains Guide
                </h1>
                <p class="subtitle mb-5 has-text-dark">
                  Learn about technologies and become a badass developer. We
                  have tips, tutorials, videos, articles and much, much more!
                </p>
              </div>
            </div>
          </div>
        </section>
        <FeaturedResource resource={featuredResource}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </p>{" "}
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </FeaturedResource>
        <MultiColumnSection>
          <div>
            <h2>Learn something new, quickly</h2>
            <p>
              JetBrains tools included in the{" "}
              <a href="https://www.jetbrains.com/dotnet/">dotUltimate pack</a>{" "}
              are powerful developer productivity tools. What is the best way to
              learn how to harness that power?
            </p>
            <p>
              You can find useful information on our Twitter accounts,{" "}
              <a href="https://twitter.com/ReSharper">@ReSharper</a> and{" "}
              <a href="https://twitter.com/JetBrainsRider">@JetBrainsRider</a> ,
              or our{" "}
              <a href="https://blog.jetbrains.com/dotnet/">product blog</a>.
              Plus, the{" "}
              <a href="https://www.jetbrains.com/resharper/documentation/documentation.html">
                documentation
              </a>{" "}
              is always there to help. However, wouldn't it be better if you had
              everything you needed to learn in one place?
            </p>
            <p>
              We have created the .NET Tools Guide, a collection of bite-sized
              visual resources, organized to help spark your learning. We hope
              it helps you get into the flow and excel at what you do.
            </p>
          </div>
          <div>
            <h2>Sharing Feedback and Contributing</h2>
            <p>
              The .NET Tools Guide is also an open project, with{" "}
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

        <ListingSection
          title="Latest"
          resources={latestContent}
          moreLink="/latest/"
        />
      </BaseLayout>
    );
  }
}

module.exports = IndexPage;
