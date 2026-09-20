/*=========================================
            APP.JS
=========================================*/


/*=========================================
        VERIFICAR SE TEM VÍDEO
=========================================*/

function temVideo(item){

    // FILME
    if(item.tipo === "Filme"){

        return (
            typeof item.video === "string" &&
            item.video.trim() !== ""
        );

    }


    // NOVELA
    if(item.tipo === "Novela"){

        return (
            typeof item.baseVideo === "string" &&
            item.baseVideo.trim() !== ""
        );

    }


    // SÉRIE
    if(item.tipo === "Série"){

        // Não tem temporadas
        if(!Array.isArray(item.temporadas)){
            return false;
        }

        // Procura pelo menos 1 episódio
        // que tenha vídeo
        return item.temporadas.some(temporada =>

            Array.isArray(temporada.episodios) &&

            temporada.episodios.some(episodio =>

                typeof episodio.video === "string" &&
                episodio.video.trim() !== ""

            )

        );

    }


    return false;

}


/*=========================================
        CRIAR CARD
=========================================*/

function criarCard(item){

    let pagina = "pages/filme.html";


    // NOVELA
    if(item.tipo === "Novela"){

        pagina = "pages/novela.html";

    }


    // SÉRIE
    if(item.tipo === "Série"){

        pagina = "pages/serie.html";

    }


    return `

    <a
        href="${pagina}?id=${item.id}"
        class="cardFilme"
    >

        <img
            src="${item.poster || "img/sem-poster.png"}"
            alt="${item.nome}"
            loading="lazy"
            onerror="this.src='img/sem-poster.png'"
        >

    </a>

    `;

}


/*=========================================
        MOSTRAR CATÁLOGO
=========================================*/

function carregarCatalogo(){

    const emAlta = document.getElementById("emAlta");

    const filmes = document.getElementById("filmes");

    const series = document.getElementById("series");

    const barbie = document.getElementById("barbie");

    const novelas = document.getElementById("novelas");

    const infantil = document.getElementById("infantil");


    /*---------------------------------------
        LIMPAR ÁREAS
    ---------------------------------------*/

    if(emAlta)
        emAlta.innerHTML = "";

    if(filmes)
        filmes.innerHTML = "";

    if(series)
        series.innerHTML = "";

    if(barbie)
        barbie.innerHTML = "";

    if(novelas)
        novelas.innerHTML = "";

    if(infantil)
        infantil.innerHTML = "";


    /*---------------------------------------
        PERCORRER CATÁLOGO
    ---------------------------------------*/

    catalogo.forEach(filme => {


        /*
        =====================================
        IMPORTANTE

        SE NÃO TIVER VÍDEO:

        NÃO APARECE NO SITE
        =====================================
        */

        if(!temVideo(filme)){

            return;

        }


        /*-----------------------------------
            EM ALTA
        -----------------------------------*/

        if(emAlta && filme.novo){

            emAlta.innerHTML += criarCard(filme);

        }


        /*-----------------------------------
            FILMES
        -----------------------------------*/

        if(filmes && filme.tipo === "Filme"){

            filmes.innerHTML += criarCard(filme);

        }


        /*-----------------------------------
            SÉRIES
        -----------------------------------*/

        if(series && filme.tipo === "Série"){

            series.innerHTML += criarCard(filme);

        }


        /*-----------------------------------
            NOVELAS
        -----------------------------------*/

        if(novelas && filme.tipo === "Novela"){

            novelas.innerHTML += criarCard(filme);

        }


        /*-----------------------------------
            BARBIE
        -----------------------------------*/

        if(
            barbie &&
            filme.colecao === "Barbie"
        ){

            barbie.innerHTML += criarCard(filme);

        }


        /*-----------------------------------
            INFANTIL
        -----------------------------------*/

        if(
            infantil &&
            Array.isArray(filme.genero) &&
            filme.genero.includes("Infantil")
        ){

            infantil.innerHTML += criarCard(filme);

        }

    });

}


/*=========================================
        ABRIR FILME
=========================================*/

function abrirFilme(id){

    const filme = catalogo.find(
        f => f.id === id
    );


    if(!filme){

        return;

    }


    // Segurança:
    // não deixa abrir conteúdo
    // que não possui vídeo

    if(!temVideo(filme)){

        console.warn(
            "Este conteúdo ainda não possui vídeo:",
            filme.nome
        );

        return;

    }


    registrarFilme(filme);


    /*---------------------------------------
        NOVELA
    ---------------------------------------*/

    if(filme.tipo === "Novela"){

        window.location.href =
            `pages/novela.html?id=${filme.id}`;

        return;

    }


    /*---------------------------------------
        SÉRIE
    ---------------------------------------*/

    if(filme.tipo === "Série"){

        window.location.href =
            `pages/serie.html?id=${filme.id}`;

        return;

    }


    /*---------------------------------------
        FILME
    ---------------------------------------*/

    window.location.href =
        `pages/filme.html?id=${filme.id}`;

}


/*=========================================
        BANNER PRINCIPAL
=========================================*/

function bannerPrincipal(){

    // Pega somente conteúdos
    // que possuem vídeo

    const disponiveis =
        catalogo.filter(
            filme => temVideo(filme)
        );


    if(disponiveis.length === 0){

        return;

    }


    const banner =
        document.querySelector(
            ".bannerPrincipal"
        );


    if(!banner){

        return;

    }


    // Primeiro conteúdo disponível

    const destaque =
        disponiveis[0];


    if(destaque.banner){

        banner.style.backgroundImage =
            `url("${destaque.banner}")`;

    }

}


/*=========================================
        LOADING
=========================================*/

window.addEventListener("load", () => {

    const loading =
        document.getElementById("loading");


    if(loading){

        setTimeout(() => {

            loading.style.opacity = "0";


            setTimeout(() => {

                loading.remove();

            }, 500);

        }, 1200);

    }

});


/*=========================================
        INICIAR SITE
=========================================*/

window.addEventListener("load", () => {

    carregarCatalogo();

    bannerPrincipal();


    if(typeof carregarContinuarAssistindo === "function"){

        carregarContinuarAssistindo();

    }


    if(typeof carregarRecomendacoes === "function"){

        carregarRecomendacoes();

    }


    if(typeof carregarRecomendadoUsuario === "function"){

        carregarRecomendadoUsuario();

    }
carregarContinuarAssistindo();
carregarRecomendacoes();
carregarRecomendadoUsuario();
});