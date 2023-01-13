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
exports.RentalsRepository = void 0;
const typeorm_1 = require("typeorm");
const Rental_1 = require("../entities/Rental");
class RentalsRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Rental_1.Rental);
    }
    findByCar(car_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const openByCar = yield this.repository.findOne({
                where: { car_id, end_date: null },
            });
            return openByCar;
        });
    }
    findOpenRentalByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const openByUser = yield this.repository.findOne({
                where: { user_id, end_date: null },
            });
            return openByUser;
        });
    }
    create({ user_id, car_id, expected_return_date, id, end_date, total, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = this.repository.create({
                car_id,
                user_id,
                expected_return_date,
                id,
                end_date,
                total,
            });
            yield this.repository.save(rental);
            return rental;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = yield this.repository.findOne(id);
            return rental;
        });
    }
    findByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rentals = yield this.repository.find({
                where: { user_id },
                relations: ['car'], // refiro em relacao a instancia
            });
            return rentals;
        });
    }
}
exports.RentalsRepository = RentalsRepository;
