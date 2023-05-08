const path = require("node:path");
const fsPromises = require("node:fs/promises");

const copyFilesFrom = async (dir) => {
  try {
    const files = await fsPromises.readdir(dir);
    await fsPromises.mkdir(path.join(__dirname, "files-copy"), {
      recursive: true,
    });

    files.forEach(async (file) => {
      const stat = await fsPromises.stat(path.join(dir, file));

      if (stat.isFile()) {
        await fsPromises.copyFile(
          path.join(dir, file),
          path.join(__dirname, "files-copy", file)
        );
      }
    });
  } catch (err) {
    console.log(`Unable to copy files from ${dir} to files-copy`);
  }
};

copyFilesFrom(path.join(__dirname, "./files"));
