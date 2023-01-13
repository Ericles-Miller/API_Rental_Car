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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendForgotPasswordMailUseCase = void 0;
const path_1 = require("path");
const tsyringe_1 = require("tsyringe");
const uuid_1 = require("uuid");
const AppError_1 = require("@shared/errors/AppError");
let SendForgotPasswordMailUseCase = class SendForgotPasswordMailUseCase {
    constructor(usersRepository, usersTokensRepository, dateProvider, mailProvider) {
        this.usersRepository = usersRepository;
        this.usersTokensRepository = usersTokensRepository;
        this.dateProvider = dateProvider;
        this.mailProvider = mailProvider;
    }
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findByEmail(email);
            const templatePath = (0, path_1.resolve)(__dirname, '..', '..', '..', 'views', 'emails', 'ForgotPassword.hbs');
            if (!user) {
                throw new AppError_1.AppError('User does not exists!');
            }
            const token = (0, uuid_1.v4)();
            const expires_date = this.dateProvider.addHours(3);
            yield this.usersTokensRepository.create({
                refresh_token: token,
                user_id: user.id,
                expires_date,
            });
            const variables = {
                name: user.name,
                link: `${process.env.FORGOT_MAIL_URL}${token}`,
            };
            yield this.mailProvider.sendEmail(email, 'password recovery', variables, templatePath);
        });
    }
};
SendForgotPasswordMailUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('UsersRepository')),
    __param(1, (0, tsyringe_1.inject)('UsersTokensRepository')),
    __param(2, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __param(3, (0, tsyringe_1.inject)('MailProvider')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SendForgotPasswordMailUseCase);
exports.SendForgotPasswordMailUseCase = SendForgotPasswordMailUseCase;
