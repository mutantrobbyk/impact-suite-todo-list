DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS tasks;

CREATE TABLE categories (
id serial primary key,
title varchar
);

CREATE TABLE todos (
id serial primary key,
title varchar,
description text,
category_id int references categories(id)
);

CREATE TABLE tasks (
id serial primary key,
description varchar,
todo_id int references todos(id)
);