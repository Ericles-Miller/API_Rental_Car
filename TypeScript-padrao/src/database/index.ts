import {DataSource} from "typeorm";

export const dataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    username:"sa",
    password:"@18er0821",
    database:"rentex",
    migrations:["./src/database/migrations/*.ts"],
    extra:{
        trustServerCertificate: true,
    }
});

dataSource.initialize();