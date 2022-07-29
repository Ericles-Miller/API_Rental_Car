import { Router } from 'express'; //importo da biblioteca express
// importando car de rotas 
const categoriesRoutes = Router();


// importando lybralys API 
import {v4 as uuid4} from 'uuid';

// arrays e var globais 
const categories = [];


categoriesRoutes.post("/", (request, response) =>{
    const {name,description} = request.body;
    const category = {
        id: uuid4(),    // -- nao esqueca do parenteses 
        name,
        description
    };

    categories.push(category);

    return response.status(201).send()
});


export {categoriesRoutes} // exporto para poder referenciar e usar em outros codigos
