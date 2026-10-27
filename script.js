// MENSAGEM
function mostrarMensagem(mensagem) {
    const mensagemExistente = document.querySelector(".mensagem");

    if (mensagemExistente) {
        mensagemExistente.remove();
    }

    const aviso = document.createElement("div");
    aviso.className = "mensagem";
    aviso.textContent = mensagem;

    document.body.appendChild(aviso);

    setTimeout(function() {
        aviso.remove();
    }, 2500);
}


// CORES
const botoesCor = document.querySelectorAll(".cor");

botoesCor.forEach(function(botao) {
    botao.addEventListener("click", function() {

        const produto = botao.closest(".lista-produtos > div");
        const imagem = produto.querySelector("img");
        const botoesDoProduto = produto.querySelectorAll(".cor");

        imagem.src = botao.dataset.imagem;

        botoesDoProduto.forEach(function(botao) {
            botao.classList.remove("selecionado");
        });

        botao.classList.add("selecionado");
    });
});


// TAMANHOS
const botoesTamanho = document.querySelectorAll(".tamanho");

botoesTamanho.forEach(function(botao) {
    botao.addEventListener("click", function() {

        const produto = botao.closest(".lista-produtos > div");
        const botoesDoProduto = produto.querySelectorAll(".tamanho");

        botoesDoProduto.forEach(function(botao) {
            botao.classList.remove("selecionado");
        });

        botao.classList.add("selecionado");
    });
});

// CARRINHO
function adicionarAoCarrinho(nome, preco, tamanho, cor) {

    const itensCarrinho = document.querySelector("#itens-carrinho");

    // Remove a mensagem de carrinho vazio
    const carrinhoVazio = itensCarrinho.querySelector("p");

    if (carrinhoVazio) {
        carrinhoVazio.remove();
    }

    // Criar o novo item
    const item = document.createElement("div");

    item.classList.add("item-carrinho");

    item.innerHTML = `
        <h3>${nome}</h3>
        <p>Preço: ${preco}</p>
        <p>Tamanho: ${tamanho}</p>
        <p>Cor: ${cor}</p>
    `;

    itensCarrinho.appendChild(item);

    // Mostra o carrinho
    const carrinho = document.querySelector("#carrinho");

console.log("Carrinho encontrado:", carrinho);

carrinho.style.display = "block";
}

// COMPRAR
const botoesComprar = document.querySelectorAll(".comprar");

botoesComprar.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const produto = botao.closest(".lista-produtos > div");

        const nomeProduto = produto.querySelector("h3").textContent;
        const precoProduto = produto.querySelector(".preços").textContent;

        const tamanhoSelecionado = produto.querySelector(".tamanho.selecionado");
        const corSelecionada = produto.querySelector(".cor.selecionado");

        if (!tamanhoSelecionado) {
            mostrarMensagem("Escolha um tamanho antes de comprar.");
            return;
        }

        if (!corSelecionada) {
            mostrarMensagem("Escolha uma cor antes de comprar.");
            return;
        }

        const tamanho = tamanhoSelecionado.textContent;
        const cor = corSelecionada.dataset.cor;

        adicionarAoCarrinho(
            nomeProduto,
            precoProduto,
            tamanho,
            cor
        );

        mostrarMensagem("Produto adicionado ao carrinho!");
    });
});