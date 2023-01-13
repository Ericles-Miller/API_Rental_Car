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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const auth_1 = __importDefault(require("@config/auth"));
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("@shared/errors/AppError");
/* a funcao nextFunction aceita a proxima rota que recebera a rota */
function ensureAuthenticated(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // bearer fsdjljtwre5435nlk23sfsd
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new AppError_1.AppError('Token missing!', 401);
        }
        // a virgula ignora
        const [, token] = authHeader.split(' '); // divide a string pelo space -- nao retirar o space
        try {
            const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret_token); // retorna um Ipayload
            request.user = {
                id: user_id,
            };
            next();
        }
        catch (error) {
            console.log(error);
            throw new AppError_1.AppError('Invalid token!', 401);
        }
    });
}
exports.ensureAuthenticated = ensureAuthenticated;
