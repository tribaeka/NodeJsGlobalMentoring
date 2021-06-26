import { GroupAttrs, GroupReqAttrs } from "../types";
import { db } from "../models";

class GroupService {
    async getAllGroups(): Promise<GroupAttrs[]> {
        const groupModels = await db.Group.findAll()

        return <GroupAttrs[]>groupModels.map(groupModel => groupModel.toJSON());
    }

    async getGroupById(id: string): Promise<GroupAttrs | undefined> {
        const groupModel = await db.Group.findByPk(id);

        return <GroupAttrs>groupModel?.toJSON();
    }

    async getGroupByName(name: string): Promise<GroupAttrs | undefined> {
        const groupModel = await db.Group.findOne({ where: { name }});

        return <GroupAttrs>groupModel?.toJSON();
    }

    async addGroup(group: GroupReqAttrs): Promise<number> {
        const createdGroup = await db.Group.create(group as GroupAttrs);

        return createdGroup.id;
    }

    updateGroup(group: GroupAttrs): void {
        db.Group.update(group, { where: { id: group.id } });
    }

    async isGroupExists(groupId: string): Promise<boolean> {
        const group = await this.getGroupById(groupId);

        return !!group;
    }

    deleteGroup(groupId: string): void {
        db.Group.destroy({ where: { id: groupId } });
    }

    async addUserToGroup(userId: string, groupId: string): Promise<void> {
        const t = await db.sequelize.transaction();
        try {
            await db.UsersGroups.create({ userId, groupId }, { transaction: t });
            t.commit();
        } catch (err) {
            console.error(err)
            await t.rollback();
        }

    }
}

export default new GroupService();
