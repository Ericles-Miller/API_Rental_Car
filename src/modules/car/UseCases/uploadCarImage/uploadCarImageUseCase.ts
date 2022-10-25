import { ICarsImageRepository } from '@modules/car/repositories/ICarsImageRepitory';
import { IStorageProvider } from '@shared/container/providers/storegeProvider/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    car_id:string;
    images_name:string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,
    @inject('storageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async (image) => {
      await this.carsImageRepository.create(car_id, image);
      // passando a imagem do carro para o provider
      await this.storageProvider.save(image, 'cars');
    });
  }
}

export { UploadCarImageUseCase };
