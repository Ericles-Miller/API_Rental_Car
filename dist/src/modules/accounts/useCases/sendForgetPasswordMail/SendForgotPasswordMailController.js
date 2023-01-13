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
exports.SendForgotPasswordMailController = void 0;
const tsyringe_1 = require("tsyringe");
const SendForgotPasswordMailUseCase_1 = require("./SendForgo/SendForgotPasswordMailUseCase");
class SendForgotPasswordMailController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const sendForgotPasswordMailUseCase = tsyringe_1.container.resolve(SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase);
            const { email } = request.body;
            yield sendForgotPasswordMailUseCase.execute(email);
            return response.send();
        });
    }
}
exports.SendForgotPasswordMailController = SendForgotPasswordMailController;
