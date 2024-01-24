import { LayoutContext } from "../../src/models";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";
import {
	Channel,
	ChannelFrontmatter,
	ChannelHomepageData,
} from "../../_includes/resources/channel/ChannelModels";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";

const frontmatter: ChannelFrontmatter = {
	title: "Remote Development",
	subtitle:
		"Learn the ins and outs of remote development: virtualization, containers, dev containers, and cloud.",
	resourceType: "channel",
	date: new Date(Date.UTC(2023, 8, 1)),
	author: "pwe",
	logo: "thumbnail.svg",
	hero: "/assets/remote_development.svg",
	subnav: [
		{
			title: "Gateway",
			url: "https://www.jetbrains.com/remote-development/gateway/",
		},
		{
			title: "Docs",
			url: "https://www.jetbrains.com/help/idea/remote-development-a.html#gateway",
		},
	],
};

export default class RemoteHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					titleExtraClass="has-text-white has-text-shadow"
					subtitle={channel.subtitle!}
					subtitleExtraClass="has-text-white has-text-shadow"
					image={channel.hero!}
					extraStyle="background-color:#27282c; background-position: left;"
				/>
				<section class="section">
					<div class="container">
						<div class="columns">
							<div class="column content is-9">
								<h2>Your work, where you want it</h2>
								<p>
									Software development has become a big, sprawling affair—lots
									of developers, lots of locations, and lots of services. It can
									be a bit much, and companies are looking for new approaches.
								</p>
								<p>
									Remote development is a set of ideas that let developers do
									parts – or all – of their work on their desktop, on a company
									server, or in the cloud. This approach is appealing for many
									reasons: securing intellectual property, resource savings,
									better developer productivity, and more.
								</p>
								<p>
									Let’s dive into the spectrum of remote development: what it
									is, how it works, who it’s for, and why you should care.
								</p>
								<h2>What Is Remote Development?</h2>
								<p>
									Developers write code on a computer. Sounds simple, but this
									means development is local: on their computer, with all their
									tooling, environment, and data. The developer is responsible
									for installation and ongoing maintenance.
								</p>
								<p>
									That responsibility becomes a burden. Remote development gives
									developers a gradual series of new solutions:
									<ul>
										<li>Local virtualization</li>
										<li>Containerization</li>
										<li>Development containers</li>
										<li>Cloud-based development</li>
									</ul>
								</p>
								<p>Let’s take a look at each of these in more depth.</p>
								<h2>Local virtualization</h2>
								<p>
									Working directly on a local computer has been the standard
									development approach for decades. As mentioned above, this
									approach has drawbacks:
									<ul>
										<li>
											Different developers have different CPU architectures,
											operating systems, and memory configurations
										</li>
										<li>
											Each developer’s local configuration changes over time: OS
											upgrades, installed packages
										</li>
									</ul>
								</p>
								<p>
									In most cases, developers need environment isolation with a
									predictable “computer” to work in. Without isolation, “works
									on my computer” became a standard response to issue reports.
								</p>
								<p>
									Local virtualization was a first step towards improving this
									burden. Products such as VMware, Parallels, Vagrant, and the
									Windows hypervisor provide an isolated “computer” within a
									computer. These tools provide a standardized hardware
									environment (CPU, memory settings, and operating system.)
								</p>{" "}
								<p>Isolated sandboxes have advantages, but at a cost:</p>
								<ul>
									<li>
										OS and application configuration still needs maintenance
									</li>
									<li>Resource intensive (CPU, memory, disk)</li>
									<li>Slow startup means these environments are long-lived</li>
									<li>Network configuration can be error-prone</li>
								</ul>
								<p>
									How does virtualization work in practice? If you have a macOS
									laptop but need to develop a Windows application, a product
									such as Parallels can give you a Windows “computer” inside
									your Mac. Regardless of the virtualization used, JetBrains
									IDEs provide the same programming environment across all
									operating systems.
								</p>
								<h2>Containerization</h2>
								<p>
									Virtualization gives <em>physical</em> isolation of hardware.
									But what if you are more interested in <em>logical</em>
									isolation of the operating system and applications?
								</p>
								<p>
									Containerization lets you specify the application as logical,
									specified units. You specify the version of an operating
									system, the application dependencies, and the pre-configured
									service processes which constitute your application. You can
									write these decisions into a configuration. Team members will
									then get the same logical unit.
								</p>
								<p>
									Unlike virtualization, containerization does not provide
									hardware isolation. The upside: very fast container startup
									times. Fast execution, along with sharing of resources, means
									containers fit nicely into development processes.
								</p>
								<p>Containerization provides a number of benefits:</p>
								<ul>
									<li>Much less resource-intensive</li>
									<li>Much faster startup</li>
									<li>More maintainable</li>
									<li>
										Repeatable configuration of all the units in your
										application
									</li>
									<li>Logical unit(s) of development/deployment</li>
								</ul>
								<p>
									While containerization has become quite mature, it still has
									some drawbacks:
								</p>
								<ul>
									<li>Less isolation</li>
									<li>
										Each container in a solution has to run the same operating
										system
									</li>
									<li>
										Maintaining container configurations becomes its own
										responsibility
									</li>
								</ul>
								<p>
									Containerization products have become quite popular: Docker,
									Docker Compose, Windows Subsystem for Linux (WSL), and
									Kubernetes all enjoy broad usage. As such, JetBrains IDEs have
									integration with all of these, making them a natural part of
									development.
								</p>
								<h2>Development containers</h2>
								<p>
									Containers help run your <em>application</em> during
									development. But development involves developer tools and
									environments which are also complicated to set up. Can
									containers help run your tools? What if you could combine an
									application and its tools into one <em>environment</em>, and
									even run it remotely?
								</p>
								<p>
									Development Containers (Dev Containers) provide such an
									environment. A dev container is an all-encompassing workspace
									for an application, development tools, libraries, and more.
									Developers can walk up to a project and get everything they
									need, locally or remotely, for a productive development
									environment.
								</p>
								<p>
									Working with dev containers provides a number of advantages:
								</p>
								<ul>
									<li>
										Developer tools can run in a container while integrating
										with IDEs
									</li>
									<li>
										Dev containers can describe what “features” they offer as
										tooling
									</li>
									<li>
										Broad ecosystem of standard development tool extensions
									</li>
									<li>
										Reduces friction for cloud-based development workflows
									</li>
								</ul>
								<p>
									Since dev containers are based on containerization, it
									inherits some of the same drawbacks. Additionally, dev
									containers:
								</p>
								<ul>
									<li>Have a learning curve</li>
									<li>Focus seems to be on cloud-native development</li>
									<li>
										Linux-focus means XCode/iOS, Windows native might not be
										popular
									</li>
								</ul>
								<p>
									Dev containers have seen broad adoption by vendors. JetBrains
									IDEs now support dev containers as a full-featured development
									environment for your projects. Dev Containers can be run
									remotely via an SSH connection or locally using Docker.
								</p>
								<h2>Cloud-based development</h2>
								<p>
									Containerization – and especially dev containers – helps
									manage development workflows. What if a company wants to move
									some or all of development away from a laptop, to a
									centralized facility?
								</p>
								<p>
									Cloud-based development delivers a fully-remote workspace: the
									hardware, operating system, application, tooling, and the IDE
									in a public or private cloud. Developers only need a local
									“viewport” application to get the same familiar experience.
								</p>
								<p>
									These remote workspaces provide a significant change in
									development, with many strengths:
								</p>
								<ul>
									<li>Intellectual property never leaves central control</li>
									<li>
										Very productive as developers just start working quickly, in
										any location
									</li>
									<li>
										Lower expenses as resources can be easily shared and scaled
									</li>
									<li>
										Some “cloud” solutions can run inside the company firewall
									</li>
								</ul>
								<p>Remote workspaces have drawbacks:</p>
								<ul>
									<li>
										Good developer experience requires a reliable, fast
										connection
									</li>
									<li>Hosting costs could become a concern</li>
									<li>
										Needs related infrastructure for orchestration, billing,
										etc.
									</li>
								</ul>
								<p>
									JetBrains Space, Google Cloud Workstations, Gitpod, GitHub
									Codespaces, and AWS CodeCatalyst are examples of popular
									private- and public-cloud development solutions. Additionally,
									these products support JetBrains Gateway, bringing our
									JetBrains IDEs into remote development. Also, JetBrains Fleet
									is our built-from-scratch IDE designed around a remote
									architecture.
								</p>
								<h2>Conclusion</h2>
								<p>
									Remote development is changing how companies and software
									teams work, whether logically-remote on a laptop or
									physically-remote across clusters in the cloud. The
									remote-development approach gives companies opportunities to
									streamline development, reduce cost, and secure intellectual
									property; all while staying one step ahead of the competition.
								</p>
							</div>
						</div>
					</div>
				</section>
			</BaseLayout>
		);
	}
}
