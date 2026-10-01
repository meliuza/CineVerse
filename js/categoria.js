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

if(titulo){
    titulo.innerHTML = categoria;
}

if(tipo){
    tipo.innerHTML = "Categoria";
}

document.title =
    categoria + " | CineVerse";


/*=========================================
        VERIFICAR VÍDEO
=========================================*/

/*=========================================
        VERIFICAR VÍDEO
=========================================*/

function temVideoCategoria(item){

    if(item.tipo === "Filme"){

        return (
            typeof item.video === "string" &&
            item.video.trim() !== "" &&
            item.video.trim() !== "0"
        );

    }

    /*---------------------------------------
        FILME
    ---------------------------------------*/

    if(item.tipo === "Filme"){

        /*
            O filme aparece na categoria
            mesmo sem vídeo cadastrado.

            O vídeo pode ser colocado depois.
        */

        return true;

    }


    /*---------------------------------------
        NOVELA
    ---------------------------------------*/

    if(item.tipo === "Novela"){

        /*
            Novelas usam episódios.
        */

        return true;

    }


    /*---------------------------------------
        SÉRIE
    ---------------------------------------*/

    if(item.tipo === "Série"){

        if(
            !Array.isArray(item.temporadas)
        ){

            return false;

        }

        return item.temporadas.some(
            temporada =>

                Array.isArray(
                    temporada.episodios
                ) &&

                temporada.episodios.length > 0
        );

    }


    /*---------------------------------------
        ANIME
    ---------------------------------------*/

    if(item.tipo === "Anime"){

        return true;

    }


    /*---------------------------------------
        DORAMA
    ---------------------------------------*/

    if(item.tipo === "Dorama"){

        return true;

    }


    return false;

}


/*=========================================
        FILTRAR CATEGORIA
=========================================*/

function filtrarCategoria(){

    const normalizar = texto =>

        String(texto || "")
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .replace(/\+/g, " ")
            .trim()
            .toLowerCase();


    const busca =
        normalizar(categoria);


    /*---------------------------------------
        FILMES
    ---------------------------------------*/

    if(busca === "filmes"){

        lista =
            catalogo.filter(item =>

                normalizar(item.tipo)
                === "filme"

            );

    }


    /*---------------------------------------
        SERIES
    ---------------------------------------*/

    else if(
        busca === "series"
    ){

        lista =
            catalogo.filter(item =>

                normalizar(item.tipo)
                === "serie"

            );

    }


    /*---------------------------------------
        NOVELAS
    ---------------------------------------*/

    else if(
        busca === "novelas"
    ){

        lista =
            catalogo.filter(item =>

                normalizar(item.tipo)
                === "novela"

            );

    }


    /*---------------------------------------
        EM ALTA
    ---------------------------------------*/

    else if(
        busca === "em alta"
    ){

        lista =
            catalogo.filter(item =>

                item.novo === true

            );

    }


    /*---------------------------------------
        OUTRAS CATEGORIAS
    ---------------------------------------*/

    else{

        lista =
            catalogo.filter(item => {

                const colecao =
                    normalizar(
                        item.colecao
                    );

                const categoriaItem =
                    normalizar(
                        item.categoria
                    );

                const nome =
                    normalizar(
                        item.nome
                    );

                const generos =
                    Array.isArray(item.genero)

                        ? item.genero.map(
                            g => normalizar(g)
                        )

                        : [];


                return (

                    colecao === busca ||

                    categoriaItem === busca ||

                    generos.includes(busca) ||

                    nome === busca

                );

            });

    }


    /*---------------------------------------
        FILTRAR CONTEÚDOS VÁLIDOS
    ---------------------------------------*/

    lista =
        lista.filter(
            item =>
                temVideoCategoria(item)
        );


    /*---------------------------------------
        MAIS NOVOS PRIMEIRO
    ---------------------------------------*/

    lista.sort(
        (a, b) =>

            Number(b.ano || 0) -
            Number(a.ano || 0)

    );


    atualizarQuantidade();

    desenhar();

}


/*=========================================
        QUANTIDADE
=========================================*/

function atualizarQuantidade(){

    if(!quantidade){

        return;

    }

    quantidade.innerHTML =
        `${lista.length} título(s)`;

}


/*=========================================
        DESENHAR
=========================================*/

function desenhar(){

    if(!area){

        return;

    }

    area.innerHTML = "";


    /*---------------------------------------
        SEM RESULTADOS
    ---------------------------------------*/

    if(lista.length === 0){

        area.innerHTML = `

            <div class="semResultado">

                Nenhum conteúdo encontrado.

            </div>

        `;

        return;

    }


    /*---------------------------------------
        CARDS
    ---------------------------------------*/

    lista.forEach(item => {


        let pagina =
            "filme.html";


        /*-----------------------------------
            CONTEÚDOS EPISÓDICOS
        -----------------------------------*/

        if(

            item.tipo === "Novela" ||

            item.tipo === "Série" ||

            item.tipo === "Anime" ||

            item.tipo === "Dorama"

        ){

            pagina =
                "episodios.html";

        }


        area.innerHTML += `

            <a

                href="${pagina}?id=${item.id}"

                class="cardFilme"

                data-filme-id="${item.id}"

            >

                <img

                    src="${
                        item.poster ||
                        "../img/sem-poster.png"
                    }"

                    alt="${item.nome}"

                    loading="lazy"

                    onerror="
                        this.src='../img/sem-poster.png'
                    "

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

}


/*=========================================
        PESQUISA
=========================================*/

if(pesquisa){

    pesquisa.addEventListener(
        "input",
        () => {

            const texto =
                pesquisa.value
                    .toLowerCase()
                    .trim();


            const cards =
                area.querySelectorAll(
                    ".cardFilme"
                );


            cards.forEach(card => {

                const nome =
                    card
                        .querySelector("h3")
                        ?.innerHTML
                        .toLowerCase() || "";


                card.style.display =

                    nome.includes(texto)

                        ? "block"

                        : "none";

            });

        }
    );

}


/*=========================================
        ORDENAÇÃO
=========================================*/

if(ordenacao){

    ordenacao.addEventListener(
        "change",
        () => {


            switch(
                ordenacao.value
            ){

                case "nota":

                    lista.sort(
                        (a, b) =>

                            Number(
                                b.nota || 0
                            ) -

                            Number(
                                a.nota || 0
                            )
                    );

                break;


                case "novo":

                    lista.sort(
                        (a, b) =>

                            Number(
                                b.ano || 0
                            ) -

                            Number(
                                a.ano || 0
                            )
                    );

                break;


                case "az":

                    lista.sort(
                        (a, b) =>

                            a.nome.localeCompare(
                                b.nome
                            )
                    );

                break;


                case "za":

                    lista.sort(
                        (a, b) =>

                            b.nome.localeCompare(
                                a.nome
                            )
                    );

                break;

            }


            desenhar();

        }
    );

}


/*=========================================
        INICIAR
=========================================*/

filtrarCategoria();