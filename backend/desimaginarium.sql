create database desimaginarium;
use desimaginarium;

create table Usuarios (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(45),
    email VARCHAR(45),
    password VARCHAR(45) 
);

alter table Usuarios add COLUMN perfil enum('admin', 'usuario') default 'usuario';

create table carrinho (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    carrinhoCol VARCHAR(45),
    produtos_id INT,
    usuarios_id INT
);

create table produtos (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    valor FLOAT NOT NULL,
    name VARCHAR(45) NOT NULL,
    info_produto TEXT NOT NULL, 
    imagem TEXT NOT NULL
);

create table favoritos (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Favoritados ENUM('Favorito', 'Não favorito') DEFAULT 'Favorito',
    produtos_id INT,
    usuarios_id INT
);


insert into produtos (valor, name, info_produto) values 
(1.50, "Capivara básica", "A Capivara Voadora básica é uma criatura mítica com asas, simbolizando a harmonia entre a terra e o céu"),
(2.00, "Capivara amarela", "A Capivara amarela é uma criatura mítica com asas, simbolizando a harmonia entre a terra e o céu.");

alter table carrinho  add foreign key (produtos_id)  references produtos(id);
alter table carrinho  add foreign key (usuarios_id)  references Usuarios(id);
alter table favoritos add foreign key  (usuarios_id) references  Usuarios(id);
alter table favoritos add foreign key  (produtos_id) references  produtos(id);
