import { writeFileSync } from "fs";
import pixels from "image-pixels";
import { argv } from "process";

if (argv.length !== 4) {
  console.log(`Received ${argv.length - 2} arguments. Expected 2\n`);
  console.log("Usage: node create.js [input.png] [output.bin]");

  process.exit(1);
}

const inputFile = argv[2];
const outputFile = argv[3];

const create = async () => {
  let { data, width, height } = await pixels(inputFile);

  let image = new Array(data.length / 2);

  for (let i = 0; i < data.length; i += 4) {
    // Only read red pixel and invert color
    let byte = 255 - data[i];

    if (data[i + 3] == 0) {
      // If alpha is 0, write black
      byte = 0;
    }

    image[i / 2] = byte;
    image[i / 2 + 1] = 0;
  }

  let rotatedImage = Buffer.alloc(image.length);

  for (let i = 0; i < image.length / 2; i++) {
    const byte1 = image[i * 2];
    const byte2 = image[i * 2 + 1];

    const prevColumn = i % width;
    const prevRow = Math.floor(i / width);

    const row = width - prevColumn;
    const column = prevRow;

    rotatedImage[(row * height + column) * 2] = byte1;
    rotatedImage[(row * height + column) * 2 + 1] = byte2;
  }

  writeFileSync(outputFile, rotatedImage);
};

create();
