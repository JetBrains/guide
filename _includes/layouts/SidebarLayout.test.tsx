import {expect, test} from "vitest";
import {screen} from "@testing-library/dom";

import {SidebarLayout, SidebarLayoutProps} from "./SidebarLayout.11ty";
import h from "vhtml";
import fixtures, {baseRenderData} from "../fixtures";

const children = [
    h("main", {
        dangerouslySetInnerHTML: {__html: `<button>B42</button>`},
    }),
];
const topNav = [
    h("main", {
        dangerouslySetInnerHTML: {__html: `<button>topnav</button>`},
    }),
];
const bottomNav = [
    h("main", {
        dangerouslySetInnerHTML: {__html: `<button>bottomnav</button>`},
    }),
];
const props: SidebarLayoutProps = {
    ...baseRenderData,
    pageTitle: "Some Tip",
    page: {
        fileSlug: "slug",
        url: fixtures.tips[0].url,
        date: fixtures.date,
    },
    subtitle: "Some Subtitle",
    bottomNav,
    topNav,
    children,
};

test("SidebarLayout", () => {
    document.body.innerHTML = SidebarLayout.call(fixtures.context, props);
    expect(screen.getByText("Some Tip")).to.exist;
    expect(screen.getByText("Some Subtitle")).to.exist;
    expect(screen.getByRole("button", {name: "B42"})).to.exist;
    expect(screen.getByRole("button", {name: "topnav"})).to.exist;
    expect(screen.getByRole("button", {name: "bottomnav"})).to.exist;
});
