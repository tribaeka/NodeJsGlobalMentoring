import { BuildOptions, Model, Sequelize } from "sequelize";
import { UsersGroupsAttrs } from "../types/UsersGroupsAttrs";

export interface IUsersGroupsModel extends Model<UsersGroupsAttrs>, UsersGroupsAttrs {}
export class UsersGroup extends Model<IUsersGroupsModel, UsersGroupsAttrs> {}

export type UsersGroupsStatic = typeof Model & {
    new (values?: unknown, options?: BuildOptions): IUsersGroupsModel;
}

export function usersGroupsFactory(sequelize: Sequelize): UsersGroupsStatic {
    return <UsersGroupsStatic>sequelize.define('users_groups', {}, {});
}
