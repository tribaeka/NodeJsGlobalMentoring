import { Sequelize } from "sequelize";
import { UserStatic } from "../models/userModel";

export interface IDB {
    sequelize: Sequelize;
    User: UserStatic;
}
