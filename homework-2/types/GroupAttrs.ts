type Permission = 'READ'
    | 'WRITE'
    | 'DELETE'
    | 'SHARE'
    | 'UPLOAD_FILES';

export type GroupAttrs = {
    id: number;
    name: string;
    permissions: Permission[];
}
