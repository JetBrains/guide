#!/usr/bin/env vite-node --script

import { writeCleanResources } from "./cleaner";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

const info = chalk.hex("#087CFA");
const success = chalk.hex("#21D789");
const warning = chalk.hex("#F3C033");
const error = chalk.hex("#F45C4A");

/**
 * --help should work once https://github.com/vitest-dev/vitest/pull/3574 is merged and published
 * TODO: implement meaningful defaults and configuration options
 */
yargs(hideBin(process.argv))
  .command(
    "clean",
    "run clean script",
    {
      debug: {
        alias: "d",
        default: false,
      },
    },
    (args) => {
      try {
        console.log(info("Going to run clean up script"));
        writeCleanResources();
        console.log(success("Clean up script successful 🎉🎉🎉"));
      } catch (e) {
        console.log(error("error executing cleanup script"));
        if (args.debug) {
          console.log(info(e));
        }
      }
    }
  )
  .help().argv;
