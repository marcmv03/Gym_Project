
drop table Pes ;
drop table Cardio ;
drop table Exercici ;
drop table Rutina ;
drop table Inscripcio ;
drop table Gimnas ;
drop table Usuari ;

create table Usuari(
    nom char(20)  ,
    Email varchar(100) unique not null    ,
    password varchar(100) not null ,
    primary key(nom) 
); 

create table Gimnas(
    nom char(20),
    pais varchar(20)  not null,
    ciutat varchar(20)  not null,
    primary key(nom) 
) ;

create table Inscripcio(
    nom_gym char(20),
    nom_user char(20),
    num_dies integer, 
    primary key(nom_gym,nom_user),
    foreign key(nom_gym) references Gimnas(nom),
    foreign key(nom_user) references Usuari(nom)
) ;

create table Rutina (
    nom char(20),
    duracio integer,
    data varchar(20),
    nom_user char(20),
    primary key(nom,nom_user),
    foreign key(nom_user) references Usuari(nom)
);

create table Exercici(
nom_ex char(30) ,
nom_rutina  char(20) ,
nom_user char(20) ,
foreign key(nom_rutina,nom_user) references Rutina(nom,nom_user) on delete cascade ,
primary key(nom_ex,nom_rutina,nom_user) ) ;

create table Cardio(
nom_ex char(30) ,
duracio integer,
nom_rutina char(20),
nom_user char(20) ,
primary key(nom_ex,nom_rutina,nom_user) ,
foreign key(nom_ex,nom_rutina,nom_user) references Exercici(nom_ex,nom_rutina,nom_user) on delete cascade
) ;

create table Pes(
nom_ex char(30) ,
reps integer,
pes_max integer default 0,
nom_rutina char(20),
nom_user char(20) ,
primary key(nom_ex,nom_rutina,nom_user),
foreign key(nom_ex,nom_rutina,nom_user) references Exercici(nom_ex,nom_rutina,nom_user) on delete cascade 
) ;



