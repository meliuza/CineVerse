/*=========================================
            FILME.JS
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
            PEGAR ID DA URL
    =========================================*/

    const parametros = new URLSearchParams(window.location.search);

    const id = Number(parametros.get("id"));

    /*=========================================
            PROCURAR FILME
    =========================================*/

    const filme = catalogo.find(f => f.id === id);

    if(!filme){

        document.body.innerHTML = `
            <h1 style="color:white;text-align:center;margin-top:100px;">
                Filme não encontrado 😢
            </h1>
        `;

        return;

    }

    /*=========================================
            TÍTULO
    =========================================*/

    document.title = filme.nome + " - CineVerse";

    document.getElementById("tituloPagina").innerHTML = filme.nome;

    /*=========================================
            BANNER
    =========================================*/

    const banner = document.getElementById("bannerFilme");

    banner.style.backgroundImage = `url(${filme.banner})`;

    banner.style.backgroundSize = "cover";

    banner.style.backgroundPosition = "center";

    /*=========================================
            POSTER
    =========================================*/

    document.getElementById("posterFilme").src = filme.poster;

    document.getElementById("posterFilme").alt = filme.nome;

    /*=========================================
            NOME
    =========================================*/

    document.getElementById("nomeFilme").innerHTML = filme.nome;

    /*=========================================
            INFORMAÇÕES
    =========================================*/

    document.getElementById("informacoesFilme").innerHTML = `

        ⭐ ${filme.nota}

        •

        ${filme.ano}

        •

        ${filme.duracao}

        •

        ${filme.genero.join(" • ")}

    `;

    /*=========================================
            SINOPSE
    =========================================*/

    document.getElementById("sinopseFilme").innerHTML = filme.sinopse;

    /*=========================================
            PLAYER
    =========================================*/

    document.getElementById("playerFilme").src = filme.video;

    /*=========================================
            FAVORITOS
    =========================================*/

    const btn = document.getElementById("btnFavoritoFilme");

    btn.dataset.id = filme.id;

    atualizar();

    btn.addEventListener("click",()=>{

        alternarFavorito(filme.id);

        atualizar();

    });

    function atualizar(){

        if(favoritoExiste(filme.id)){

            btn.innerHTML="❤️ Favoritado";

            btn.classList.add("ativo");

        }else{

            btn.innerHTML="🤍 Favoritar";

            btn.classList.remove("ativo");

        }

    }

});