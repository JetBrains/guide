import path from "upath";
import fg from "fast-glob";
import fs from "fs";

const rootPath = process.argv[2];

const srcDir = path.resolve(rootPath);
console.log(`[Copy Demos] src: ${srcDir}\n`);

const entries = fg.sync(["!(_site)**/demos/"], {
  cwd: srcDir,
  onlyDirectories: true,
  absolute: false,
});

entries.forEach((entry) => {
  const output = `_site/${entry}`;
  const dest = path.resolve(srcDir, output);
  const src = path.resolve(srcDir, entry);
  fs.cpSync(src, dest, { recursive: true });
  console.log(`[Copy Demos] copying ${entry} → ${output}`);
});
