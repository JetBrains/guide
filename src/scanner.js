import SiteChecker from "broken-link-checker/lib/public/SiteChecker.js";
import { reasons } from "broken-link-checker/lib/internal/messages.js";

const verbose = false;
let brokenLinksCount = 0;
let timeout = null;

// URLs that are considered valid (e.g. returning 403 on automated scanning)
const safelist = [
  // IDEA Guide
  "https://mvnrepository.com/",
  "https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-engine",

  // .NET Guide
  "https://blazor-university.com/forms/handling-form-submission/",
  "https://www.mysql.com/"
];

const finish = () => {
  if (brokenLinksCount > 0) {
    console.log(`FOUND ${brokenLinksCount} BROKEN LINKS`);
    process.exit(-1);
  } else {
    console.log("FOUND NO BROKEN LINKS");
    process.exit(0);
  }
};

const siteChecker = new SiteChecker(
    {
        filterLevel: 1,
        maxSockets: 64,
        maxSocketsPerHost: 64,
        excludeInternalLinks: false,
        excludeExternalLinks: false,
        requestMethod: "get",
        acceptedSchemes: ["http", "https"],
        excludedKeywords: ["localhost", "twitter"],
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
    },
    {
        "error": (error) => {
            console.error(error);
        },
        "link": (result, customData) => {
            // Print result
          const isInSafelist = safelist.includes(result.url.original);
          if (result.broken && !isInSafelist) {
                if (result.http.response && ![undefined, 200, 301, 302, 308].includes(result.http.response.statusCode)) {
                    console.log(`${result.base.original}: ${result.http.response.statusCode} => ${result.url.original} ${result.brokenReason}`);
                    console.log(`Broken link is in tag: '${result.html.tag}'`);
                    console.log(`${reasons[result.brokenReason]}`);
                    console.log();
                    brokenLinksCount++;
                }
            } else if (verbose) {
                console.log(`${result.base.original}: ${result.http.response.statusCode} => ${result.url.original}`);
                console.log();
            }

            // Broken-link-checker may not finish -- refer: https://github.com/stevenvachon/broken-link-checker/issues/90
            // It does however seem to always get stuck almost at the end.
            // After waiting 60 seconds for the next link to be processed, we'll exit.
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(finish, 60000);
        },
        "end": finish
    }
);

// Use an undocumented handler to filter out links that are not external/inside the boundaries of the Guide
siteChecker.htmlUrlChecker.handlers._filter = (result) => {
    if (result.url.resolved != null &&
        result.url.resolved.indexOf("/guide") < 0 &&
        result.url.resolved.indexOf("jetbrains.com") >= 0) {        
        return "BLC_KEYWORD";
    }
};

// URLS to check
if (process.argv.length >= 3) {
  // use console arguments
  for (const url of process.argv) {
    if (url.startsWith("http")) {
      siteChecker.enqueue(url);
      console.log(`Enqueued ${url}`);
    }
  }
} else {
  // Go with defaults
  siteChecker.enqueue("https://www.jetbrains.com/dotnet/guide/");
  siteChecker.enqueue("https://www.jetbrains.com/go/guide/");
  siteChecker.enqueue("https://www.jetbrains.com/idea/guide/");
  siteChecker.enqueue("https://www.jetbrains.com/pycharm/guide/");
  siteChecker.enqueue("https://www.jetbrains.com/webstorm/guide/");
}