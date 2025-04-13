import { DataSource } from "typeorm";
import appConfig from "./config";
import { FinancialApproval, Lead, LeadAssignment, LegalProceeding, Property, Reservation, Sale, User } from "./model"; 

export const AppDataSource = new DataSource({
    type: "postgres", 
    host: appConfig.DB_HOST,
    port: appConfig.DB_PORT,
    username: appConfig.DB_USER,
    password: appConfig.DB_PASSWORD,
    database: appConfig.DB_NAME,
    entities: [User,Lead,Property,Reservation,LeadAssignment,FinancialApproval,LegalProceeding,Sale,],
    synchronize: true, 
    logging: true,
    ssl:false
});

export const getDbConnection = async () => {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
};
