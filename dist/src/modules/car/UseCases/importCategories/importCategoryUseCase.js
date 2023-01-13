"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportCategoryUseCase = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
const tsyringe_1 = require("tsyringe");
let ImportCategoryUseCase = class ImportCategoryUseCase {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    ;
    loadCategories(file) {
        return new Promise((resolve, reject) => {
            const stream = fs_1.default.createReadStream(file.path); // funaco nativa do fs
            const categories = [];
            const parseFile = (0, csv_parse_1.parse)();
            stream.pipe(parseFile);
            parseFile.on('data', (line) => __awaiter(this, void 0, void 0, function* () {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            }))
                // condicoes de return 
                .on("end", () => {
                fs_1.default.promises.unlink(file.path); // removendo o arquivo csv
                resolve(categories);
            })
                .on("error", (err) => {
                reject(err);
            });
        });
    }
    ;
    execute(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.loadCategories(file);
            // map invoca a funcao callback passada por argumento para cada elemento 
            // do array e devolve um new array como resultado 
            /** em outras palavras vai acessar a lista categories e retornar os
             * valores presentes nela para a var category. depois sera feita a desestruturacao
             * e sera retornado para as suas respectivas variaveis
             * como foi usado o async ele vai ler todas os valores da lista
             */
            categories.map((category) => __awaiter(this, void 0, void 0, function* () {
                const { name, description } = category;
                const existCategory = yield this.categoriesRepository.findByName(name); //pesquiso nos repositorio se existe 
                if (!existCategory) {
                    yield this.categoriesRepository.create({
                        name,
                        description
                    });
                }
            }));
        });
    }
    ;
};
ImportCategoryUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("CategoriesRepository")),
    __metadata("design:paramtypes", [Object])
], ImportCategoryUseCase);
exports.ImportCategoryUseCase = ImportCategoryUseCase;
