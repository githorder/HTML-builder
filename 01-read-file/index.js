const fs = require("node:fs");
const path = require("node:path");

const readFrom = (file) => {
  let fileData = "";

  const readStream = fs.createReadStream(path.join(__dirname, file), "utf-8");

  readStream.on("data", (chunk) => (fileData += chunk));
  readStream.on("end", () => console.log(fileData));
};

readFrom("./text.txt");
