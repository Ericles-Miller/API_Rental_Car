import  express from "express";
import { categoriesRoutes } from './routes/categories.routes';


const app = express();
app.use(express.json());



/* ===========================================================
/*              Rotas vindas de routes 
/* ===========================================================*/
app.use(categoriesRoutes);

app.listen(3333, () => console.log("Server is running!"));