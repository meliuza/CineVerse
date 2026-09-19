/*=========================================
        FAVORITOS PAGE
=========================================*/

const listaFavoritos =
    document.getElementById("listaFavoritos");

const vazio =
    document.getElementById("semFavoritos");

const pesquisa =
    document.getElementById("pesquisaFavoritos");

const limpar =
    document.getElementById("limparFavoritos");


/*=========================================
        DESCOBRIR PÁGINA DO ITEM
=========================================*/

function paginaDoFavorito(filme){

    if(filme.tipo === "Novela"){

        return `pages/novela.html?id=${filme.id}`;

    }

    if(filme.tipo === "Série"){

        return `pages/serie.html?id=${filme.id}`;

    }

    return `pages/filme.html?id=${filme.id}`;

}


/*=========================================
        CARREGAR FAVORITOS
=========================================*/

function carregarPaginaFavoritos(filtro = ""){

    if(!listaFavoritos) return;

    listaFavoritos.innerHTML = "";

    const favoritosSalvos =
        JSON.parse(
            localStorage.getItem("favoritos")
        ) || [];


    const filmes = catalogo.filter(filme => {

        const salvo =
            favoritosSalvos.includes(filme.id);

        const pesquisaOk =
            filme.nome
            .toLowerCase()
            .includes(
                filtro.toLowerCase()
            );

        return salvo && pesquisaOk;

    });


    /* CONTADOR */

    if(typeof atualizarContadorFavoritos === "function"){

        atualizarContadorFavoritos();

    }


    /* NENHUM FAVORITO */

    if(filmes.length === 0){

        listaFavoritos.style.display = "none";

        if(vazio){

            vazio.style.display = "block";

        }

        return;

    }


    /* MOSTRAR LISTA */

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


        /* BOTÃO ASSISTIR */

        const btnAssistir =
            card.querySelector(".btnAssistir");

        btnAssistir.addEventListener(
            "click",
            () => {

                window.location.href =
                    pagina;

            }
        );


        /* BOTÃO REMOVER */

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


/*=========================================
        REMOVER FAVORITO
=========================================*/

function removerFavoritoPagina(id){

    if(typeof favoritos !== "undefined"){

        favoritos =
            favoritos.filter(
                f => Number(f) !== Number(id)
            );

    }else{

        favoritos =
            JSON.parse(
                localStorage.getItem("favoritos")
            ) || [];

        favoritos =
            favoritos.filter(
                f => Number(f) !== Number(id)
            );

    }


    if(typeof salvarFavoritos === "function"){

        salvarFavoritos();

    }else{

        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );

    }


    carregarPaginaFavoritos(
        pesquisa ? pesquisa.value : ""
    );

}


/*=========================================
        PESQUISA
=========================================*/

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


/*=========================================
        LIMPAR TODOS
=========================================*/

if(limpar){

    limpar.addEventListener(
        "click",
        () => {

            const confirmar =
                confirm(
                    "Deseja remover TODOS os favoritos?"
                );


            if(!confirmar) return;


            favoritos = [];


            if(typeof salvarFavoritos === "function"){

                salvarFavoritos();

            }else{

                localStorage.setItem(
                    "favoritos",
                    JSON.stringify([])
                );

            }


            carregarPaginaFavoritos();

        }
    );

}


/*=========================================
        INICIAR
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarPaginaFavoritos();

    }
);