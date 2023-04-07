// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";

export type IntellijAboutData = LayoutProps &
  BaseFrontmatter & { subtitle: string };

export class IntellijAbout {
  data() {
    return {
      title: "About",
      subtitle: "About the IntelliJ Guide",
      layout: "",
    };
  }

  render(this: LayoutContext, data: IntellijAboutData): JSX.Element {
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
                            style="background: url('/assets/intellij-splash.svg') center center; background-repeat: no-repeat; background-size: cover"
                        >
                            <article class="media">
                                <div class="media-content">
                                    <div class="content">
                                        <div class="bd-header-titles">
                                            <h1 class="title">{data.title}</h1>
                                            <p class="subtitle is-4">{data.subtitle}</p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </header>

                        <div class="columns">
                            <div class="column is-three-quarters-desktop">
                                <div class="bd-content content">
                                    <div class="content">
                                        <p>JetBrains tools like IntelliJ IDEA are powerful developer productivity tools.
                                            What is the best way to learn how to harness that power?</p>

                                        <p>You can find useful information on our <a
                                            href="https://twitter.com/intellijidea"> Twitter page</a>, or our <a
                                            href="https://blog.jetbrains.com/idea/">product blog</a>. Plus, the <a
                                            href="https://www.jetbrains.com/idea/">documentation</a> is always there to
                                            help.</p>

                                        <p>We have also created the IntelliJ IDEA Guide, a collection of bite-sized
                                            visual resources, organized to help spark your learning. We hope it helps
                                            you get into the flow and excel at what you do.</p>
                                        <h2>Sharing Feedback and Contributing</h2>
                                        <p>The IntelliJ IDEA Guide is also an open project, with <a
                                            href="https://github.com/jetbrains/guide">a repository in
                                            GitHub</a> that
                                            hosts all the content. We write all the content in Markdown and render a
                                            static site. If you'd like to contribute to it,
                                            please refer to the <a
                                                href="https://github.com/jetbrains/guide/blob/master/README.md">README</a> for
                                            more information.
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

module.exports = IntellijAbout;
