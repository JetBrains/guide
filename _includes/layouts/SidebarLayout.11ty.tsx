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
      <div className="bd-main bulmaio-body">
        <div className="bd-side-background" />
        <div className="bd-main-container container">
          <div className="bd-duo">
            <div className="bd-lead">
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
