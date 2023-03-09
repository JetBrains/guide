import h, { JSX } from "vhtml";
import { BaseLayout } from "./BaseLayout.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { BaseFrontmatter } from "../../src/ResourceModels";
import ResourceCard from "../resourcecard/ResourceCard.11ty";

export type HomepageLayoutData = LayoutProps & BaseFrontmatter;

export function HomepageLayout(
  this: LayoutContext,
  data: HomepageLayoutData
): JSX.Element {
  const splashStyle = `background: url("/assets/pycharm_splash.svg") center center; backgroundRepeat: 'no-repeat'; backgroundSize: 1500`;
  const tips = this.getResources("tip").slice(0, 10);
  const listing = (
    <>
      {tips.map((tip) => {
        return <ResourceCard resource={tip}></ResourceCard>;
      })}
    </>
  );
  return (
    <BaseLayout {...data}>
      <div className="content">
        <section className="hero is-medium" style={`${splashStyle}`}>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">PyCharm Guide</h1>
              <h2 className="subtitle">
                Well-organized collection of learning resources for PyCharm
              </h2>
            </div>
          </div>
        </section>
        <section className="section has-background-light">
          <div className="container">
            <h2 className="title">Recent Tips</h2>
            <div className="columns">
              <div
                className="column is-four-fifths-desktop bio-resourcecards"
                dangerouslySetInnerHTML={{ __html: listing }}
              ></div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  );
}

export const render = HomepageLayout;
