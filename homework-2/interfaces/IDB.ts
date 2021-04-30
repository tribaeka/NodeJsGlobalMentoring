import { Sequelize } from "sequelize";
import { UserStatic } from "../models/userModel";
import { GroupStatic } from "../models/groupModel";

export interface IDB {
    sequelize: Sequelize;
    User: UserStatic;
    Group: GroupStatic;
}
