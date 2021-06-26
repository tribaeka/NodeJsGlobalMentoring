import { Sequelize } from "sequelize";
import { userFactory } from "./userModel";
import { groupFactory } from "./groupModel";
import { usersGroupsFactory } from "./UsersGroupsModel";

const { DB_NAME, DB_USER, DB_PASS, DB_PORT, DB_HOST } = process.env;
const isLoggingEnabled = process.env.ENABLE_SEQUELIZE_LOGGING === 'true';
const sequelize  = new Sequelize(
    DB_NAME || 'postgres',
    DB_USER || 'postgres',
    DB_PASS || 'postgres',
    {
        port: +(DB_PORT || 5433), // setting up connection to the test bd if there are no process env settings
        host: DB_HOST || 'localhost',
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
