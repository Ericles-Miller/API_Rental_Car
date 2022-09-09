import { Specification } from '@modules/car/infra/typeorm/entities/specifications';

import { ICreatedSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository';

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];
  async create({ name, description }: ICreatedSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.name === name);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecification = this.specifications.filter(
      (specificarion) => ids.includes(specificarion.id),
    );

    return allSpecification;
  }
}

export { SpecificationRepositoryInMemory };
