import {expect, test} from "vitest";
import {TutorialsLayout} from "./TutorialsLayout.11ty";
import {screen} from "@testing-library/dom";
import fixtures, {baseRenderData} from "../../fixtures";
import {ReferenceLayoutProps} from "../../layouts/ReferenceLayout.11y";

test("should render TutorialsLayout", () => {
    const tutorialsLayoutData: ReferenceLayoutProps = {
        ...baseRenderData,
        listing: [""],
        title: "Some Title",
        resourceType: "tutorials",
        page: {
            fileSlug: "slug",
            url: "url",
            date: fixtures.date,
        },
    };
    fixtures.context.getResources = () =>
        Array.from(fixtures.resolvedCollections.allResources.values());
    document.body.innerHTML = TutorialsLayout.call(
        fixtures.context,
        tutorialsLayoutData
    );
    const links = screen.getAllByRole("link", {
        name: "Resource",
    });
    expect(links).to.exist;
});
