import  express from "express";
import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from "./routes/specification.routes";


const app = express();
app.use(express.json());

/* ===========================================================*/
/*              Rotas vindas de routes */
/* ===========================================================*/
app.use("/categories",categoriesRoutes);
app.use("/specifications",specificationsRoutes);


app.listen(3333, () => console.log("Server is running!"));