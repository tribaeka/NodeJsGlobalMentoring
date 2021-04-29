import { Sequelize } from "sequelize";
import { userFactory } from "./userModel";
import { IDB } from "../interfaces/IDB";

const { DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_HOST} = process.env;
const sequelize  = new Sequelize(
    DB_NAME as string,
    DB_USER as string,
    DB_PASS as string,
    {
        port: +(DB_PORT as string),
        host: DB_HOST as string,
        dialect: 'postgres',
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
        }
    }
);

const User = userFactory(sequelize);

export const db: IDB = {
    sequelize,
    User
}
