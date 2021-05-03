import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { GroupAttrs } from "../types";

export interface IGroupModel extends Model<GroupAttrs>, GroupAttrs {}
export class Group extends Model<IGroupModel, GroupAttrs> {}

export type GroupStatic = typeof Model & {
    new (values?: unknown, options?: BuildOptions): IGroupModel;
}

export function groupFactory(sequelize: Sequelize): GroupStatic {
    return <GroupStatic>sequelize.define('groups',{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    },
        {
            schema: 'public'
        });
}
