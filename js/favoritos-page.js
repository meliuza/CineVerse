const listaFavoritos =
    document.getElementById("listaFavoritos");

const vazio =
    document.getElementById("semFavoritos");

const pesquisa =
    document.getElementById("pesquisaFavoritos");

const limpar =
    document.getElementById("limparFavoritos");


function paginaDoFavorito(filme){

    if(filme.tipo === "Novela"){
        return `pages/novela.html?id=${filme.id}`;
    }

    if(filme.tipo === "Série"){
        return `pages/serie.html?id=${filme.id}`;
    }

    return `pages/filme.html?id=${filme.id}`;

}


function carregarPaginaFavoritos(filtro = ""){

    if(!listaFavoritos) return;

    listaFavoritos.innerHTML = "";

    const favoritosSalvos =
        typeof obterFavoritos === "function"
            ? obterFavoritos()
            : [];

    const filmes = catalogo.filter(filme => {

        const salvo =
            favoritosSalvos.some(item =>
                Number(item.id) === Number(filme.id)
            );

        const pesquisaOk =
            filme.nome
                .toLowerCase()
                .includes(filtro.toLowerCase());

        return salvo && pesquisaOk;

    });


    if(typeof atualizarContadorFavoritos === "function"){
        atualizarContadorFavoritos();
    }


    if(filmes.length === 0){

        listaFavoritos.style.display = "none";

        if(vazio){
            vazio.style.display = "block";
        }

        return;

    }


    listaFavoritos.style.display = "grid";

    if(vazio){
        vazio.style.display = "none";
    }


    filmes.forEach(filme => {

        const pagina =
            paginaDoFavorito(filme);

        const card =
            document.createElement("div");

        card.className =
            "cardFavorito";


        card.innerHTML = `

            <a href="${pagina}">

                <img
                    src="${filme.poster || "img/sem-poster.png"}"
                    alt="${filme.nome}"
                    loading="lazy"
                    onerror="this.src='img/sem-poster.png'"
                >

            </a>

            <div class="infoFavorito">

                <h3>
                    ${filme.nome}
                </h3>

                <p>
                    ${filme.ano} • ${filme.tipo}
                </p>

                <div class="acoesFavorito">

                    <button
                        class="btnAssistir"
                        type="button">

                        ▶ Assistir

                    </button>

                    <button
                        class="btnRemover"
                        type="button">

                        🗑

                    </button>

                </div>

            </div>

        `;


        const btnAssistir =
            card.querySelector(".btnAssistir");

        btnAssistir.addEventListener(
            "click",
            () => {

                window.location.href =
                    pagina;

            }
        );


        const btnRemover =
            card.querySelector(".btnRemover");

        btnRemover.addEventListener(
            "click",
            (e) => {

                e.preventDefault();
                e.stopPropagation();

                removerFavoritoPagina(
                    filme.id
                );

            }
        );


        listaFavoritos.appendChild(card);

    });

}


function removerFavoritoPagina(id){

    if(typeof removerFavorito === "function"){

        removerFavorito(id);

    }

    carregarPaginaFavoritos(
        pesquisa ? pesquisa.value : ""
    );

}


if(pesquisa){

    pesquisa.addEventListener(
        "input",
        () => {

            carregarPaginaFavoritos(
                pesquisa.value
            );

        }
    );

}


if(limpar){

    limpar.addEventListener(
        "click",
        () => {

            const confirmar =
                confirm(
                    "Deseja remover TODOS os favoritos?"
                );

            if(!confirmar) return;

            const lista = [];

            if(typeof salvarFavoritos === "function"){

                salvarFavoritos(lista);

            }

            carregarPaginaFavoritos();

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarPaginaFavoritos();

    }
);