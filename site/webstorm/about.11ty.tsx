// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";

export type WebStormAboutData = LayoutProps & BaseFrontmatter;

export class WebStormAbout {
  data() {
    return {
      title: "WebStorm Guide",
      subtitle: "About the WebStorm Guide",
      layout: "",
      eleventyExcludeFromCollections: true,
    };
  }

  render(this: LayoutContext, data: WebStormAboutData): JSX.Element {
    // don't let prettier mess this content up by stripping spaces
    // prettier-ignore
    return (
      <BaseLayout {...data}>
        <main class="bd-main bulmaio-body">
          <div
            class="bd-main-container container"
            style="margin-bottom: 2rem"
          >
            <header
              class="bd-header"
              style="background: url('/assets/webstorm-beam.svg') center center; background-repeat: no-repeat; background-size: cover"
            >
              <article class="media">
                <div class="media-content">
                  <div class="content">
                    <div class="bd-header-titles">
                      <h1 class="title">{data.title}</h1>
                    </div>
                  </div>
                </div>
              </article>
            </header>

            <div class="columns">
              <div class="column is-three-quarters-desktop">
                <div class="bd-content content">
                  <div class="content">
                    <p>
                      Have you ever found a tip about how to do a specific thing in a JetBrains IDE faster and caught yourself thinking, “Wow, I didn’t know about that, I wonder what other productivity boosters I’ve missed?”
                    </p>
                    <p>
                      You can find some information about such productivity boosters on <a href="https://twitter.com/WebStormIDE">Twitter</a> or our <a href="https://blog.jetbrains.com/webstorm/">product blog</a>. Plus, the <a href="https://www.jetbrains.com/help/webstorm/meet-webstorm.html">documentation</a> is always there to help. For those who don’t have much time to learn but still want to get better at what they do, we’ve created the WebStorm Guide. The Guide comprises a collection of bite-sized visual resources, organized to help spark your learning.
                    </p>
                    <p>
                      Despite the name of the Guide, <strong>the information in it is also applicable to other JetBrains IDEs</strong> that have JavaScript support, including PyCharm Professional, GoLand, and IntelliJ IDEA Ultimate.
                    </p>
                    <h2>Sharing Feedback and Contributing</h2>
                    <p>
                      If you have any ideas about how to make this Guide better or want to share your feedback with us, feel free to fill out <a href="https://forms.gle/eenYd4sngtV4rQ3f7">this short survey</a>. <a href="https://github.com/jetbrains/guide/issues">If you want to report an issue, you can do it here</a>.
                    </p>
                    <p>
                      The WebStorm Guide is also an open project, with <a href="https://github.com/jetbrains/guide">a repository in GitHub</a>
                      that hosts all the content. We write all the content in Markdown and use Gatsby to render a static site.
                      <strong style="padding-left: 0.2rem; padding-right: 0.2rem">We encourage you to contribute to the Guide if you have any ideas!</strong> Please refer to the <a href="https://github.com/jetbrains/guide/blob/master/README.md">README</a> for more information.
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

module.exports = WebStormAbout;
