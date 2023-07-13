import h, {JSX} from "vhtml";
import {LayoutContext, LayoutProps} from "../../src/models";
import {PageFrontmatter} from "../resources/page/PageModels";
import {BaseLayout} from "./BaseLayout.11ty";

export type PageLayoutData = LayoutProps & PageFrontmatter;

export function PageLayout(
    this: LayoutContext,
    data: PageLayoutData
): JSX.Element {
    return (
        <BaseLayout {...data}>
            <section className="section">
                <div className="container">
                    <main class="content">
                        <h1>{data.title}</h1>
                        <div dangerouslySetInnerHTML={{__html: data.content}}/>
                    </main>
                </div>
            </section>
        </BaseLayout>
    );
}

export const render = PageLayout;
