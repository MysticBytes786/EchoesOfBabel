import fs from "fs";

import { DIR_PATH, FILE_NAME } from "./globals.js";

export function initDir() {
  //create the output directory if it doesn't exist
  if (!fs.existsSync(DIR_PATH)) fs.mkdirSync(DIR_PATH);
  return;
}


export function appendDataToFile(formattedData){
  fs.appendFileSync(FILE_NAME, formattedData);
  return;
}
