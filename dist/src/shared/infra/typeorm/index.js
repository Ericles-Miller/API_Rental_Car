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
const typeorm_1 = require("typeorm");
exports.default = (host = 'localhost') => __awaiter(void 0, void 0, void 0, function* () {
    const defaultOptions = yield (0, typeorm_1.getConnectionOptions)();
    return (0, typeorm_1.createConnection)(Object.assign(defaultOptions, {
        host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
        database: process.env.NODE_ENV === 'test' ? 'rentex_test' : defaultOptions.database,
        /** as linhas acima referenciam o banco de dados para refer"enciar com o banco de dados
         * de teste. Essa config foi feita no arquivo de .env
         */
    }));
});
