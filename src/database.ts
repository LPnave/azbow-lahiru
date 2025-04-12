import { DataSource } from "typeorm";
import appConfig from "./config";

export const AppDataSource = new DataSource({
    type: "postgres", 
    host: appConfig.DB_HOST,
    port: appConfig.PORT,
    username: appConfig.DB_USER,
    password: appConfig.DB_PASSWORD,
    database: appConfig.DB_NAME,
});

export const getDbConnection = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
};
