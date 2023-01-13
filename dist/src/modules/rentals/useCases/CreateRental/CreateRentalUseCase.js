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
exports.CreateRentalUseCase = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("@shared/errors/AppError");
dayjs_1.default.extend(utc_1.default);
let CreateRentalUseCase = class CreateRentalUseCase {
    constructor(rentalsRepository, dateProvider, carRepository) {
        this.rentalsRepository = rentalsRepository;
        this.dateProvider = dateProvider;
        this.carRepository = carRepository;
    }
    execute({ user_id, car_id, expected_return_date }) {
        return __awaiter(this, void 0, void 0, function* () {
            const minimumHour = 24; // var resp por ter o minimo de diaria
            // verifico se o car esta indisponivel
            const carUnavailable = yield this.rentalsRepository.findByCar(car_id);
            if (carUnavailable) {
                throw new AppError_1.AppError('Car is unavailable!');
            }
            // verifico se o user esta disponivel
            const rentalOpenToUser = yield this.rentalsRepository.findOpenRentalByUser(user_id);
            if (rentalOpenToUser) {
                throw new AppError_1.AppError('there is a rental in progress for user!');
            }
            // validacao aluguel duracao 24 horas
            const dateNow = this.dateProvider.dateNow(); // crio uma data feita nesse momento
            const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);
            if (compare < minimumHour) {
                throw new AppError_1.AppError('Invalid return time!');
            }
            const rental = yield this.rentalsRepository.create({
                user_id,
                car_id,
                expected_return_date,
            });
            yield this.carRepository.updateAvailable(car_id, false);
            return rental;
        });
    }
};
CreateRentalUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('RentalsRepository')),
    __param(1, (0, tsyringe_1.inject)('DayjsDateProvider')),
    __param(2, (0, tsyringe_1.inject)('CarsRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateRentalUseCase);
exports.CreateRentalUseCase = CreateRentalUseCase;
