/*=========================================
        FAVORITOS PAGE
=========================================*/

const listaFavoritos = document.getElementById("listaFavoritos");
const vazio = document.getElementById("semFavoritos");
const pesquisa = document.getElementById("pesquisaFavoritos");
const limpar = document.getElementById("limparFavoritos");

/*=========================================
        CARREGAR FAVORITOS
=========================================*/

function carregarPaginaFavoritos(filtro = ""){

    if(!listaFavoritos) return;

    listaFavoritos.innerHTML = "";

    const favoritosSalvos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const filmes = catalogo.filter(filme =>{

        const salvo = favoritosSalvos.includes(filme.id);

        const pesquisaOk = filme.nome
            .toLowerCase()
            .includes(filtro.toLowerCase());

        return salvo && pesquisaOk;

    });

    atualizarContadorFavoritos();

    if(filmes.length === 0){

        listaFavoritos.style.display = "none";

        vazio.style.display = "block";

        return;

    }

    listaFavoritos.style.display = "grid";

    vazio.style.display = "none";

    filmes.forEach(filme=>{

        listaFavoritos.innerHTML += `

        <div class="cardFavorito">

            <a href="../${filme.pagina}">

                <img
                    src="${filme.poster}"
                    alt="${filme.nome}">

            </a>

            <div class="infoFavorito">

                <h3>${filme.nome}</h3>

                <p>${filme.ano} • ${filme.tipo}</p>

                <div class="acoesFavorito">

                    <button
                        class="btnAssistir"
                        onclick="window.location='../${filme.pagina}'">

                        ▶ Assistir

                    </button>

                    <button
                        class="btnRemover"
                        onclick="removerFavoritoPagina(${filme.id})">

                        🗑

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

/*=========================================
        REMOVER
=========================================*/

function removerFavoritoPagina(id){

    favoritos = favoritos.filter(f=>f!=id);

    salvarFavoritos();

    carregarPaginaFavoritos(pesquisa.value);

}

/*=========================================
        PESQUISA
=========================================*/

if(pesquisa){

    pesquisa.addEventListener("input",()=>{

        carregarPaginaFavoritos(pesquisa.value);

    });

}

/*=========================================
        LIMPAR
=========================================*/

if(limpar){

    limpar.addEventListener("click",()=>{

        const confirmar = confirm(

            "Deseja remover TODOS os favoritos?"

        );

        if(!confirmar) return;

        favoritos = [];

        salvarFavoritos();

        carregarPaginaFavoritos();

    });

}

/*=========================================
        INICIAR
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    carregarPaginaFavoritos();

});