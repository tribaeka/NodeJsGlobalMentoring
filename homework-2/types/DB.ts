import { Sequelize } from "sequelize";
import { UserStatic } from "../models/userModel";
import { GroupStatic } from "../models/groupModel";
import { UsersGroupsStatic } from "../models/UsersGroupsModel";

export type DB = {
    sequelize: Sequelize;
    User: UserStatic;
    Group: GroupStatic;
    UsersGroups: UsersGroupsStatic;
}
