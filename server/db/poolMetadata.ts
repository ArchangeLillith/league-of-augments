import mysql from "mysql2/promise";
import config from "./config";
const metadataPool = mysql.createPool(config.db);
export default metadataPool;
