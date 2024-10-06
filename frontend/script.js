// Abrir e fechar porta da pagina inicial
porta = document.getElementById("fechada")
porta1 = document.getElementById("aberta")
div = document.getElementById("porta")

porta.addEventListener("click", (e) => {
    porta.style.visibility = "hidden"
    porta1.style.visibility = "visible"
})


porta1.addEventListener("click", (e) => {
    porta.style.visibility = "visible"
    porta1.style.visibility = "hidden"
})

// adicionar ao carrinho
function addToCart(nomeProduto, preco) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let produto = carrinho.find(item => item.nome === nomeProduto);
    if (produto) {
        produto.qtd++;
    } else {
        carrinho.push({ nome: nomeProduto, preco: preco, qtd: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${nomeProduto} adicionado ao carrinho!`);
}

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let itensCarrinho = document.querySelector("#itensCarrinho");
    let valorTotal = 0;
    itensCarrinho.innerHTML = '';

    carrinho.forEach(element => {
        let itemProduto = document.createElement('div');
        itemProduto.textContent = `${element.nome} - ${element.qtd} x R$ ${element.preco}`;

        itensCarrinho.appendChild(itemProduto);
        valorTotal += (element.qtd * element.preco);

    });
    document.querySelector("#valorTotal").textContent = valorTotal;
}


if (window.location.pathname.includes('carrinho.html')) {
    carregarCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem("carrinho");
}



// cadastro
async function cadastrar(event) {
    event.preventDefault();

    const nome = document.getElementById('nome_login').value;
    const email = document.getElementById('email_login').value; 
    const senha = document.getElementById('senha_login').value;

    const data = { nome, email, senha };

    const response = await fetch('http://localhost:3000/Usuarios/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const results = await response.json();

    console.log(results);

    if (results.success) {
        alert(results.message);
    } else {
        alert(results.message); 
    }
}

// login
async function Logar(event) {
    event.preventDefault();

    const nome = document.getElementById('name_login').value;
    const email = document.getElementById('email_login').value; 

    const data = { nome, email };

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    let results = await response.json();

    if (results.success) {
        let userData = results.data;
        localStorage.setItem('informacoes', JSON.stringify(userData));

        window.location.href = "cadastroProduto.html";

        console.log(userData); 
        alert(results.message);
    } else {
        alert(results.message);
    }
}


function Sair(event) {
    localStorage.removeItem('informacoes');
    window.location.href = "login.html";
}

window.addEventListener("load", () => {
    if (localStorage.getItem("informacoes")) {
        let html = document.getElementById('informacoes');
        let dados = JSON.parse(localStorage.getItem('informacoes'));

        dados.perfil === 'admin'
            ? document.getElementById('cadastrarProduto').style.display = 'block'
            : document.getElementById('cadastrarProduto').style.display = 'none';

        html.innerHTML = `<div style="display: flex; flex-direction: column; align-items: end;"> id: ${dados.id} perfil: ${dados.perfil}</div>`;

        html.style.display = 'block';
    }
});



function cadastrarProduto(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nomeProduto').value;
    const valor = document.getElementById('valorProduto').value;
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];


    const formData = new FormData();
    formData.append('name', nome);
    formData.append('valor', valor);
    formData.append('imagem', file);

    fetch('/produto/cadastrar', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Produto cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar produto.');
        }
    })
    .catch(error => console.error('Erro:', error));
}



// nesta parte não conseguimmos entendder muito bem como funcionava, então pedimos ajuda do chatgpt 
// para explicar como o código funcionava e como implementar ele

// Função para carregar produtos do banco de dados
async function carregarProdutos() {
    const response = await fetch('http://localhost:3000/produtos');
    const produtos = await response.json();

    const produtosDiv = document.getElementById("produtos");
    produtosDiv.innerHTML = ''; // Limpa a div antes de carregar

    produtos.forEach(produto => {
        const card = `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${produto.imagem}" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
                    <a href="#" class="btn btn-primary">Adicionar ao Carrinho</a>
                </div>
            </div>`;
        produtosDiv.innerHTML += card; 
    });
}

// Função para cadastrar produto
async function cadastrarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeProduto').value;
    const preco = document.getElementById('precoProduto').value;
    const imagem = document.getElementById('imagemProduto').files[0];

    const data = { nome, preco, imagem }; 
    const response = await fetch('http://localhost:3000/produto/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) 
    });

    const result = await response.json();
    if (result.success) {
        alert(result.message);
        carregarProdutos(); 
    } else {
        alert(result.message);
    }
}


window.addEventListener("load", () => {
    carregarProdutos();

    if (localStorage.getItem("informacoes")) {
        const dados = JSON.parse(localStorage.getItem('informacoes'));
        if (dados.perfil === 'admin') {
            document.getElementById('cadastrarProduto').style.display = 'block';
        }
    }
});

// Carrega os produtos ao iniciar a página
window.addEventListener("load", () => {
    carregarProdutos();
});
