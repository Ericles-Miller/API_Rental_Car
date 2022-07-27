"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourse = void 0;
const CreateCourseService_1 = __importDefault(require("./CreateCourseService")); // importando a classe
// usando dessa forma eu consigo passaar para dentro da rota criada na pasta dist server.js
function CreateCourse(request, response) {
    CreateCourseService_1.default.execute({
        name: "Node.js",
        duration: 10,
        educator: "Miller"
    });
    CreateCourseService_1.default.execute({
        name: "Reactjs",
        educator: "Rodrigin"
    });
    return response.send();
}
exports.CreateCourse = CreateCourse;
