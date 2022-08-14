import { readFileSync, writeFileSync } from "fs";
import encode from "image-encode";
import { argv } from "process";

if (argv.length !== 4) {
  console.log(`Received ${argv.length - 2} arguments. Expected 2\n`);
  console.log("Usage: node extract.js [input.bin] [output.png]");

  process.exit(1);
}

const inputFile = argv[2];
const outputFile = argv[3];

const buffer = readFileSync(inputFile);

let rgba = new Array((buffer.length / 2) * 4);

let j = 0;
for (let i = 0; i < buffer.length; i += 2) {
  const datum = 255 - buffer[i];
  rgba[j] = datum;
  rgba[j + 1] = datum;
  rgba[j + 2] = datum;
  // Alpha
  rgba[j + 3] = 255;

  j += 4;
}

const width = 165;
const height = 521;

let rotatedImage = Buffer.alloc(rgba.length);

for (let i = 0; i < rgba.length / 4; i++) {
  const byte1 = rgba[i * 4];
  const byte2 = rgba[i * 4 + 1];
  const byte3 = rgba[i * 4 + 2];
  const byte4 = rgba[i * 4 + 3];

  const prevColumn = i % width;
  const prevRow = Math.floor(i / width);

  const row = prevColumn;
  const column = height - prevRow;

  const outputPos = (row * height + column) * 4;
  rotatedImage[outputPos] = byte1;
  rotatedImage[outputPos + 1] = byte2;
  rotatedImage[outputPos + 2] = byte3;
  rotatedImage[outputPos + 3] = byte4;
}

const png = encode(rotatedImage, "png", [height, width]);

writeFileSync(outputFile, Buffer.from(png));
