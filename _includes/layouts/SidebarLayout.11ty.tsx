// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { BaseLayout } from "./BaseLayout.11ty";
import Heading from "../heading/Heading.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";

export type SidebarLayoutProps = {
  pageTitle: string;
  subtitle?: string;
  bottomNav?: string[];
  sidebar?: string[];
  topNav?: string[];
  children: string[];
} & LayoutProps;

export function SidebarLayout(
  this: LayoutContext,
  data: SidebarLayoutProps
): JSX.Element {
  const { pageTitle, subtitle, bottomNav, topNav, sidebar, children } = data;
  return (
    <BaseLayout {...data} title={pageTitle}>
      <div class="bd-main bulmaio-body">
        <div class="bd-side-background" />
        <div class="bd-main-container container">
          <div class="bd-duo">
            <div class="bd-lead">
              {topNav}
              <Heading title={pageTitle} subtitle={subtitle} />
              {children}
              {bottomNav}
            </div>
            {sidebar}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export const render = SidebarLayout;
