# desimaginarium
 
## Criando o banco de dados
Para criar o banco é necessario  pegar o codigo do arquivo Sql, e rodar em uma Sql workbench
 
## Rodando Servidor
Para rodar o servidor é presciso entrar na pasta de backend e dar o comando de `npm install`. Com os arquivos já instalados, é necessário rodar `npm start`
 
## Rotas
 
### Listar usuarios
metodo: get
rota: /usuario/listar
 
 
### Cadrastar usuarios
metodo: post
rota: /usuario/cadastrar
corpo {
    "name":"Laura",
    "email":"laura@email.com",
    "password":"94032060"
}

### Editar usuarios 
metodo: put
rota: /usuario/editar/:id
Corpo{
    "name":"Laura",
    "email":"laurabt@email.com",
    "password":"232060"

}
 
### Deletar usuarios
metodo: delete
rota: /usuario/deletar/:id
 
 
### Cadrastar produtos
 
metodo: post
 
rota: /produto/cadastrar
 
corpo {
    "valor":"2000",
    "name":"Capivara amarela",
    "info_produto":"A Capivara amarela é uma criatura mítica com asas, simbolizando a harmonia entre a terra e o céu"
}
 
### Editar produtos
 
metodo: put
rota: /produto/editar/:id
corpo{
    "valor":"2000",
    "name":"Capivara vermelha",
    "info_produto":"A Capivara vermelha é uma criatura mítica com asas, simbolizando a harmonia entre a terra e o céu"
}
 
### Deletar produtos
metodo: delete
rota: /produto/deletar/:id