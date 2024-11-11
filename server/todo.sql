drop table if exists task;

drop table if exists account;

CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

create table task (
    id serial primary key,
    description varchar(255) not null
);

insert into task (description) values ('My test task');

insert into task (description) values ('My another test task');