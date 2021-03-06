import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { UserAttrs } from "../types";

export interface IUserModel extends Model<UserAttrs>, UserAttrs {}
export class User extends Model<IUserModel, UserAttrs> {}

export type UserStatic = typeof Model & {
    new (values?: unknown, options?: BuildOptions): IUserModel;
}

export function userFactory(sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("users", {
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
        {
            schema: 'public'
        });
}
