import fs from "fs";
import csvParser from "csv-parser";

class ImportCategoryUseCase {

    execute(file:Express.Multer.File): void {
        const stream = fs.createReadStream(file.path); // funaco nativa do fs

        const parseFile = csvParser();
        
        stream.pipe(parseFile);

        parseFile.on('data', async (line) =>{
            console.log(line);
        });
    }
}

export { ImportCategoryUseCase}; 