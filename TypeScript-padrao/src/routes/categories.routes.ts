import { Router } from 'express'; //importo da biblioteca express;

// importando lybralys API; 
import { v4 as uuid4 } from 'uuid';
import { Category } from '../model/category';

// importando car de rotas;
const categoriesRoutes = Router();


// arrays e var globais ;
const categories: Category[] = []; // instance class ;

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    const category = new Category();
    
    Object.assign(category, {
        name,
        description,
        created_at : new Date()
    });

    categories.push(category);
    return response.status(201).json({ category });
});

export { categoriesRoutes }; // exporto para poder referenciar e usar em outros codigos
