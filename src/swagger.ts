import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real Estate CRM API",
      version: "1.0.0",
      description: "API documentation for the Real Estate CRM",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: [
    "./src/routers/*.ts",
    // "./controllers/index.ts"
    ],
};

export const swaggerSpec = swaggerJSDoc(options);
