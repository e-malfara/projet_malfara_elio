drop table if exists client;
drop table if exists produits;

create table client(
    id_client serial primary key,
    nom varchar(50),
    prenom varchar(50),
    login varchar(50),
    password varchar(50)
);

create table produits(
    id_produit serial primary key,
    nom varchar(50),
    dev varchar(50),
    note numeric
);

insert into client(nom, prenom, login, password) values('MAURICE', 'Emmanuel', 'emma', 'toto');
insert into produits(nom, dev, note) values('Kingdom Hearts', 'Square Enix', 19);
insert into produits(nom, dev, note) values('The Last Of Us', 'Naughty Dog', 18);
insert into produits(nom, dev, note) values('Dragon Ball Z Kakarot', 'CyberConnect2', 18);
insert into produits(nom, dev, note) values('The World Ends With You', 'Square Enix', 17);