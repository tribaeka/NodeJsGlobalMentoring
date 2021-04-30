import { IGroupAttrs } from "../interfaces";
import { db } from "../models";

class GroupService {
    async getAllGroups(): Promise<IGroupAttrs[]> {
        const groupModels = await db.Group.findAll()

        return <IGroupAttrs[]>groupModels.map(groupModel => groupModel.toJSON());
    }

    async getGroupById(id: string): Promise<IGroupAttrs | undefined> {
        const groupModel = await db.Group.findByPk(id);

        return <IGroupAttrs>groupModel?.toJSON();
    }

    async getGroupByName(name: string): Promise<IGroupAttrs | undefined> {
        const groupModel = await db.Group.findOne({ where: { name }});

        return <IGroupAttrs>groupModel?.toJSON();
    }

    async addGroup(group: IGroupAttrs): Promise<number> {
        const createdGroup = await db.Group.create(group);

        return createdGroup.id;
    }

    updateGroup(group: IGroupAttrs): void {
        db.Group.update(group, { where: { id: group.id } });
    }

    deleteGroup(groupId: string): void {
        db.Group.destroy({ where: { id: groupId } });
    }
}

export default new GroupService();
