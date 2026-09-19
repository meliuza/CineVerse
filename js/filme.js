/*=========================================
            FILME.JS V2
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

/*=========================================
        PEGAR ID DA URL
=========================================*/

const parametros = new URLSearchParams(window.location.search);

const id = Number(parametros.get("id"));

/*=========================================
        PROCURAR FILME
=========================================*/

const filme = catalogo.find(f=>f.id===id);

if(!filme){

    document.body.innerHTML=`

        <div style="

            height:100vh;

            display:flex;

            justify-content:center;

            align-items:center;

            color:white;

            font-size:40px;

            background:#090909;

        ">

            Filme não encontrado 😢

        </div>

    `;

    return;

}

/*=========================================
        TÍTULO
=========================================*/

document.title = filme.nome + " | CineVerse";

document.getElementById("tituloPagina").innerHTML = filme.nome;

/*=========================================
        HERO
=========================================*/

const hero = document.getElementById("hero");

hero.style.backgroundImage = `url(${filme.banner})`;

hero.style.backgroundSize = "cover";

hero.style.backgroundPosition = "center";

/*=========================================
        POSTER
=========================================*/

document.getElementById("posterFilme").src = filme.poster;

document.getElementById("posterFilme").alt = filme.nome;

/*=========================================
        NOME
=========================================*/

document.getElementById("nomeFilme").innerHTML = filme.nome;

document.getElementById("duracao").innerHTML = filme.duracao;

document.getElementById("nota").innerHTML = "⭐ " + filme.nota;

document.getElementById("sinopse").innerHTML = filme.sinopse;

/*=========================================
        INFORMAÇÕES
=========================================*/

document.getElementById("categoria").innerHTML = filme.categoria;

document.getElementById("ano").innerHTML = filme.ano;

/*=========================================
        GÊNEROS
=========================================*/

const areaGenero = document.getElementById("generos");

if (Array.isArray(filme.genero)) {

    filme.genero.forEach(g => {

        areaGenero.innerHTML += `
            <span class="tagGenero">${g}</span>
        `;

    });

}


/*=========================================
        PLAYER
=========================================*/

document.getElementById("player").src = filme.video;

/*=========================================
        ELENCO
=========================================*/

const elenco = document.getElementById("elenco");

if (Array.isArray(filme.elenco)) {

    filme.elenco.forEach(nome => {

        elenco.innerHTML += `
            <div class="ator">
                ${nome}
            </div>
        `;

    });

}

/*=========================================
        FAVORITOS
=========================================*/

const btnFavorito = document.getElementById("btnFavoritoFilme");

btnFavorito.dataset.id = filme.id;

atualizarFavorito();

btnFavorito.onclick = () => {

    console.log("Cliquei");

    alternarFavorito(filme.id);

    atualizarFavorito();

};

function atualizarFavorito(){

    if(favoritoExiste(filme.id)){

        btnFavorito.innerHTML="❤️ Favoritado";

        btnFavorito.classList.add("ativo");

    }else{

        btnFavorito.innerHTML="🤍 Favoritar";

        btnFavorito.classList.remove("ativo");

    }

}

/*=========================================
        BOTÃO ASSISTIR
=========================================*/

document.getElementById("btnAssistir").onclick=()=>{

    document.getElementById("playerArea").scrollIntoView({

        behavior:"smooth"

    });

};

/*=========================================
        RECOMENDADOS
=========================================*/

const recomendados = document.getElementById("recomendados");

catalogo

.filter(f=>

    f.id!==filme.id &&

    f.genero.some(g=>filme.genero.includes(g))

)

.slice(0,12)

.forEach(item=>{

    recomendados.innerHTML += `

        <a

            href="filme.html?id=${item.id}"

            class="cardFilme">

            <img

                src="${item.poster}"

                alt="${item.nome}">

        </a>

    `;

});

/*=========================================
        COLEÇÃO
=========================================*/

const areaColecao=document.getElementById("colecao");

const bloco=document.getElementById("colecaoArea");

if(filme.colecao!=""){

    catalogo

    .filter(f=>f.colecao==filme.colecao)

    .forEach(item=>{

        areaColecao.innerHTML+=`

            <a

                href="filme.html?id=${item.id}"

                class="cardFilme">

                <img

                    src="${item.poster}"

                    alt="${item.nome}">

            </a>

        `;

    });

}else{

    bloco.style.display="none";

}

});