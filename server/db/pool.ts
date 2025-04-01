import mysql from "mysql2/promise";

import config from "./config";

// Create a pool for general queries
console.log(`Create pool here`);
const pool = mysql.createPool(config.db);
console.log(`Pool has been created`);

export default pool;
