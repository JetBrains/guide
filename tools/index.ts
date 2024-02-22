#!/usr/bin/env vite-node --script

import {
	migrateCardThumbnail,
	migrateFrontMatter,
	writeCleanResources,
} from "./cleaner";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import { dumpObsoletes, testObsoletes } from "./obsoletes";

const info = chalk.hex("#087CFA");
const success = chalk.hex("#21D789");
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
	.command(
		"migrate-frontmatter",
		"migrate old gatsby frontmatter",
		{
			debug: {
				alias: "d",
				default: false,
			},
		},
		(args) => {
			try {
				console.log(info("Going to clean frontmatter"));
				migrateFrontMatter();
				console.log(success("cleaning up frontmatter successful 🎉🎉🎉"));
			} catch (e) {
				console.log(error("error executing frontmatter migration script"));
				if (args.debug) {
					console.log(info(e));
				}
			}
		}
	)
	.command(
		"migrate-cardthumbnail",
		"migrate cardThumbnail to thumbnail",
		{
			debug: {
				alias: "d",
				default: false,
			},
		},
		(args) => {
			try {
				console.log(info("Going to clean migrate cardThumbnail"));
				migrateCardThumbnail();
				console.log(success("migrate cardThumbnail successful 🎉🎉🎉"));
			} catch (e) {
				console.log(error("error executing cardThumbnail migration script"));
				if (args.debug) {
					console.log(info(e));
				}
			}
		}
	)
	.command(
		"dump-obsoletes",
		"dump obsoletes for nginx to be picked up",
		{
			debug: {
				alias: "d",
				default: false,
			},
		},
		(args) => {
			try {
				console.log(info("Going to write nginx rules for obsolete documents"));

				dumpObsoletes();
				console.log(success("nginx rules written successful 🎉🎉🎉"));
			} catch (e) {
				console.log(error("error writing nginx rules"));
				if (args.debug) {
					console.log(info(e));
				}
			}
		}
	)
	.command(
		"test-obsoletes [url] [file]",
		"test obsoletes against a live nginx server",
		(yargs) => {
			yargs.positional("file", {
				type: "string",
				default: "tools/files/g3-urls.txt",
				describe: "the file with expected URLs",
			});
			yargs.positional("url", {
				type: "string",
				describe: "the url to test obsoletes",
			});
		},
		async (args) => {
			try {
				console.log(info("Going to test obsoletes against " + args.url));

				await testObsoletes(args.file as string, args.url as string);
				console.log(success("test obsoletes successful 🎉🎉🎉"));
			} catch (e) {
				console.log(error("validation error"));
				console.log(info(e));
			}
		}
	)
	.help().argv;
