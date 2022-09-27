import { UsersRepositoryInMemory } from '@modules/accounts/Repositories/in-memory/UsersRepositoryinMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/Repositories/in-memory/UsersTokensRepositoryInMemeory';

import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayJsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/inMemory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgetPasswordMailUseCase } from './SendForgo/SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase : SendForgetPasswordMailUseCase;
let usersRepositoryInMemory : UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgetPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendEmail');

    await usersRepositoryInMemory.create({
      driver_license: '146508',
      email: 'nacepbam@ri.ss',
      name: 'Isabel Wilkins',
      password: '2963072763',
    });

    await sendForgotPasswordMailUseCase.execute('nacepbam@ri.ss');
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('nacepbam@ri.ss'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able create an users token!', async () => {
    const generateTokenMail = jest.spyOn(usersRepositoryInMemory, 'create');

    usersRepositoryInMemory.create({
      driver_license: '7743453',
      email: 'jowva@zuci.pa',
      name: 'Maud Banks',
      password: '109930168',
    });

    await sendForgotPasswordMailUseCase.execute('jowva@zuci.pa');

    expect(generateTokenMail).toBeCalled();
  });
});
