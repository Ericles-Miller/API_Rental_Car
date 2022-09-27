import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgetPasswordMailUseCase } from './SendForgo/SendForgotPasswordMailUseCase';

class SendForgetPasswordMailController {
  async handle(request:Request, response: Response) : Promise<Response> {
    const sendForgetPasswordMailUseCase = container.resolve(SendForgetPasswordMailUseCase);
    const { email } = request.body;
    await sendForgetPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { SendForgetPasswordMailController };
