const FILE_NAME = `./outputs/output-${new Date()
  .toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  })
  .replaceAll("/", "-")
  .replaceAll(":", "-")
  .replace(",", "")
  .split(" ")
  .join("-")}.txt`;



export { FILE_NAME };
