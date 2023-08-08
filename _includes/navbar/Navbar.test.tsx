import h from "vhtml";
import { expect, test } from "vitest";

import Navbar from "./Navbar.11ty";
import { Channel } from "../layouts/BaseLayout.11ty";

test("Navbar", () => {
  const channel: Channel = {
    name: "Channel Name",
    url: "/channel/",
    style: "color: green",
  };
  document.body.innerHTML = <Navbar channel={channel} />;
  const result = document.querySelector("nav");
  expect(result && result.tagName).to.equal("NAV");
});
