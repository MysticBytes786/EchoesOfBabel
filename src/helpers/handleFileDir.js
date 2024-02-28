import fs from "fs";

import { DIR_PATH, FILE_NAME, query } from "./globals.js";

let FILE_VARIANT;

export function initDir() {
  //create the output directory if it doesn't exist
  if (!fs.existsSync(DIR_PATH)) fs.mkdirSync(DIR_PATH);
  FILE_VARIANT = fs
    .readdirSync(DIR_PATH)
    .filter((file) => file.includes(query)).length;

  return;
}

export function appendDataToFile(formattedData) {
  FILE_VARIANT
    ? fs.appendFileSync(`${FILE_NAME}-${FILE_VARIANT}.txt`, formattedData)
    : fs.appendFileSync(`${FILE_NAME}.txt`, formattedData);

  return;
}
