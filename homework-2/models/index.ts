import { Sequelize } from "sequelize";
import { userFactory } from "./userModel";
import { groupFactory } from "./groupModel";
import { usersGroupsFactory } from "./UsersGroupsModel";

const { DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_HOST } = process.env;
const isLoggingEnabled = process.env.ENABLE_SEQUELIZE_LOGGING === 'true';
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
        },
        logging: isLoggingEnabled
    }
);

const User = userFactory(sequelize);
const Group = groupFactory(sequelize);
const UsersGroups = usersGroupsFactory(sequelize);

User.belongsToMany(Group, { through: UsersGroups });
Group.belongsToMany(User, { through: UsersGroups });

export const db = {
    sequelize,
    User,
    Group,
    UsersGroups
}
