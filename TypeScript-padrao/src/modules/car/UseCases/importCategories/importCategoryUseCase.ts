import fs from "fs";
import {parse as csvParse} from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name:string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {};
    
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolve,reject)=>{
            const stream = fs.createReadStream(file.path); // funaco nativa do fs
            const categories: IImportCategory[] = [];
            const parseFile = csvParse();
        
            stream.pipe(parseFile);

            parseFile.on('data', async (line) =>{
                const [name, description ] = line;
                categories.push({
                    name,
                    description
                });
            })
            // condicoes de return 
            .on("end",() => {
                resolve(categories);
            })
            .on("error", (err)=>{
                reject(err);
            });  
        })
    };

    async execute(file:Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        // map invoca a funcao callback passada por argumento para cada elemento 
        // do array e devolve um new array como resultado 
        /** em outras palavras vai acessar a lista categories e retornar os 
         * valores presentes nela para a var category. depois sera feita a desestruturacao
         * e sera retornado para as suas respectivas variaveis  
         * como foi usado o async ele vai ler todas os valores da lista          
         */
        categories.map(async(category): Promise<void> => {
            const {name,description} = category;
            const existCategory = this.categoriesRepository.findByName(name); //pesquiso nos repositorio se existe 
            
            if(!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description
                });
            }
        })  
    };
}

export { ImportCategoryUseCase}; 