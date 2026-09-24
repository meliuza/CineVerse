/*=========================================
            CATEGORIA.JS
=========================================*/


const parametros =
    new URLSearchParams(window.location.search);

const categoria =
    parametros.get("categoria") || "Filmes";

let lista = [];


/*=========================================
        ELEMENTOS
=========================================*/

const titulo =
    document.getElementById("nomeCategoria");

const tipo =
    document.getElementById("tipoCategoria");

const quantidade =
    document.getElementById("quantidadeCategoria");

const area =
    document.getElementById("listaCategoria");

const pesquisa =
    document.getElementById("pesquisaCategoria");

const ordenacao =
    document.getElementById("ordenacao");


/*=========================================
        HERO
=========================================*/

titulo.innerHTML = categoria;

document.title =
    categoria + " | CineVerse";


/*=========================================
        VERIFICAR VÍDEO
=========================================*/

function temVideo(item){

    /*---------------------------------------
        FILME
    ---------------------------------------*/

    if(item.tipo === "Filme"){

        return (
            typeof item.video === "string" &&
            item.video.trim() !== ""
        );

    }


    /*---------------------------------------
        NOVELA
    ---------------------------------------*/

    if(item.tipo === "Novela"){

        return (
            typeof item.baseVideo === "string" &&
            item.baseVideo.trim() !== ""
        );

    }


    /*---------------------------------------
        SÉRIE
    ---------------------------------------*/

    if(item.tipo === "Série"){

        if(!Array.isArray(item.temporadas)){

            return false;

        }


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
        FILTRAR
=========================================*/

function filtrarCategoria(){

    const normalizar = texto =>
        String(texto || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\+/g, " ")
            .trim()
            .toLowerCase();

    const busca = normalizar(categoria);

    if(busca === "em alta"){

        lista = catalogo.filter(item =>
            item.novo === true
        );

    }
    else if(busca === "filmes"){

        lista = catalogo.filter(item =>
            normalizar(item.tipo) === "filme"
        );

    }
    else if(busca === "series"){

        lista = catalogo.filter(item =>
            normalizar(item.tipo) === "serie"
        );

    }
    else if(busca === "novelas"){

        lista = catalogo.filter(item =>
            normalizar(item.tipo) === "novela"
        );

    }
    else{

        lista = catalogo.filter(item => {

            const colecao = normalizar(item.colecao);
            const categoriaItem = normalizar(item.categoria);
            const nome = normalizar(item.nome);

            const generos = Array.isArray(item.genero)
                ? item.genero.map(g => normalizar(g))
                : [];

            return (
                colecao === busca ||
                categoriaItem === busca ||
                generos.includes(busca) ||
                nome === busca
            );

        });

    }

    lista = lista.filter(item => temVideo(item));

    lista.sort((a, b) =>
        Number(b.ano || 0) - Number(a.ano || 0)
    );

    atualizarQuantidade();
    desenhar();

}

/*=========================================
        QUANTIDADE
=========================================*/

function atualizarQuantidade(){

    quantidade.innerHTML =
        `${lista.length} título(s)`;

}


/*=========================================
        DESENHAR
=========================================*/

function desenhar(){

    area.innerHTML = "";


    if(lista.length === 0){

        area.innerHTML = `

        <div class="semResultado">

            Nenhum conteúdo encontrado.

        </div>

        `;

        return;

    }


    lista.forEach(item => {


        /*-----------------------------------
            PÁGINA
        -----------------------------------*/

        let pagina = "filme.html";

        if(item.tipo === "Novela"){
            pagina = "novela.html";
        }

        if(item.tipo === "Série"){
            pagina = "serie.html";
        }


        /*-----------------------------------
            CARD
        -----------------------------------*/

        area.innerHTML += `

            <a

                href="${pagina}?id=${item.id}"

                class="cardFilme"

                data-filme-id="${item.id}"

            >

            <img

                src="${item.poster || "../img/sem-poster.png"}"

                alt="${item.nome}"

                loading="lazy"

                onerror="this.src='../img/sem-poster.png'"

            >

            <div class="cardInfo">

                <h3>

                    ${item.nome}

                </h3>

                <p>

                    ⭐ ${item.nota || "-"}

                </p>

            </div>

        </a>

        `;

    });
ativarPopupCategoria();
}

// =====================================================
// POPUP NOS CARDS DA CATEGORIA
// =====================================================

function ativarPopupCategoria(){

    document.querySelectorAll(".cardFilme").forEach(card => {

        card.addEventListener("click", function(e){

            e.preventDefault();

            const id = Number(this.dataset.filmeId);

            if(typeof abrirPopupDetalhes === "function"){
                abrirPopupDetalhes(id);
                return;
            }

            window.location.href = this.href;

        });

    });

}


/*=========================================
        PESQUISA
=========================================*/

if(pesquisa){

    pesquisa.addEventListener("input", () => {


        const texto =
            pesquisa.value.toLowerCase();


        const cards =
            area.querySelectorAll(".cardFilme");


        cards.forEach(card => {


            const nome =
                card.querySelector("h3")
                .innerHTML
                .toLowerCase();


            card.style.display =

                nome.includes(texto)

                ? "block"

                : "none";

        });

    });

}


/*=========================================
        ORDENAÇÃO
=========================================*/

if(ordenacao){

    ordenacao.addEventListener("change", () => {


        switch(ordenacao.value){


            /*--------------------------------
                MELHOR NOTA
            --------------------------------*/

            case "nota":

                lista.sort(
                    (a,b) =>
                        Number(b.nota || 0) -
                        Number(a.nota || 0)
                );

            break;


            /*--------------------------------
                MAIS NOVOS
            --------------------------------*/

            case "novo":

                lista.sort(
                    (a,b) =>
                        Number(b.ano || 0) -
                        Number(a.ano || 0)
                );

            break;


            /*--------------------------------
                A → Z
            --------------------------------*/

            case "az":

                lista.sort(
                    (a,b) =>
                        a.nome.localeCompare(b.nome)
                );

            break;


            /*--------------------------------
                Z → A
            --------------------------------*/

            case "za":

                lista.sort(
                    (a,b) =>
                        b.nome.localeCompare(a.nome)
                );

            break;

        }


        desenhar();

    });

}


/*=========================================
        BANNER
=========================================*/

function bannerCategoria(){


    if(lista.length === 0){

        return;

    }


    const hero =
        document.querySelector(
            ".heroCategoria"
        );


    if(!hero){

        return;

    }


    if(lista[0].banner){

        hero.style.backgroundImage =

            `url("${lista[0].banner}")`;

    }

}


/*=========================================
        INICIAR
=========================================*/

filtrarCategoria();

bannerCategoria();