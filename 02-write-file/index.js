const fs = require("node:fs");
const path = require("node:path");
const { stdin: input } = require("node:process");
const readLine = require("node:readline");

const closeWriting = () => {
  console.log("<--------- Thanks for your time --------->\n");
  process.exit();
};

const writeTo = async (file) => {
  const writeStream = fs.createWriteStream(path.join(__dirname, file), "utf-8");
  const rl = readLine.createInterface({ input });
  console.log("<--------- Welcome to the writing task --------->\n");

  process.on("SIGINT", () => {
    closeWriting();
  });

  rl.on("line", (data) => {
    if (data === "exit") {
      closeWriting();
    }

    writeStream.write(`${data}\n`);
  });
};

writeTo("./output.txt");
