/*=========================================
            CATEGORIA.JS
=========================================*/

const parametros = new URLSearchParams(window.location.search);

const categoria = parametros.get("categoria") || "Filmes";

let lista = [];

/*=========================================
        ELEMENTOS
=========================================*/

const titulo = document.getElementById("nomeCategoria");
const tipo = document.getElementById("tipoCategoria");
const quantidade = document.getElementById("quantidadeCategoria");
const area = document.getElementById("listaCategoria");

const pesquisa = document.getElementById("pesquisaCategoria");
const ordenacao = document.getElementById("ordenacao");

/*=========================================
        HERO
=========================================*/

titulo.innerHTML = categoria;

document.title = categoria + " | CineVerse";

/*=========================================
        FILTRAR
=========================================*/

function filtrarCategoria(){

    if(categoria=="Filmes"){

        lista = catalogo.filter(item=>item.tipo=="Filme");

    }

    else if(categoria=="Séries"){

        lista = catalogo.filter(item=>item.tipo=="Série");

    }

    else if(categoria=="Novelas"){

        lista = catalogo.filter(item=>item.tipo=="Novela");

    }

    else{

        lista = catalogo.filter(item=>

            item.colecao==categoria ||

            item.categoria==categoria ||

            (item.genero && item.genero.includes(categoria))

        );

    }

    // ================================
    // ORDENAR DO MAIS NOVO AO MAIS ANTIGO
    // ================================

    lista.sort((a, b) =>
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

    quantidade.innerHTML =

    `${lista.length} título(s)`;

}

/*=========================================
        DESENHAR
=========================================*/

function desenhar(){

    area.innerHTML="";

    if(lista.length==0){

        area.innerHTML=`

        <div class="semResultado">

            Nenhum conteúdo encontrado.

        </div>

        `;

        return;

    }

    lista.forEach(item=>{

        let pagina="filme.html";

        if(item.tipo=="Novela"){

            pagina="novela.html";

        }

        if(item.tipo=="Série"){

            pagina="serie.html";

        }

        area.innerHTML+=`

        <a

            href="${pagina}?id=${item.id}"

            class="cardFilme">

            <img

                src="${item.poster}"

                alt="${item.nome}"

                loading="lazy">

            <div class="cardInfo">

                <h3>${item.nome}</h3>

                <p>

                    ⭐ ${item.nota}

                </p>

            </div>

        </a>

        `;

    });

}

/*=========================================
        PESQUISA
=========================================*/

pesquisa.addEventListener("input",()=>{

    const texto = pesquisa.value.toLowerCase();

    const cards = area.querySelectorAll(".cardFilme");

    cards.forEach(card=>{

        const nome = card.querySelector("h3")

        .innerHTML

        .toLowerCase();

        card.style.display =

        nome.includes(texto)

        ?

        "block"

        :

        "none";

    });

});

/*=========================================
        ORDENAÇÃO
=========================================*/

ordenacao.addEventListener("change",()=>{

    switch(ordenacao.value){

        case "nota":

            lista.sort((a,b)=>b.nota-a.nota);

        break;

        case "novo":

            lista.sort((a,b)=>b.ano-a.ano);

        break;

        case "az":

            lista.sort((a,b)=>

            a.nome.localeCompare(b.nome));

        break;

        case "za":

            lista.sort((a,b)=>

            b.nome.localeCompare(a.nome));

        break;

    }

    desenhar();

});

/*=========================================
        BANNER
=========================================*/

function bannerCategoria(){

    if(lista.length==0) return;

    const hero = document.querySelector(".heroCategoria");

    hero.style.backgroundImage=

    `url(${lista[0].banner})`;

}

/*=========================================
        INICIAR
=========================================*/

filtrarCategoria();

bannerCategoria();