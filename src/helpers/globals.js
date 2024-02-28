import config from "../../config.json" assert { type: "json" };

const { BASE_URL, QUERY, WORKERS } = config;

const DIR_PATH = "./outputs";
const FILE_NAME = `${DIR_PATH}/output-${config.query}`;

export { DIR_PATH, FILE_NAME, BASE_URL, QUERY, WORKERS };
