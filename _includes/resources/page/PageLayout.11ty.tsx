import { PageFrontmatter } from "./PageModels";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import Heading from "../../heading/Heading.11ty";
import { renderToString } from "jsx-async-runtime";

export type PageLayoutData = LayoutProps & PageFrontmatter;

export async function PageLayout(
	this: LayoutContext,
	data: PageLayoutData,
): Promise<string> {
	return await renderToString(
		<BaseLayout {...data}>
			<Heading title={data.title} subtitle={data.subtitle} />
			<section class="section">
				<div class="container">
					<main class="content">
						<div>{data.content}</div>
					</main>
				</div>
			</section>
		</BaseLayout>,
	);
}

export const render = PageLayout;
