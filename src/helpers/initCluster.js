import { Cluster } from "puppeteer-cluster";

export default async function initCluster(WORKERS) {
  return await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: WORKERS,
    puppeteerOptions: {
      timeout: 0,
    },
  });
}
