drop database if exists database_animals;
create database if not exists database_animals;

use database_animals;

create table animal (
	id int not null auto_increment,
    name varchar(35) not null,
    description varchar(100) not null,
    daily_expense int not null,
    anim_type varchar(50) not null,
    constraint PK_animal primary key (id)
);

insert into animal (name, description, daily_expense, anim_type) values
('cat', 'very funny animal', 10, 'Mammal'),
('dog', 'very frieandly animal', 13, 'Mammal'),
('turtle', 'very slow animal', 15, 'Reptile'),
('shark', 'very dangerous animal', 55, 'Fish'),
('zebra', 'white-black animal', 35, 'Cloven-footed');


