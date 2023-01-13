"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const typeorm_1 = require("typeorm");
const category_1 = require("../entities/category");
class CategoriesRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(category_1.Category); // getRepository pertence ao typeorm
        // -- inicialmente crio um array vazio
    }
    create({ description, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = this.repository.create({
                name,
                description,
                created_at: new Date(),
            });
            yield this.repository.save(category);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.repository.find();
            return categories;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            // func abaixo faz o mesmo processo que o find()
            const category = yield this.repository.findOne({ name }); // check if exists
            return category;
        });
    }
}
exports.CategoriesRepository = CategoriesRepository;
