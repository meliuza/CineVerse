/*=========================================
            APP.JS
=========================================*/


/*=========================================
        CONFIGURAÇÃO SUPABASE
=========================================*/

// Seu projeto Supabase
const SUPABASE_URL =
    "https://zwgzxewhpmxyksfripti.supabase.co";

// Bucket onde estão os posters
const SUPABASE_POSTER_BUCKET = "poster";

// Tamanhos que o navegador poderá escolher
// O arquivo original continua sendo apenas UM.
const TAMANHOS_POSTER = [320, 500, 800, 1200];

// Qualidade da imagem transformada
const QUALIDADE_POSTER = 80;


/*=========================================
        ÁREA PRINCIPAL
=========================================*/

const areaFilmes =
    document.getElementById("catalogo");


/*=========================================
        VERIFICAR URL SUPABASE
=========================================*/

function ehImagemSupabase(url){

    if(!url) return false;

    try{

        const imagem = new URL(url);

        return (
            imagem.hostname ===
            "zwgzxewhpmxyksfripti.supabase.co"
        );

    }catch{

        return false;

    }

}


/*=========================================
        PEGAR CAMINHO DO POSTER
=========================================

Exemplo:

Videos/Barbie%20Rapunzel.png

vira:

Barbie Rapunzel.png

Depois usamos esse mesmo arquivo
dentro do bucket "poster".
=========================================*/

function obterCaminhoPoster(url){

    if(!ehImagemSupabase(url)){
        return null;
    }

    try{

        const imagem = new URL(url);

        const marcador =
            "/storage/v1/object/public/";

        const posicao =
            imagem.pathname.indexOf(marcador);

        if(posicao === -1){
            return null;
        }

        const caminho =
            imagem.pathname.substring(
                posicao + marcador.length
            );

        const partes =
            caminho.split("/");

        // Remove o bucket antigo
        partes.shift();

        if(partes.length === 0){
            return null;
        }

        return partes.join("/");

    }catch{

        return null;

    }

}


/*=========================================
        CODIFICAR CAMINHO DO ARQUIVO
=========================================*/

function codificarCaminho(caminho){

    return caminho
        .split("/")
        .map(parte => encodeURIComponent(parte))
        .join("/");

}


/*=========================================
        CRIAR URL TRANSFORMADA
=========================================*/

function criarUrlPoster(urlOriginal, largura){

    const caminho =
        obterCaminhoPoster(urlOriginal);

    // Se não for imagem do Supabase,
    // mantém a imagem original.
    if(!caminho){

        return urlOriginal;

    }

    const caminhoSeguro =
        codificarCaminho(caminho);

    return (
        `${SUPABASE_URL}` +
        `/storage/v1/render/image/public/` +
        `${SUPABASE_POSTER_BUCKET}/` +
        `${caminhoSeguro}` +
        `?width=${largura}` +
        `&quality=${QUALIDADE_POSTER}`
    );

}


/*=========================================
        GERAR SRCSET
=========================================*/

function criarSrcsetPoster(urlOriginal){

    const caminho =
        obterCaminhoPoster(urlOriginal);

    // Imagem que não está no Supabase
    if(!caminho){

        return "";

    }

    return TAMANHOS_POSTER
        .map(largura => {

            const url =
                criarUrlPoster(
                    urlOriginal,
                    largura
                );

            return `${url} ${largura}w`;

        })
        .join(", ");

}


/*=========================================
        URL ORIGINAL
=========================================*/

function obterUrlOriginal(url){

    return url ||
        "img/sem-poster.png";

}


/*=========================================
        CRIAR CARD
=========================================*/

function criarCard(item){

    let pagina =
        "pages/filme.html";


    /*=====================================
            ROTA DE NOVELA
    =====================================*/

    if(item.tipo === "Novela"){

        pagina =
            "pages/novela.html";

    }


    /*=====================================
            POSTER
    =====================================*/

    const posterOriginal =
        obterUrlOriginal(item.poster);


    /*
        Tamanho padrão inicial.

        O navegador poderá trocar automaticamente
        pelo tamanho adequado através do srcset.
    */

    const posterOtimizado =
        criarUrlPoster(
            posterOriginal,
            500
        );


    /*
        Cria as versões virtuais:

        320w
        500w
        800w
        1200w

        Não cria arquivos novos no Storage.
    */

    const posterSrcset =
        criarSrcsetPoster(
            posterOriginal
        );


    /*=====================================
            IMAGEM
    =====================================*/

    let imagemHTML = "";


    if(posterSrcset){

        imagemHTML = `
            <img
                src="${posterOtimizado}"
                srcset="${posterSrcset}"
                sizes="
                    (max-width: 480px) 42vw,
                    (max-width: 768px) 30vw,
                    (max-width: 1200px) 220px,
                    240px
                "
                alt="${item.nome}"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                onerror="
                    this.onerror=null;
                    this.src='${posterOriginal}';
                    this.removeAttribute('srcset');
                "
            >
        `;

    }else{

        /*
            Caso a imagem não seja do Supabase,
            continua funcionando normalmente.
        */

        imagemHTML = `
            <img
                src="${posterOriginal}"
                alt="${item.nome}"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                onerror="
                    this.onerror=null;
                    this.src='img/sem-poster.png';
                "
            >
        `;

    }


    /*=====================================
            CARD FINAL
    =====================================*/

    return `

        <a
            href="${pagina}?id=${item.id}"
            class="cardFilme"
        >

            ${imagemHTML}

        </a>

    `;

}


/*=========================================
        MOSTRAR CATÁLOGO
=========================================*/

function carregarCatalogo(){

    const emAlta =
        document.getElementById("emAlta");

    const filmes =
        document.getElementById("filmes");

    const series =
        document.getElementById("series");

    const barbie =
        document.getElementById("barbie");

    const novelas =
        document.getElementById("novelas");


    /*=====================================
            LIMPAR ÁREAS
    =====================================*/

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


    /*=====================================
            PREENCHER CATÁLOGO
    =====================================*/

    catalogo.forEach(filme => {


        /*=================================
                EM ALTA
        =================================*/

        if(
            emAlta &&
            filme.novo
        ){

            emAlta.innerHTML +=
                criarCard(filme);

        }


        /*=================================
                FILMES
        =================================*/

        if(
            filmes &&
            filme.tipo === "Filme"
        ){

            filmes.innerHTML +=
                criarCard(filme);

        }


        /*=================================
                SÉRIES
        =================================*/

        if(
            series &&
            filme.tipo === "Série"
        ){

            series.innerHTML +=
                criarCard(filme);

        }


        /*=================================
                NOVELAS
        =================================*/

        if(
            novelas &&
            filme.tipo === "Novela"
        ){

            novelas.innerHTML +=
                criarCard(filme);

        }

    });


    /*=====================================
            INFANTIL
    =====================================*/

    const infantil =
        document.getElementById("infantil");


    if(infantil){

        infantil.innerHTML = "";


        catalogo.forEach(filme => {

            if(
                Array.isArray(filme.genero) &&
                filme.genero.includes("Infantil")
            ){

                infantil.innerHTML +=
                    criarCard(filme);

            }

        });

    }

}


/*=========================================
        ABRIR FILME
=========================================*/

function abrirFilme(id){

    const filme =
        catalogo.find(
            f => f.id === id
        );


    if(!filme)
        return;


    registrarFilme(filme);


    if(filme.tipo === "Novela"){

        window.location.href =
            `pages/novela.html?id=${filme.id}`;

    }else{

        window.location.href =
            `pages/filme.html?id=${filme.id}`;

    }

}


/*=========================================
        BANNER PRINCIPAL
=========================================*/

function bannerPrincipal(){

    if(
        !catalogo ||
        catalogo.length === 0
    ){

        return;

    }


    const banner =
        document.querySelector(
            ".bannerPrincipal"
        );


    if(!banner)
        return;


    if(!catalogo[0].banner)
        return;


    banner.style.backgroundImage =
        `url("${catalogo[0].banner}")`;

}


/*=========================================
        LOADING
=========================================*/

window.addEventListener(
    "load",
    () => {

        const loading =
            document.getElementById(
                "loading"
            );


        if(loading){

            setTimeout(
                () => {

                    loading.style.opacity =
                        "0";


                    setTimeout(
                        () => {

                            loading.remove();

                        },
                        500
                    );

                },
                1200
            );

        }

    }
);


/*=========================================
        INICIAR SITE
=========================================*/

carregarCatalogo();

carregarContinuarAssistindo();

carregarRecomendacoes();

carregarRecomendadoUsuario();

bannerPrincipal()