type Permission = 'READ'
    | 'WRITE'
    | 'DELETE'
    | 'SHARE'
    | 'UPLOAD_FILES';

export type IGroupAttrs = {
    id: number;
    name: string;
    permissions: Permission[];
}
