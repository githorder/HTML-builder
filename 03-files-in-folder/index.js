const path = require("node:path");
const fs = require("node:fs/promises");

const readDirFrom = async (dir) => {
  try {
    const files = await fs.readdir(dir);

    files.forEach(async (file) => {
      const stat = await fs.stat(path.join(dir, file));

      if (stat.isFile()) {
        console.log(
          `${file.split(".")[0]} - ${path.extname(file).slice(1)} - ${
            stat.size / 1000
          }kb`
        );
      }

      if (stat.isDirectory()) readDirFrom(path.join(dir, file));
    });
  } catch (err) {
    console.log(`Unable to read ${dir}`);
  }
};

readDirFrom(path.join(__dirname, "./secret-folder"));
