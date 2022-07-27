import { Request, Response } from "express"; // importo da rota crida 
import CreateCourseService from "./CreateCourseService"; // importando a classe


// usando dessa forma eu consigo passaar para dentro da rota criada na pasta dist server.js
export function CreateCourse(request:Request,response: Response){

    CreateCourseService.execute({
        name:"Node.js",
        duration:10,
        educator:"Miller"
    });

    CreateCourseService.execute({
        name:"Reactjs",
        educator:"Rodrigin"
    });

    return response.send();
}