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

// 2. FAVORITOS — substitua TODO o bloco atual

const btnFavorito =
    document.getElementById("btnFavoritoFilme");

function atualizarFavorito(){

    if(!btnFavorito) return;

    const favorito =
        typeof isFavorito === "function" &&
        isFavorito(filme.id);

    btnFavorito.innerHTML =
        favorito
            ? "❤️ Favoritado"
            : "🤍 Favoritar";

    btnFavorito.classList.toggle(
        "ativo",
        favorito
    );
}

atualizarFavorito();

if(btnFavorito){

    btnFavorito.onclick = () => {

        if(typeof alternarFavorito === "function"){

            alternarFavorito(filme);

            atualizarFavorito();

        }

    };

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

// 3. RECOMENDADOS — substitua o bloco catalogo.filter(...) inteiro

catalogo
    .filter(f => {

        if(Number(f.id) === Number(filme.id)){
            return false;
        }

        if(typeof temVideo === "function" && !temVideo(f)){
            return false;
        }

        if(!Array.isArray(f.genero) || !Array.isArray(filme.genero)){
            return false;
        }

        return f.genero.some(
            g => filme.genero.includes(g)
        );

    })
    .slice(0,12)
    .forEach(item => {

        recomendados.innerHTML += `

            <a
                href="filme.html?id=${item.id}"
                class="cardFilme"
                data-filme-id="${item.id}"
            >

                <img
                    src="${item.poster || "../img/sem-poster.png"}"
                    alt="${item.nome}"
                    onerror="this.src='../img/sem-poster.png'"
                >

            </a>

        `;

    });

/*=========================================
        DA MESMA COLEÇÃO
=========================================*/

const areaColecao =
    document.getElementById("colecao");

const blocoColecao =
    document.getElementById("colecaoArea");

if(areaColecao && blocoColecao){

    areaColecao.innerHTML = "";

    const nomeColecao =
        String(filme.colecao || "").trim();

    if(nomeColecao !== ""){

        const filmesDaColecao =
            catalogo.filter(item => {

                if(Number(item.id) === Number(filme.id)){
                    return false;
                }

                const colecaoItem =
                    String(item.colecao || "").trim();

                return colecaoItem === nomeColecao;

            });

        filmesDaColecao.forEach(item => {

            areaColecao.innerHTML += `

                <a
                    href="filme.html?id=${item.id}"
                    class="cardFilme"
                >

                    <img
                        src="${item.poster || "../img/sem-poster.png"}"
                        alt="${item.nome}"
                        loading="lazy"
                    >

                </a>

            `;

        });

        if(filmesDaColecao.length === 0){

            blocoColecao.style.display = "none";

        }else{

            blocoColecao.style.display = "";

        }

    }else{

        blocoColecao.style.display = "none";

    }

}

});