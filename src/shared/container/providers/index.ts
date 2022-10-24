import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayJsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from './storegeProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './storegeProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './storegeProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider(),

);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  S3StorageProvider,
);
