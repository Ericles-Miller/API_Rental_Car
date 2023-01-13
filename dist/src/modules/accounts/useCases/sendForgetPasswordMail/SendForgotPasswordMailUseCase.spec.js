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
const UsersRepositoryinMemory_1 = require("@modules/accounts/Repositories/in-memory/UsersRepositoryinMemory");
const UsersTokensRepositoryInMemeory_1 = require("@modules/accounts/Repositories/in-memory/UsersTokensRepositoryInMemeory");
const DayJsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");
const MailProviderInMemory_1 = require("@shared/container/providers/MailProvider/inMemory/MailProviderInMemory");
const AppError_1 = require("@shared/errors/AppError");
const SendForgotPasswordMailUseCase_1 = require("./SendForgo/SendForgotPasswordMailUseCase");
let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe('Send Forgot Mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryinMemory_1.UsersRepositoryInMemory();
        dateProvider = new DayJsDateProvider_1.DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemeory_1.UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory_1.MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
    });
    it('should be able to send a forgot password mail to user', () => __awaiter(void 0, void 0, void 0, function* () {
        const sendMail = jest.spyOn(mailProvider, 'sendEmail');
        yield usersRepositoryInMemory.create({
            driver_license: '146508',
            email: 'nacepbam@ri.ss',
            name: 'Isabel Wilkins',
            password: '2963072763',
        });
        yield sendForgotPasswordMailUseCase.execute('nacepbam@ri.ss');
        expect(sendMail).toHaveBeenCalled();
    }));
    it('should not be able to send an email if user does not exists', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordMailUseCase.execute('nacepbam@ri.ss')).rejects.toEqual(new AppError_1.AppError('User does not exists!'));
    }));
    it('should be able create an users token!', () => __awaiter(void 0, void 0, void 0, function* () {
        const generateTokenMail = jest.spyOn(usersRepositoryInMemory, 'create');
        usersRepositoryInMemory.create({
            driver_license: '7743453',
            email: 'jowva@zuci.pa',
            name: 'Maud Banks',
            password: '109930168',
        });
        yield sendForgotPasswordMailUseCase.execute('jowva@zuci.pa');
        expect(generateTokenMail).toBeCalled();
    }));
});
