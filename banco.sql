


create database db_tasks;
use db_tasks;

create table task(
    id int auto_increment primary key,
    nome varchar(30) not null,
    email varchar(50) unique not null,
    sobre varchar(90) null,
	senha varchar(30)  not null

);
DROP TABLE TASK;

SELECT * FROM task;

create table feed(
	id int auto_increment primary key,
    descricao varchar(100) unique not null

);

select * from feed;

