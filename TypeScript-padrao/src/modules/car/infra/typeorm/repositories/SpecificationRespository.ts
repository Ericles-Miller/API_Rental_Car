import { getRepository, Repository } from 'typeorm';

import { ICreatedSpecificationDTO, ISpecificationRepository } from '../../../repositories/ISpecificationRepository';
import { Specification } from '../entities/specifications';

class SpecificationsRepository implements ISpecificationRepository {
    private repository: Repository <Specification>;

    constructor() {
      this.repository = getRepository(Specification);
    }
    async create({ name, description }: ICreatedSpecificationDTO): Promise <Specification> {
      const specification = this.repository.create({
        description,
        name,
      });
      await this.repository.save(specification);
      return specification;
    }
    async findByName(name: string):Promise<Specification> {
      const specifications = await this.repository.findOne({ name });
      return specifications;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
      const specifications = await this.repository.findByIds(ids);
      return specifications;
    }
}

export { SpecificationsRepository };
