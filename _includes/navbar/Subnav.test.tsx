import h from "vhtml";
import { expect, test } from "vitest";
import Subnav from "./Subnav.11ty";
import fixtures from "../fixtures";
import { screen } from "@testing-library/dom";

test("Subnav", () => {
  const channel = fixtures.channels[0];
  document.body.innerHTML = <Subnav channel={channel} />;
  const subnavTitle: HTMLAnchorElement = screen.getByRole("link", {
    name: "Channel",
  });
  expect(subnavTitle.href).to.equal(channel.url);
});
