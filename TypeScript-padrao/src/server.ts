import  express from "express";
import { router } from "./routes";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());

// rota responsavel por descrever a doc da API 
// swagger.UI cria um servidor para acessar a doc 
// swagger.Ui.setup cria um arquivo em json 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);
app.listen(3333, () => console.log("Server is running!"));