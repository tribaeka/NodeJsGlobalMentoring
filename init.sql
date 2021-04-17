create database nodejs_mentoring;

create table users
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


INSERT INTO users (id, login, password, age, "isDeleted", "createAt", "updatedAt") VALUES (1, 'user1query1', 'user1', 11, false, '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');
INSERT INTO users (id, login, password, age, "isDeleted", "createAt", "updatedAt") VALUES (2, 'user2query12123123123', 'user2', 22, false, '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');
INSERT INTO users (id, login, password, age, "isDeleted", "createAt", "updatedAt") VALUES (3, 'user3query123', 'user3', 24, false, '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');
INSERT INTO users (id, login, password, age, "isDeleted", "createAt", "updatedAt") VALUES (4, 'user4', 'user4', 18, false, '2021-04-11 14:57:18.771000', '2021-04-11 14:57:18.773000');



