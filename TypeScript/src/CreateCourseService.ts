
/**
 * name - string
 * duration number 
 * educator - string
 */

interface Course {
    name:string;
    duration?: number; // parametro nao obrigatorio
    educator: string;
}

class CreateCourseService{
    execute({duration,name,educator}:Course){
        console.log(name,duration,educator);
    }
}

export default new CreateCourseService(); // export a funcao 