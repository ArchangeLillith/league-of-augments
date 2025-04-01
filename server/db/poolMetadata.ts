import mysql from "mysql2/promise";

import config from "./config";

// Create a pool for general queries
console.log(`Create metadatapool here`);
const metadataPool = mysql.createPool(config.db);
console.log(`Pool has been created`);

export default metadataPool;
