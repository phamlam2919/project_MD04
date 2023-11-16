import mysql2, { Pool, PoolOptions } from "mysql2";

const databaseConfig: PoolOptions = {
    database: "marshall",
    host: "localhost",
    user: "root",
    password: "290802",
    port: 3306,
};

const database: Pool = mysql2.createPool(databaseConfig);

export default database.promise();
