import { ICreateUserDTO } from '../../dtos/ICreateUserdto';
import { User } from '../../infra/typeorm/entities/user';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];
  async create({
    driver_license, name, email, password,
  } : ICreateUserDTO) : Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      password,
      name,
    });
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
