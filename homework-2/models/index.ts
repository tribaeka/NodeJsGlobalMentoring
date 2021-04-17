import { Sequelize } from "sequelize";
import { userFactory } from "./userModel";
import { IDB } from "../interfaces/IDB";

const sequelize  = new Sequelize(
    'nodejs_mentoring',
    'postgres',
    'admin',
    {
        port: 5432,
        host: 'localhost',
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
console.log('db model log');
export const db: IDB = {
    sequelize,
    User
}
