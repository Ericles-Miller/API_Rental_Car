import fs from "fs";
import csvParser from "csv-parser";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name:string;
    description: string;
}


class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {};
    
    loadCategories(file: Express.Multer.File): Promise<IImportCategory>{
        return new Promise((resolve,reject)=>{
            const stream = fs.createReadStream(file.path); // funaco nativa do fs
            const categories: IImportCategory[] = [];
            const parseFile = csvParser();
        
            stream.pipe(parseFile);

            parseFile.on('data', async (line) =>{
                const [name, description ] = line;
                categories.push({
                    name,
                    description
                });
            })
            .on("end",() => {
                resolve(categories);
            })
            .on("error", (err)=>{
                reject(err);
            });  
        })};
    execute(file:Express.Multer.File): void {
        const categories = this.loadCategories(file);
        console.log(categories);
    };
}

export { ImportCategoryUseCase}; 