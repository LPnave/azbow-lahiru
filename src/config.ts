import dotenv from "dotenv";
import * as z from "zod";

interface AppConfig {
    PORT: number;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    LOG_LEVEL: string;
    JWT_ACCESS_TOKEN_EXP: number;
    JWT_REFRESH_TOKEN_EXP: number;
    JWT_ALG: string;
    JWT_TOKEN_SECRET: string;
}

const appConfigSchema = z.object({
    PORT: z.string().regex(new RegExp("^[0-9]+$")),
    DB_HOST: z.string(),
    DB_NAME: z.string(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_PORT: z.string().regex(new RegExp("^[0-9]+$")),
    LOG_LEVEL: z.string(),
    JWT_ACCESS_TOKEN_EXP: z.string().regex(new RegExp("^[0-9]+$")),
    JWT_REFRESH_TOKEN_EXP: z.string().regex(new RegExp("^[0-9]+$")),
    JWT_ALG: z.string(),
    JWT_TOKEN_SECRET: z.string(),
});

const result = dotenv.config();

if (result.error) {
    throw result.error;
}

const validatedConfig = appConfigSchema.parse(result.parsed);

const appConfig: AppConfig = {
    PORT: parseInt(validatedConfig.PORT || "3000", 10), // fallback to 3000
    DB_HOST: validatedConfig.DB_HOST,
    DB_NAME: validatedConfig.DB_NAME,
    DB_USER: validatedConfig.DB_USER,
    DB_PASSWORD: validatedConfig.DB_PASSWORD,
    DB_PORT: parseInt(validatedConfig.DB_PORT || "5432", 10), // fallback to default PostgreSQL port
    LOG_LEVEL: validatedConfig.LOG_LEVEL,
    JWT_ACCESS_TOKEN_EXP: parseInt(validatedConfig.JWT_ACCESS_TOKEN_EXP || "3600", 10),
    JWT_REFRESH_TOKEN_EXP: parseInt(validatedConfig.JWT_REFRESH_TOKEN_EXP || "7200", 10),
    JWT_ALG: validatedConfig.JWT_ALG,
    JWT_TOKEN_SECRET: validatedConfig.JWT_TOKEN_SECRET,
};

export default appConfig;
