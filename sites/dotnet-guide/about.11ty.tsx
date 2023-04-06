// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";

export type DotNetAboutData = LayoutProps & BaseFrontmatter & { subtitle: string };

export class DotNetAbout {
  data() {
    return {
      title: "About",
      subtitle: "About the .NET Tools Guide",
      layout: "",
    };
  }

  render(this: LayoutContext, data: DotNetAboutData): JSX.Element {
    // don't let prettier mess this content up by stripping spaces
    // prettier-ignore
    return (
      <BaseLayout {...data}>
        <main className="bd-main bulmaio-body">
          <div
            className="bd-main-container container"
            style="margin-bottom: 2rem"
          >
            <header
              className="bd-header"
              style="background: url('/assets/dotnet_splash.png') center center; background-repeat: no-repeat; background-size: cover"
            >
              <article className="media">
                <div className="media-content">
                  <div className="content">
                    <div className="bd-header-titles">
                      <h1 className="title">{data.title}</h1>
                      <p className="subtitle is-4">{data.subtitle}</p>
                    </div>
                  </div>
                </div>
              </article>
            </header>

            <div className="columns">
              <div className="column is-three-quarters-desktop">
                <div className="bd-content content">
                  <div className="content">
                    <h2>Learn something new, quickly</h2>
                    <p>JetBrains tools included in the <a href="https://www.jetbrains.com/dotnet/">dotUltimate pack</a> are powerful developer productivity tools. What is the best way to learn how to harness that power?</p>
                    <p>You can find useful information on our Twitter accounts, <a href="https://twitter.com/ReSharper">@ReSharper</a> and
                      <a href="https://twitter.com/JetBrainsRider">@JetBrainsRider</a>, or our <a
                        href="https://blog.jetbrains.com/dotnet/">product blog</a>.

                      Plus, the <a href="https://www.jetbrains.com/resharper/documentation/documentation.html">documentation</a> is
                      always there to help. However, wouldn't it be better if you had everything you needed to learn in one place?</p>
                    <p>We have created the .NET Tools Guide, a collection of bite-sized visual resources, organized to help spark your
                      learning. We hope it helps you get into the flow and excel at what you do.</p>
                    <h2>Sharing Feedback and Contributing</h2>
                    <p>The .NET Tools Guide is also an open project, with <a href="https://github.com/JetBrains/jetbrains_guide">a repository in GitHub</a> that
                      hosts all the content. We write all the content in Markdown and render a static site. If you'd like to contribute to it,
                      please refer to the <a href="https://github.com/JetBrains/jetbrains_guide/blob/master/README.md">README</a> for more information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </BaseLayout>
    );
  }
}

module.exports = DotNetAbout;
