import express from "express";
import routerV1 from "./v1";
import swaggerUI from "swagger-ui-express";
import YAML from 'yamljs';

const swaggerDocument = YAML.load("swagger.yaml");

const routes = express.Router();
routes.use("/api/v1", routerV1);
routes.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));


export default routes;