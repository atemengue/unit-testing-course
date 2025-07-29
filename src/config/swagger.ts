import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Propelize",
      version: "1.0.0",
      description: "Documentation de l’API Propelize",
    },
    servers: [
      { url: "http://localhost:3000" }
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerJSDoc;