import fs from "fs";

import { DIR_PATH, FILE_NAME } from "./globals.js";

export function initFileDir() {
  //create the output directory if it doesn't exist
  if (!fs.existsSync(DIR_PATH)) fs.mkdirSync(DIR_PATH);
  //reset the output file
  fs.writeFileSync(FILE_NAME, "");
  return;
}


export function appendDataToFile(formattedData){
  fs.appendFileSync(FILE_NAME, formattedData);
  return;
}
