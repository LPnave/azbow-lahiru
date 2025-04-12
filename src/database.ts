import { createConnection, Connection } from "typeorm";
import appConfig from "./config";

let db: Connection | null = null;

const getDbConnection = async (): Promise<Connection> => {
    if (db === null) {
        db = await createConnection({
            type: "mysql",
            host: "localhost",
            port: appConfig.DB_PORT,
            username: appConfig.DB_USER,
            password: appConfig.DB_PASSWORD,
            database: appConfig.DB_NAME,
        });
    }
    return db;
};

export default getDbConnection;
