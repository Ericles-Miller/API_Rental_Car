import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarUseCase } from './listAvailableCarUseCase';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;
    // relaciono ao container
    const listAvailableCarUseCase = container.resolve(ListAvailableCarUseCase);

    const cars = await listAvailableCarUseCase.execute({
      brand: brand as string, // forco a var a ser string
      name: name as string,
      category_id: category_id as string,
    });

    return response.json(cars);
  }
}

export { ListAvailableCarsController };
