import h, {JSX} from "vhtml";
import {LayoutContext, LayoutProps} from "../../src/models";
import {PageFrontmatter} from "../resources/page/PageModels";
import {BaseLayout} from "./BaseLayout.11ty";

export type HomepageLayoutProps = LayoutProps & PageFrontmatter;

export function HomepageLayout(
    this: LayoutContext,
    data: HomepageLayoutProps
): JSX.Element {
    return (
        <BaseLayout {...data}>
            <section className="section">
                <div className="container">
                    <main class="content">
                        <div dangerouslySetInnerHTML={{__html: data.content}}/>
                    </main>
                </div>
            </section>
        </BaseLayout>
    );
}

export const render = HomepageLayout;
