enum Permission {
    READ = 'READ',
    WRITE = 'WRITE',
    DELETE = 'DELETE',
    SHARE = 'SHARE',
    UPLOAD_FILES = 'UPLOAD_FILES'
}

export type GroupAttrs = {
    id: number;
    name: string;
    permissions: Permission[];
}
