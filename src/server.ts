import express, {
    NextFunction,
    Request,
    Response,
    ErrorRequestHandler,
} from "express";
import { LeadAssignmentRouter, LeadRouter, UserRouter } from "./routers";
import logger from "./utils/logger";
import { HttpException } from "./utils/types";
import { expressjwt } from "express-jwt";
import appConfig from "./config";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const server = express();

server.use((req, res, next) => {
    let now = new Date();
    let nowFormatted =
        now.getFullYear() +
        "-" +
        (now.getMonth() + 1) +
        "-" +
        now.getDate() +
        " " +
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds();
    logger.info(`[${nowFormatted}] ${req.method}:${req.url} ${res.statusCode}`);
    next();
});

const errorRequestHandler: ErrorRequestHandler = (
    err: HttpException,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    logger.error(err.stack);
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({
        status,
        message,
    });
};

// server.use(
//     expressjwt({
//         secret: appConfig.JWT_TOKEN_SECRET,
//         algorithms: ["HS256"],
//     }).unless({
//         path: ["/api-docs"],
//     })
// );
server.use(express.json());
server.use("/users", UserRouter.default);
server.use("/leads", LeadRouter.default);
server.use("/leadAssignments", LeadAssignmentRouter.default);
// Swagger route
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// server.use("/sessions", SessionRouter.default);
server.use((req, _res, next) => {
    if (!req.route) return next(new HttpException(404, "Page not found"));
    next();
});

server.use(errorRequestHandler);

export default server;
