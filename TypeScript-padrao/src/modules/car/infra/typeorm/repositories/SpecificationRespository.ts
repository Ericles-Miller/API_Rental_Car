import { getRepository, Repository } from 'typeorm';

import { ICreatedSpecificationDTO, ISpecificationRepository } from '../../../repositories/ISpecificationRepository';
import { Specification } from '../entities/specifications';

class SpecificationsRepository implements ISpecificationRepository {
    private repository: Repository <Specification>;

    constructor() {
      this.repository = getRepository(Specification);
    }
    async create({ name, description }: ICreatedSpecificationDTO): Promise <void> {
      const specification = this.repository.create({
        description,
        name,
      });
      await this.repository.save(specification);
    }
    async findByName(name: string):Promise<Specification> {
      const specifications = this.repository.findOne({ name });
      return specifications;
    }

    findByIds(ids: string[]): Promise<Specification[]> {
      throw new Error('Method not implemented.');
    }
}

export { SpecificationsRepository };
