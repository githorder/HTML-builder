const path = require("node:path");
const fsPromises = require("node:fs/promises");
const fs = require("node:fs");

const bundleCSSFrom = async (dir) => {
  try {
    const files = await fsPromises.readdir(dir);
    const bundleCSSFile = fs.createWriteStream(
      path.join(__dirname, "./project-dist/bundle.css"),
      "utf-8"
    );

    files.forEach(async (file) => {
      const stat = await fsPromises.stat(path.join(dir, file));

      if (stat.isFile() && path.extname(file).slice(1) === "css") {
        const cssChunk = await fsPromises.readFile(path.join(dir, file));
        bundleCSSFile.write(cssChunk);
      }
    });
  } catch (err) {
    console.log(`Unable to copy files from ${dir} to files-copy`);
  }
};

bundleCSSFrom(path.join(__dirname, "./styles"));
