import { ChannelFrontmatter } from "./ChannelModels";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import Heading from "../../heading/Heading.11ty";

export type PageLayoutData = LayoutProps & ChannelFrontmatter;

export function PageLayout(
	this: LayoutContext,
	data: PageLayoutData
): JSX.Element {
	return (
		<BaseLayout {...data}>
			<Heading title={data.title} subtitle={data.subtitle} />
			<section class="section">
				<div class="container">
					<main class="content">
						<div dangerouslySetInnerHTML={{ __html: data.content }} />
					</main>
				</div>
			</section>
		</BaseLayout>
	);
}

export const render = PageLayout;
