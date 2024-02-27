
export async function extractDataFromPage({ page, url }) {
  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded" });

    if ((await response.request().redirectChain().length) || !response) return undefined;

    const data = await getData(page);
    return { data: { ...data, ref: url } };
  } catch (error) {
    console.error(`\nFailed to extract data from ${url}: `,error);
    return undefined;
  }
}


  async function getData(page) {

  const title = await page.$eval("h3:nth-of-type(1)", (element) => element.textContent);
  const content = await page.$eval("#textblock", (element) => element.textContent);
  const bookLocation = await page.$eval("div.bookbottom p",(element) => element.textContent);
 
  const currentPage = await page.$eval("form input#page", (element) => element.value); 
  const pageNum = (await page.$eval("form span", (element) => element.textContent)).split(" ");
  pageNum.splice(pageNum.indexOf("\n"), 1, `[${currentPage}]`);

  return {
    title,
    content,
    pageNum: pageNum.join(" "),
    bookLocation,
  };
};
