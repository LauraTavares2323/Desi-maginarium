// // Procedimento padrão

const express = require('express');
const cors = require('cors');

const porta = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(porta, () => console.log(`Rodando na porta ${porta}`));
const connection = require('./db_configs');


// // Rotas de usuário
// Cadastrar usuários 
app.post('/Usuarios/cadastrar', (request, response) => {
    let params = array(
        request.body.nome,
        request.body.email,
        request.body.senha
    );
    let query = "INSERT INTO Usuarios(name, email, password) VALUES(?,?,?);";
    connection.query(query, params, (err, results) => {
        if (err) {
            response
            .status(400)
            .json({ 
                success: false,
                 message: "Usuário não cadastrado.",
                 data: err });
        } else {
        response
        .status(201)
        .json({ 
            success: true, 
            message: "Usuário cadastrado.", 
            data: results });
        }
    });
});


// Editar usuário
app.put('/usuario/editar/:id', (request, response) => {
    let params = array(
        request.body.name, 
        request.params.id);

    let query = "UPDATE Usuarios SET name = ? WHERE id = ?"; 
    connection.query(query, params, (err, results) => {
        if (err) {
            return response
            .status(400)
            .json({ 
                success: false,
                 message: "Informações não atualizadas.", 
                 data: err });
        } else {
        response
        .status(201)
        .json({ 
            success: true, 
            message: "Informações atualizadas.", 
            data: results });
        }
    });
});


// Login do usuário
app.post('/login', (request, response) => {
    let params = array(
        request.body.email);
    let query = "SELECT id, name, email, password, perfil FROM Usuarios WHERE email = ?";
    connection.query(query, params, (err, results) => {
        // se der erro, colar "|| results.length === 0"
        if (err) {
            return response
            .status(400)
            .json({ 
                success: false,
                message: "E-mail não cadastrado" });
        }

        let senhaDigita = request.body.password;
        let senhaBanco = results[0].password;
        if (senhaBanco === senhaDigita) {
            response
            .status(200)
            .json({
                success: true,
                message: "Sucesso",
                data: results[0] });
        } else {
            response
            .status(400)
            .json({ 
                success: false,
                message: "Verifique sua senha" });
        }
    });
});


// Deletar usuário
app.delete('/usuario/deletar/:id', (request, response) => {
    let params = array(
        request.params.id);
    let query = "DELETE FROM Usuarios WHERE id = ?;";
    connection.query(query, params, (err, results) => {
        if (err) {
            return response
            .status(400)
            .json({ 
                success: false,
                message: "Não foi possível deletar o usuário.",
                data: err });
        } else {
        response
        .status(200)
        .json({ 
            success: true,
            message: "Usuário deletado.",
            data: results });
        }
    });
});

// Listar usuários
app.get('/usuario/listar', (request, response) => {
    const query = "SELECT * FROM Usuarios";
    connection.query(query, (err, results) => {
        if (err) {
            return response
            .status(400)
            .json({ 
                success: false,
                message: "Usuários não encontrados.",
                data: err });
        }
        response
        .status(200)
        .json({ 
            success: true,
            message: "Usuários encontrados.",
            data: results });
    });
});




app.post('/produto/cadastrar', (request, response) => {
    const usuarioId = request.body.usuarioId; 

    const UsuOuAdmi = "SELECT perfil FROM Usuarios WHERE id = ?";
    connection.query(UsoOuAdmi, [usuarioId], (err, results) => {
        if (err || results.length === 0 || results[0].perfil !== 'admin') {
            return response.status(400)
            .json({
                success: false,
                message: "Você não tem permissão para cadastrar produtos."
            });
        }

        let params = [
            request.body.name,
            request.body.info_produto,
            request.body.valor
        ];
        let query = "INSERT INTO produtos(name, info_produto, valor) VALUES(?,?,?);"; 
        connection.query(query, params, (err, results) => {
            if (err) {
                return response
                .status(400)
                .json({ 
                    success: false,
                    message: "Produto não cadastrado.",
                    data: err });
            } else {
            response
            .status(201)
            .json({ 
                success: true,
                message: "Produto cadastrado.",
                data: results });
        }
        });
    });
});



// Rota para editar produto
app.put('/produto/editar/:id', (request, response) => {
    let params = [request.body.name, request.params.id];
    let query = "UPDATE produtos SET name = ? WHERE id = ?"; 
    connection.query(query, params, (err, results) => {
        if (err) {
            return response
            .status(400)
            .json({
                success: false,
                message: "Informações não atualizadas.",
                data: err });
        } else {
        response
        .status(200)
        .json({
            success: true,
            message: "Informações atualizadas.",
            data: results });
        }
    });
});


// Rota para deletar produto
app.delete('/produto/deletar/:id', (request, response) => {
    let params = [request.params.id];
    let query = "DELETE FROM produtos WHERE id = ?;"; 
    connection.query(query, params, (err, results) => {
        if (err) {
            return response
            .status(400)
            .json({
                success: false,
                message: "Não foi possível deletar o produto.",
                data: err });
        } else {
        response
        .status(200)
        .json({ 
            success: true,
            message: "Produto deletado.",
            data: results });
        }
    });
});

// Rota para listar os produtos
app.get('/produto/listar', (request, response) => {
    const query = "SELECT * FROM produtos"; // Corrigido para 'produtos'
    connection.query(query, (err, results) => {
        if (err) {
            return response
            .status(400)
            .json({ 
                success: false,
                message: "Produtos não encontrados.",
                data: err });
        } else {
        response
        .status(200)
        .json({ 
            success: true,
            message: "Produtos encontrados.",
            data: results });
        }
    });
});
