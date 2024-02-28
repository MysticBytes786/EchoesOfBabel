import { setTimeout } from "timers/promises";

import initCluster from "./helpers/initCluster.js";
import writeFormattedPage from "./helpers/writeFormattedPage.js";
import { extractDataFromPage } from "./helpers/extractDataFromPage.js";
import { initDir } from "./helpers/handleFileDir.js";

export default async function navigate({ BASE_URL, QUERY, WORKERS }) {
  try {
    initDir();
    const cluster = await initCluster(WORKERS);
    let noMoreTasks = false;
    let index = 1;

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
      for (let i = 0; i < WORKERS; i++)
        cluster.queue(`${BASE_URL}?${QUERY}:${index++}`);
    });

    cluster.queue(`${BASE_URL}?${QUERY}`);

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
