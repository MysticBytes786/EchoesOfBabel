import fs from "fs";
import { setTimeout } from "timers/promises";

import { FILE_NAME } from "./helpers/globals.js";
import initCluster from "./helpers/initCluster.js";
import writeFormattedPage from "./helpers/writeFormattedPage.js";
import { extractDataFromPage } from "./helpers/extractDataFromPage.js";

export default async function navigate({ BASE_URL, query, workers }) {
  try {
    const cluster = await initCluster(workers);
    let noMoreTasks = false;
    let index = 1;
    //reset the output file
    fs.writeFileSync(FILE_NAME, "");

    await cluster.task(async ({ page, data: url }) => {
      const extractionResult = await extractDataFromPage({ page, url });
      //If we redirect to another page that means it's the end of bookmark variants
      if (!extractionResult) {
        noMoreTasks = true;
        await cluster.idle();
        return;
      }
      console.log(url);
      const { data } = extractionResult;
      writeFormattedPage(data);
      for (let i = 0; i < workers; i++)
        cluster.queue(`${BASE_URL}?${query}:${index++}`);
    });

    cluster.queue(`${BASE_URL}?${query}`);

    //listen to the cluster and close it when there are no more tasks
    const clusterListener = setInterval(async () => {
      if (noMoreTasks) {
        await setTimeout(5000);
        await cluster.close();
        clearInterval(clusterListener);
        process.exit(0);
      }
    }, 1000);

    return;
  } catch (error) {
    console.error(error);
  }
}
