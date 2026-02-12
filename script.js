async function carregarArtigos() {
    const response = await fetch("artigos.json");
    return await response.json();
}

function recomendar(tagsAtuais, artigos, idAtual) {
    const recomendacoes = document.getElementById("recomendacoes");
    recomendacoes.innerHTML = "";

    let pontuados = artigos
        .filter(a => a.id !== idAtual)
        .map(a => {
            let score = a.tags.filter(tag => tagsAtuais.includes(tag)).length;
            return { ...a, score };
        })
        .sort((a,b) => b.score - a.score);

    pontuados.slice(0,3).forEach(a => {
        recomendacoes.innerHTML += `
            <p><a href="artigo.html?id=${a.id}">${a.titulo}</a></p>
        `;
    });
}

async function carregarFeed() {
    const artigos = await carregarArtigos();
    const feed = document.getElementById("feed");

    if (!feed) return;

    artigos.forEach(artigo => {
        feed.innerHTML += `
            <a href="artigo.html?id=${artigo.id}" class="card">
                <img src="${artigo.imagem}">
                <div class="card-content">
                    <h2>${artigo.titulo}</h2>
                    <p>${artigo.resumo}</p>
                </div>
            </a>
        `;
    });
}

async function carregarArtigoIndividual() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const artigos = await carregarArtigos();
    const artigo = artigos.find(a => a.id === id);

    const container = document.getElementById("artigoContainer");

    if (artigo && container) {
        container.innerHTML = `
            <h1>${artigo.titulo}</h1>
            <img src="${artigo.imagem}">
            <div class="image-description">${artigo.descricaoImagem}</div>
            <div class="content">${artigo.conteudo}</div>
            <h3>Referências</h3>
            ${artigo.referencias}
        `;
    }
}

carregarFeed();
carregarArtigoIndividual();