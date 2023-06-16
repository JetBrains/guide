import { expect, test, describe } from "vitest";
import fs from "fs";
import path from "upath";

const sitesPath = "./sites/";
// @ts-ignore
const pycharmSiteConfig = JSON.parse(
  fs.readFileSync(path.join(sitesPath, "pycharm", "_data", "site.json"))
);

describe.each(fs.readdirSync(`./sites/`))("describe site $site", (site) => {
  test(`contains site.json and layout.js`, () => {
    expect(
      fs.existsSync(path.join(sitesPath, site, "_data", "site.json"))
    ).to.equal(true);
    expect(
      fs.existsSync(path.join(sitesPath, site, "_data", "layout.js"))
    ).to.equal(true);
  });

  test(`has site.json with same (root) configuration keys as PyCharm Guide`, () => {
    // @ts-ignore
    const siteConfig = JSON.parse(
      fs.readFileSync(path.join(sitesPath, site, "_data", "site.json"))
    );

    expect(Object.keys(siteConfig).sort()).toEqual(
      Object.keys(pycharmSiteConfig).sort()
    );
  });
});
