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

function criarCard(filme){

    let pagina = "pages/filme.html";

    if(filme.tipo === "Novela"){
        pagina = "pages/novela.html";
    }

    if(filme.tipo === "Série"){
        pagina = "pages/serie.html";
    }

    /*=====================================
        PEGAR PROGRESSO
    =====================================*/

    let progresso = 0;
    let tempoAssistido = 0;
    let duracaoTotal = 0;

    if(typeof obterHistorico === "function"){

        const historico =
            obterHistorico() || [];

        const registro =
            historico.find(item =>
                Number(item.id) === Number(filme.id)
            );

        if(registro){

            tempoAssistido =
                Number(registro.tempo) || 0;

            duracaoTotal =
                Number(registro.duracao) || 0;

            if(
                duracaoTotal > 0 &&
                tempoAssistido > 0
            ){

                progresso =
                    (tempoAssistido / duracaoTotal) * 100;

                progresso =
                    Math.min(
                        100,
                        Math.max(0, progresso)
                    );
            }
        }
    }


    /*=====================================
        TEXTO DO PROGRESSO
    =====================================*/

    let textoProgresso = "";

    if(progresso > 0){

        const restante =
            Math.max(
                0,
                duracaoTotal - tempoAssistido
            );

        const minutosRestantes =
            Math.ceil(restante / 60);

        if(minutosRestantes > 0){

            textoProgresso =
                `Faltam ${minutosRestantes} min`;

        }else{

            textoProgresso =
                "Quase terminado";

        }
    }


    /*=====================================
        CARD
    =====================================*/

    return `
        <a
            href="${pagina}?id=${filme.id}"
            class="cardFilme"
            data-filme-id="${filme.id}"
        >

            <div class="cardPoster">

                <img
                    src="${filme.poster || "img/sem-poster.png"}"
                    alt="${filme.nome}"
                    loading="lazy"
                    onerror="this.src='img/sem-poster.png'"
                >

                ${
                    progresso > 0
                    ? `
                        <div class="progressoCard">

                            <div
                                class="progressoCardBarra"
                                style="width:${progresso}%"
                            ></div>

                        </div>

                        <div class="progressoCardTexto">
                            ${Math.round(progresso)}% • ${textoProgresso}
                        </div>
                    `
                    : ""
                }

            </div>

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

const romance = document.getElementById("romance");
const comedia = document.getElementById("comedia");
const terror = document.getElementById("terror");
const acao = document.getElementById("acao");
const ficcaoCientifica = document.getElementById("ficcaoCientifica");
const fantasia = document.getElementById("fantasia");

const filmesJaExibidos = new Set();

function adicionarFilmeUnico(elemento, filme){
    if(!elemento) return;

    const id = Number(filme.id);

    if(filmesJaExibidos.has(id)){
        return;
    }

    filmesJaExibidos.add(id);
    elemento.innerHTML += criarCard(filme);
}
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

    if(romance)
        romance.innerHTML = "";

    if(comedia)
        comedia.innerHTML = "";

    if(terror)
        terror.innerHTML = "";

    if(acao)
        acao.innerHTML = "";

    if(ficcaoCientifica)
        ficcaoCientifica.innerHTML = "";

    if(fantasia)
        fantasia.innerHTML = "";

    /*---------------------------------------
        PERCORRER CATÁLOGO
    ---------------------------------------*/

    catalogo.forEach(filme => {

        if(!temVideo(filme)){
            return;
        }

        /*-----------------------------------
            EM ALTA
        -----------------------------------*/

        if(emAlta && filme.novo){

            emAlta.innerHTML += criarCard(filme);
            return;

        }


        /*-----------------------------------
            NOVELAS
        -----------------------------------*/

        if(novelas && filme.tipo === "Novela"){

            novelas.innerHTML += criarCard(filme);
            return;

        }


        /*-----------------------------------
            SÉRIES
        -----------------------------------*/

        if(series && filme.tipo === "Série"){

            series.innerHTML += criarCard(filme);
            return;

        }


        /*-----------------------------------
            BARBIE
        -----------------------------------*/

        if(
            barbie &&
            filme.colecao === "Barbie"
        ){

            barbie.innerHTML += criarCard(filme);
            return;

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
            return;

        }


        /*-----------------------------------
            ROMANCE
        -----------------------------------*/

        if(
            romance &&
            Array.isArray(filme.genero) &&
            filme.genero.includes("Romance")
        ){

            romance.innerHTML += criarCard(filme);
            return;

        }


        /*-----------------------------------
            COMÉDIA
        -----------------------------------*/

        if(
            comedia &&
            Array.isArray(filme.genero) &&
            filme.genero.includes("Comédia")
        ){

            comedia.innerHTML += criarCard(filme);
            return;

        }


        /*-----------------------------------
            TERROR
        -----------------------------------*/

        if(
            terror &&
            Array.isArray(filme.genero) &&
            filme.genero.includes("Terror")
        ){

            terror.innerHTML += criarCard(filme);
            return;

        }


        /*-----------------------------------
            AÇÃO
        -----------------------------------*/

        if(
            acao &&
            Array.isArray(filme.genero) &&
            filme.genero.includes("Ação")
        ){

            acao.innerHTML += criarCard(filme);
            return;

        }


        /*-----------------------------------
            FICÇÃO CIENTÍFICA
        -----------------------------------*/

        if(
            ficcaoCientifica &&
            Array.isArray(filme.genero) &&
            filme.genero.includes("Ficção Científica")
        ){

            ficcaoCientifica.innerHTML += criarCard(filme);
            return;

        }


        /*-----------------------------------
            FANTASIA
        -----------------------------------*/

        if(
            fantasia &&
            Array.isArray(filme.genero) &&
            filme.genero.includes("Fantasia")
        ){

            fantasia.innerHTML += criarCard(filme);
            return;

        }


        /*-----------------------------------
            FILMES
        -----------------------------------*/

        if(filmes && filme.tipo === "Filme"){

            filmes.innerHTML += criarCard(filme);
            return;

        }

    });

}

/*=========================================
        POPUP DE DETALHES
=========================================*/

function criarPopupDetalhes(){

    if(document.getElementById("popupDetalhesFilme")){
        return;
    }

    const popup = document.createElement("div");

    popup.id = "popupDetalhesFilme";
    popup.className = "popup-detalhes-filme";

    popup.innerHTML = `
        <div class="popup-detalhes-backdrop"></div>

        <div class="popup-detalhes-caixa">

            <button
                class="popup-detalhes-fechar"
                type="button"
            >
                ✕
            </button>


            <!-- TRAILER -->

            <div
                class="popup-detalhes-video"
                id="popupTrailerArea"
            >

                <img
                    id="popupTrailerPoster"
                    src="img/sem-poster.png"
                    alt=""
                >

                <div
                    class="popup-sem-trailer"
                    id="popupSemTrailer"
                >
                    <span>🎬</span>
                    <p>Trailer não disponível</p>
                </div>

            </div>


            <!-- INFORMAÇÕES -->

            <div class="popup-detalhes-conteudo">

                <div class="popup-detalhes-poster">

                    <img
                        id="popupPoster"
                        src="img/sem-poster.png"
                        alt=""
                    >

                </div>


                <div class="popup-detalhes-info">

                    <h2 id="popupNome"></h2>


                    <div
                        class="popup-detalhes-meta"
                        id="popupMeta"
                    ></div>


                    <div
                        class="popup-detalhes-generos"
                        id="popupGeneros"
                    ></div>


                    <p
                        class="popup-detalhes-sinopse"
                        id="popupSinopse"
                    ></p>


                    <div class="popup-detalhes-botoes">

                        <button
                            class="popup-btn-assistir"
                            id="popupAssistir"
                            type="button"
                        >
                            ▶ Assistir agora
                        </button>


                        <button
                            class="popup-btn-favorito"
                            id="popupFavoritar"
                            type="button"
                        >
                            ♡ Favoritar
                        </button>

                    </div>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(popup);


    // FECHAR

    popup
        .querySelector(".popup-detalhes-fechar")
        .addEventListener(
            "click",
            fecharPopupDetalhes
        );


    popup
        .querySelector(".popup-detalhes-backdrop")
        .addEventListener(
            "click",
            fecharPopupDetalhes
        );


    // ESC

    document.addEventListener(
        "keydown",
        evento => {

            if(evento.key === "Escape"){
                fecharPopupDetalhes();
            }

        }
    );

}


/*=========================================
        CAMINHO DA PÁGINA
=========================================*/

function caminhoPaginaPopup(item){

    let pagina = "pages/filme.html";


    if(item.tipo === "Novela"){
        pagina = "pages/novela.html";
    }


    if(item.tipo === "Série"){
        pagina = "pages/serie.html";
    }


    /*
        Se já estivermos dentro de /pages/,
        precisa voltar uma pasta.
    */

    if(
        window.location.pathname.includes("/pages/")
    ){

        return `../${pagina}?id=${item.id}`;

    }


    return `${pagina}?id=${item.id}`;

}


/*=========================================
        ABRIR POPUP
=========================================*/

function abrirPopupDetalhes(id){

    const filme = catalogo.find(
        item =>
            String(item.id) === String(id)
    );


    if(!filme){
        return;
    }


    /*
        Não abre conteúdo sem vídeo.
    */

    if(!temVideo(filme)){
        return;
    }


    criarPopupDetalhes();


    const popup =
        document.getElementById(
            "popupDetalhesFilme"
        );


    const poster =
        filme.poster ||
        "img/sem-poster.png";


    const banner =
        filme.banner ||
        filme.poster ||
        "img/sem-poster.png";


    /* NOME */

    document.getElementById(
        "popupNome"
    ).textContent =
        filme.nome || "Sem título";


    /* POSTER */

    document.getElementById(
        "popupPoster"
    ).src = poster;


    /* BANNER DO TRAILER */

    document.getElementById(
        "popupTrailerPoster"
    ).src = banner;


    /*=====================================
            META
    =====================================*/

    const meta = [];


    if(filme.ano){

        meta.push(
            `📅 ${filme.ano}`
        );

    }


    if(filme.classificacao){

        meta.push(
            `🔞 ${filme.classificacao}`
        );

    }


    if(filme.duracao){

        meta.push(
            `⏱️ ${filme.duracao}`
        );

    }


    if(filme.tipo){

        meta.push(
            `🎬 ${filme.tipo}`
        );

    }


    if(filme.idioma){

        meta.push(
            filme.idioma
        );

    }


    document.getElementById(
        "popupMeta"
    ).innerHTML =

        meta
            .map(
                item =>
                    `<span>${item}</span>`
            )
            .join("");


    /*=====================================
            GÊNEROS
    =====================================*/

    const generos =
        Array.isArray(filme.genero)
            ? filme.genero
            : [];


    document.getElementById(
        "popupGeneros"
    ).innerHTML =

        generos
            .map(
                genero =>
                    `<span>${genero}</span>`
            )
            .join("");


    /*=====================================
            SINOPSE
    =====================================*/

    document.getElementById(
        "popupSinopse"
    ).textContent =

        filme.sinopse ||
        "Sinopse não disponível.";


    /*=====================================
            TRAILER
    =====================================*/

    const area =
        document.getElementById(
            "popupTrailerArea"
        );


    const posterTrailer =
        document.getElementById(
            "popupTrailerPoster"
        );


    const semTrailer =
        document.getElementById(
            "popupSemTrailer"
        );


    /*
        Remove trailer anterior.
    */

    const antigo =
        area.querySelector("iframe");


    if(antigo){
        antigo.remove();
    }


    semTrailer.style.display = "none";

    posterTrailer.style.display = "block";


    /*
        Para colocar trailer no catálogo:

        trailer:
        "https://www.youtube.com/watch?v=XXXXXXXX"

        OU somente:

        trailer: "XXXXXXXX"
    */

    if(
        typeof filme.trailer === "string" &&
        filme.trailer.trim() !== ""
    ){

        const trailer =
            filme.trailer.trim();


        let videoId = "";


        /* YouTube normal */

        if(
            trailer.includes(
                "youtube.com/watch?v="
            )
        ){

            videoId =
                trailer
                    .split("v=")[1]
                    .split("&")[0];

        }


        /* YouTube curto */

        else if(
            trailer.includes("youtu.be/")
        ){

            videoId =
                trailer
                    .split("youtu.be/")[1]
                    .split("?")[0];

        }


        /* Apenas ID */

        else if(
            !trailer.includes("/") &&
            !trailer.includes("http")
        ){

            videoId = trailer;

        }


        if(videoId){

            const iframe =
                document.createElement(
                    "iframe"
                );


            iframe.src =
                `https://www.youtube.com/embed/${videoId}?autoplay=1`;


            iframe.title =
                `Trailer de ${filme.nome}`;


            iframe.allow =
                "autoplay; encrypted-media; picture-in-picture";


            iframe.allowFullscreen = true;


            posterTrailer.style.display =
                "none";


            area.appendChild(iframe);

        }
        else{

            semTrailer.style.display =
                "flex";

        }

    }
    else{

        semTrailer.style.display =
            "flex";

    }


    /*=====================================
            BOTÃO ASSISTIR
    =====================================*/

    document.getElementById(
        "popupAssistir"
    ).onclick = () => {


        fecharPopupDetalhes();


        if(
            typeof registrarFilme ===
            "function"
        ){

            registrarFilme(filme);

        }


        window.location.href =
            caminhoPaginaPopup(filme);

    };


    /*=====================================
            BOTÃO FAVORITO
    =====================================*/

    document.getElementById(
        "popupFavoritar"
    ).onclick = () => {


        let favoritos =
            JSON.parse(
                localStorage.getItem(
                    "cineverse_favoritos"
                )
            ) || [];


        const existe =
            favoritos.some(
                item =>
                    String(item.id) ===
                    String(filme.id)
            );


        if(!existe){

            favoritos.push(filme);


            localStorage.setItem(
                "cineverse_favoritos",
                JSON.stringify(favoritos)
            );

        }


        document.getElementById(
            "popupFavoritar"
        ).textContent =
            "♥ Favoritado";

    };


    /*=====================================
            MOSTRAR POPUP
    =====================================*/

    popup.classList.add("ativo");


    document.body.classList.add(
        "popup-aberto"
    );

}


/*=========================================
        FECHAR POPUP
=========================================*/

function fecharPopupDetalhes(){

    const popup =
        document.getElementById(
            "popupDetalhesFilme"
        );


    if(!popup){
        return;
    }


    popup.classList.remove(
        "ativo"
    );


    document.body.classList.remove(
        "popup-aberto"
    );


    const iframe =
        popup.querySelector("iframe");


    if(iframe){
        iframe.remove();
    }

}


/*=========================================
        ATIVAR POPUP NOS CARDS
=========================================*/

function ativarPopupNosCards(){

    document.addEventListener(
        "click",
        evento => {


            const card =
                evento.target.closest(
                    ".cardFilme"
                );


            if(!card){
                return;
            }


            const id =
                card.dataset.filmeId;


            if(!id){
                return;
            }


            const filme =
                catalogo.find(
                    item =>
                        String(item.id) ===
                        String(id)
                );


            if(
                !filme ||
                !temVideo(filme)
            ){

                return;

            }


            /*
                Impede o link normal
                do card.

                Agora abre o popup.
            */

            evento.preventDefault();


            abrirPopupDetalhes(id);

        }
    );

}


/*=========================================
        INICIAR POPUP
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        criarPopupDetalhes();

        ativarPopupNosCards();

    }
);


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

    if(typeof carregarCatalogo === "function"){
        carregarCatalogo();
    }

    if(typeof bannerPrincipal === "function"){
        bannerPrincipal();
    }

    if(typeof carregarContinuarAssistindo === "function"){
        carregarContinuarAssistindo();
    }

    if(typeof carregarRecomendacoes === "function"){
        carregarRecomendacoes();
    }

    if(typeof carregarRecomendadoUsuario === "function"){
        carregarRecomendadoUsuario();
    }

});