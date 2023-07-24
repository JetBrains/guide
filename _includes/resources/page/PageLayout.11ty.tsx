import h, {JSX} from "vhtml";
import {PageFrontmatter} from "./PageModels";
import {LayoutContext, LayoutProps} from "../../../src/models";
import {BaseLayout} from "../../layouts/BaseLayout.11ty";

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
                        <div dangerouslySetInnerHTML={{__html: data.content}}/>
                    </main>
                </div>
            </section>
        </BaseLayout>
    );
}

export const render = PageLayout;
