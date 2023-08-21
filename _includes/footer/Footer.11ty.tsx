import h, { JSX } from "vhtml";
import Icon from "../icons/Icon.11ty";

export type FooterProps = {
	copyright: string;
};
const Footer = ({ copyright }: FooterProps): JSX.Element => {
	return (
		<footer class="has-background-dark has-text-grey-light footer pagefooter">
			<div class="container">
				<div class="pt-5 pb-5 is-flex is-flex-wrap-wrap is-justify-content-between">
					<ul class="is-flex is-flex-wrap-wrap is-align-items-center">
						<li class="mr-4">
							<a
								class="has-text-grey-light"
								href="https://www.jetbrains.com/company/privacy.html"
							>
								Privacy &amp; Security
							</a>
						</li>
						<li class="mr-4">
							<a
								class="has-text-grey-light"
								href="https://www.jetbrains.com/company/useterms.html"
							>
								Terms of Use
							</a>
						</li>
						<li class="mr-4">
							<a
								class="has-text-grey-light"
								href="https://www.jetbrains.com/legal/trademarks/"
							>
								Trademarks
							</a>
						</li>
						<li class="mr-4">
							<a
								class="has-text-grey-light"
								href="https://www.jetbrains.com/legal/"
							>
								Legal
							</a>
						</li>
						<li class="mr-4">
							<a
								class="has-text-grey-light"
								href="https://www.jetbrains.com/genuine-tools/"
							>
								Genuine tools
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="container">
				<div class="content">
					<div class="pt-5" style="border-top: 1px solid #8C8C8E;"></div>
					<p>
						<a
							class="mr-4 is-inline-block"
							href="https://www.facebook.com/JetBrains"
							title="JetBrains on Facebook"
						>
							<Icon name={`facebook`} />
						</a>
						<a
							class="mr-4 is-inline-block"
							href="https://www.twitter.com/JetBrains"
							title="JetBrains on Twitter"
						>
							<Icon name={`twitter`} />
						</a>
						<a
							class="mr-4 is-inline-block"
							href="https://www.linkedin.com/company/jetbrains/"
							title="JetBrains on LinkedIn"
						>
							<Icon name={`linkedin`} />
						</a>
						<a
							class="mr-4 is-inline-block"
							href="https://www.youtube.com/JetBrainsTV"
							title="JetBrains on YouTube"
						>
							<Icon name={`youtube`} />
						</a>
						<a
							class="mr-4 is-inline-block"
							href="https://www.instagram.com/jetbrains/"
							title="JetBrains on Instagram"
						>
							<Icon name={`instagram`} />
						</a>
						<a
							class="mr-4 is-inline-block"
							href="https://www.tiktok.com/@jetbrains"
							title="JetBrains on TikTok"
						>
							<Icon name={`tiktok`} />
						</a>
						<a
							class="mr-4 is-inline-block"
							href="https://blog.jetbrains.com/"
							title="JetBrains blog"
						>
							<Icon name={`blog`} />
						</a>
						<a
							class="mr-4 is-inline-block"
							href="https://blog.jetbrains.com/feed/"
							title="JetBrains RSS feed"
						>
							<Icon name={`rss-feed`} />
						</a>
					</p>
					<p dangerouslySetInnerHTML={{ __html: copyright }}></p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
