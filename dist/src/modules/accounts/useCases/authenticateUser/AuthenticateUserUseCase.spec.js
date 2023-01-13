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
const AppError_1 = require("@shared/errors/AppError");
const CreateUserUseCase_1 = require("../createUser/CreateUserUseCase");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUserUseCase;
let usersTokensRepositoryInMemory;
let dayjsDateProvider;
describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryinMemory_1.UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemeory_1.UsersTokensRepositoryInMemory();
        dayjsDateProvider = new DayJsDateProvider_1.DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dayjsDateProvider);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory);
    });
    it('should be able to authenticate an user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: '000234',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
        };
        console.log(user);
        yield createUserUseCase.execute(user);
        const result = yield authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty('token');
    }));
    it('should not be able to authenticate an nonexistent user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authenticateUserUseCase.execute({
            email: 'false@email.com',
            password: '1234',
        })).rejects.toEqual(new AppError_1.AppError('Email or password incorrect!', 400));
    }));
    it('should not be able to authenticate with incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            driver_license: '9999',
            email: 'user@user.com',
            password: '1234',
            name: 'User Test Error',
        };
        yield createUserUseCase.execute(user);
        expect(authenticateUserUseCase.execute({
            email: user.email,
            password: 'incorrectPassword',
        })).rejects.toEqual(new AppError_1.AppError('Email or password incorrect!'));
    }));
});
