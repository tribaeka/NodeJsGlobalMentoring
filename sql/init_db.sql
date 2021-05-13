create table if not exists users
(
    id serial not null
        constraint users_pkey
            primary key,
    login varchar(255) not null,
    password varchar(255) not null,
    age integer not null,
    "isDeleted" boolean default false,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

create table if not exists groups
(
    id serial not null
        constraint groups_pkey
            primary key,
    name varchar(255) not null,
    permissions varchar(255)[] not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

create table users_groups
(
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    "userId" integer not null
        constraint "users_groups_userId_fkey"
            references users
            on update cascade on delete cascade,
    "groupId" integer not null
        constraint "users_groups_groupId_fkey"
            references groups
            on update cascade on delete cascade,
    constraint users_groups_pkey
        primary key ("userId", "groupId")
);


INSERT INTO users (id, login, password, age, "isDeleted", "createdAt", "updatedAt") VALUES (1, 'user1query1', 'user1', 11, false, '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');
INSERT INTO users (id, login, password, age, "isDeleted", "createdAt", "updatedAt") VALUES (2, 'user2query12123123123', 'user2', 22, false, '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');
INSERT INTO users (id, login, password, age, "isDeleted", "createdAt", "updatedAt") VALUES (3, 'user3query123', 'user3', 24, false, '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');
INSERT INTO users (id, login, password, age, "isDeleted", "createdAt", "updatedAt") VALUES (4, 'user4', 'user4', 18, false, '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');

INSERT INTO groups (id, name, permissions, "createdAt", "updatedAt") VALUES (1, 'readingGroup', '{ "READ", "WRITE" }', '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');
INSERT INTO groups (id, name, permissions, "createdAt", "updatedAt") VALUES (2, 'writingGroup', '{ "WRITE" }', '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');
INSERT INTO groups (id, name, permissions, "createdAt", "updatedAt") VALUES (3, 'deletingGroup', '{ "DELETE" }', '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');
INSERT INTO groups (id, name, permissions, "createdAt", "updatedAt") VALUES (4, 'sharingGroup', '{ "SHARE" }', '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');
INSERT INTO groups (id, name, permissions, "createdAt", "updatedAt") VALUES (5, 'uploadingFilesGroup', '{ "UPLOAD_FILES" }', '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');

INSERT INTO users_groups ("createdAt", "updatedAt", "userId", "groupId") VALUES ('2021-04-30 10:13:30.744000', '2021-04-30 10:13:43.814000', 1, 1);
INSERT INTO users_groups ("createdAt", "updatedAt", "userId", "groupId") VALUES ('2021-04-30 10:13:35.320000', '2021-04-30 10:13:44.702000', 2, 1);
INSERT INTO users_groups ("createdAt", "updatedAt", "userId", "groupId") VALUES ('2021-04-30 10:13:36.711000', '2021-04-30 10:13:45.488000', 3, 2);
INSERT INTO users_groups ("createdAt", "updatedAt", "userId", "groupId") VALUES ('2021-04-30 10:13:38.685000', '2021-04-30 10:13:46.203000', 4, 5);
INSERT INTO users_groups ("createdAt", "updatedAt", "userId", "groupId") VALUES ('2021-04-30 10:13:37.698000', '2021-04-30 10:13:46.989000', 3, 4);
INSERT INTO users_groups ("createdAt", "updatedAt", "userId", "groupId") VALUES ('2021-04-30 10:13:39.757000', '2021-04-30 10:13:49.484000', 1, 2);
INSERT INTO users_groups ("createdAt", "updatedAt", "userId", "groupId") VALUES ('2021-04-30 10:13:40.913000', '2021-04-30 10:13:50.304000', 1, 3);
INSERT INTO users_groups ("createdAt", "updatedAt", "userId", "groupId") VALUES ('2021-04-30 10:13:41.832000', '2021-04-30 10:13:51.078000', 1, 4);
INSERT INTO users_groups ("createdAt", "updatedAt", "userId", "groupId") VALUES ('2021-04-30 10:13:42.750000', '2021-04-30 10:13:51.838000', 1, 5);
