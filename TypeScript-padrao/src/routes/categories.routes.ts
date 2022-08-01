import { response, Router } from 'express'; //importo da biblioteca express;

// importando lybralys API; 
import { v4 as uuid4 } from 'uuid';
import { Category } from '../model/category';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

// importando car de rotas;
const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();


categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);
    if(categoryAlreadyExists) {
        return response.status(400).json({error:"Category already exists!"});
    }
    
    categoriesRepository.create({name, description});
    return response.status(201).send();
});

categoriesRoutes.get('/', (request,response) =>{
    const all = categoriesRepository.list(); // chamo a funcao list da classe categoriesRepository 
    return response.json(all); // retorna o arquivo json de categories 
})

export { categoriesRoutes }; // exporto para poder referenciar e usar em outros codigos
