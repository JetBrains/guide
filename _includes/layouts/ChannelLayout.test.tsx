import h from "vhtml";
import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../fixtures";
import { ChannelLayout, ChannelLayoutProps } from "./ChannelLayout.11ty";

const channel0 = fixtures.channelItems[0];
const channel = fixtures.channels[0];
let renderProps: ChannelLayoutProps = {
  ...baseRenderData,
  ...channel0.data,
  page: channel0.page,
  children: ["<p>Some Title</p>"],
  channel,
};

test("make a ChannelLayout", () => {
  document.body.innerHTML = (
    <ChannelLayout {...renderProps}>
      <div>Some Child</div>
    </ChannelLayout>
  );
  expect(screen.getByText("Some Channel")).to.exist;
  expect(screen.getByText("First Link")).to.exist;
  expect(screen.getByText("Some Child")).to.exist;
});
