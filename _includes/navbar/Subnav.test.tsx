import { expect, test } from "vitest";
import Subnav from "./Subnav.11ty";
import fixtures from "../fixtures";
import { screen } from "@testing-library/dom";
import { jsxToString } from "jsx-async-runtime";

test("Subnav", async () => {
	const channel = fixtures.channels[0];
	const r = <Subnav channel={channel} />;
	document.body.innerHTML = await jsxToString(r);
	const subnavTitle: HTMLAnchorElement = screen.getByRole("link", {
		name: "Channel",
	});
	expect(subnavTitle.href).to.equal("http://localhost:3000" + channel.url);
});
