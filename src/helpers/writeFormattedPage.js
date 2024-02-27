import fs from "fs";

import { FILE_NAME } from "./globals.js";


export default function writeFormattedPage({ title, content, bookLocation, pageNum, ref }) {
  
  //get the length of the content
  const lineLength = content.split("\n")[0].length;
  let result = "";

  // separate each page
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < lineLength; j++) result += "=";

  const formatedData = result.concat(
    [
      "\n\n\n\n",
      `\t\t\t${ref}`,
      `\t\t\t${pageNum}`,
      `\t\t\t${title}`,
      content,
      `\t\t\t${bookLocation}`,
      "\n\n\n\n",
    ].join("\n\n\n\n")
  );

  fs.appendFileSync(FILE_NAME, formatedData);

  return;
}
