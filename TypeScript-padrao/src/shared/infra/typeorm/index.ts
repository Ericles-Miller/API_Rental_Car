import { createConnection, Connection, getConnectionOptions } from 'typeorm';

export default async (host = 'localhost'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database: process.env.NODE_ENV === 'test' ? 'rentex_test' : defaultOptions.database,
      /** as linhas acima referenciam o banco de dados para refer"enciar com o banco de dados
       * de teste. Essa config foi feita no arquivo de .env
       */
    }),
  );
};
