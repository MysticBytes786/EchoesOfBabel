import { Cluster } from "puppeteer-cluster";

export default async function initCluster(workers) {
  return await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: workers,
    puppeteerOptions:{
      timeout: 0,
    }
  });
}
