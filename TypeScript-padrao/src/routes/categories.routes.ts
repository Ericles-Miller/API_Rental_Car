import { Router } from 'express'; //importo da biblioteca express

const categoriesRoutes = Router();

// arrays e var globais 
const categories = [];


categoriesRoutes.post("/categories", (request, response) =>{
    const {name,description} = request.body;
    const categorie = {
        name,
        description
    };

    categories.push(categorie);

    return response.status(201).send()
});


export {categoriesRoutes} // exporto para poder referenciar e usar em outros codigos
