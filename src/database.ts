import { DataSource } from "typeorm";
import appConfig from "./config";
import { User } from "./model"; 

export const AppDataSource = new DataSource({
    type: "postgres", 
    host: appConfig.DB_HOST,
    port: appConfig.PORT,
    username: appConfig.DB_USER,
    password: appConfig.DB_PASSWORD,
    database: appConfig.DB_NAME,
    entities: [User],
    synchronize: true, 
    logging: false,
});

export const getDbConnection = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
};
