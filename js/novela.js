/*====================================================
                NOVELA.JS
====================================================*/

const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const novela = catalogo.find(item => item.id === id);

if (!novela) {

    document.body.innerHTML = "<h1 style='color:white;text-align:center;margin-top:150px'>Novela não encontrada.</h1>";

    throw new Error("Novela não encontrada");

}

/*====================================================
                HERO
====================================================*/

document.getElementById("heroNovela").style.backgroundImage = `url(${novela.banner})`;

document.getElementById("posterNovela").src = novela.poster;

document.getElementById("nomeNovela").textContent = novela.nome;

document.getElementById("sinopseNovela").textContent = novela.sinopse || "";

document.getElementById("notaNovela").textContent = `⭐ ${novela.nota || "-"}`;

document.getElementById("anoNovela").textContent = novela.ano || "";

document.getElementById("duracaoNovela").textContent = novela.duracao || "";

/*====================================================
                PLAYER
====================================================*/

const player = document.getElementById("videoPlayer");

let episodioAtual = Number(

localStorage.getItem(

"novela_" + novela.id

)

) || 1;

/*====================================================
            CARREGAR EPISÓDIO
====================================================*/

function carregarEpisodio(numero){

    if(numero < 1) return;

    if(numero > novela.totalEpisodios) return;

    episodioAtual = numero;

    const ep = String(numero).padStart(3,"0");

    player.src = novela.baseVideo + ep + ".mp4";

    document.getElementById("tituloEpisodio").textContent =

    "Episódio " + ep;

    localStorage.setItem(

        "novela_" + novela.id,

        numero

    );

    atualizarCards();

}

/*====================================================
            GERAR EPISÓDIOS
====================================================*/

const lista = document.getElementById("episodios");

let quantidadeMostrada = 20;

function gerarLista(){

    lista.innerHTML = "";

    for(let i=1;i<=Math.min(quantidadeMostrada,novela.totalEpisodios);i++){

        const ep = String(i).padStart(3,"0");

        lista.innerHTML += `

        <div

            class="cardEp ${i==episodioAtual ? "assistindo":""}"

            onclick="carregarEpisodio(${i})">

            <h3>${ep}</h3>

        </div>

        `;

    }

}

gerarLista();

/*====================================================
        MOSTRAR MAIS
====================================================*/

document.getElementById("mostrarMais").onclick = ()=>{

    quantidadeMostrada += 20;

    gerarLista();

};

/*====================================================
        ATUALIZAR CARD
====================================================*/

function atualizarCards(){

    document

    .querySelectorAll(".cardEp")

    .forEach(card=>{

        card.classList.remove("assistindo");

    });

    const cards=document.querySelectorAll(".cardEp");

    if(cards[episodioAtual-1]){

        cards[episodioAtual-1]

        .classList.add("assistindo");

    }

}

/*====================================================
        CONTINUAR
====================================================*/

document.getElementById("btnContinuar")

.onclick=()=>{

    carregarEpisodio(episodioAtual);

};

/*====================================================
        PRÓXIMO
====================================================*/

document.getElementById("btnProximo")

.onclick=()=>{

    if(episodioAtual<novela.totalEpisodios){

        carregarEpisodio(

            episodioAtual+1

        );

    }

};

/*====================================================
        ANTERIOR
====================================================*/

document.getElementById("btnAnterior")

.onclick=()=>{

    if(episodioAtual>1){

        carregarEpisodio(

            episodioAtual-1

        );

    }

};

/*====================================================
        FAVORITO
====================================================*/

const btnFavorito = document.getElementById("btnFavorito");

function atualizarFavorito(){

    if(favoritoExiste(novela.id)){

        btnFavorito.innerHTML="❤️ Favoritado";

    }else{

        btnFavorito.innerHTML="🤍 Favoritar";

    }

}

atualizarFavorito();

btnFavorito.onclick=()=>{

    alternarFavorito(novela.id);

    atualizarFavorito();

};

/*====================================================
        PLAYER TERMINOU
====================================================*/

player.onended=()=>{

    if(episodioAtual<novela.totalEpisodios){

        setTimeout(()=>{

            carregarEpisodio(

                episodioAtual+1

            );

            player.play();

        },3000);

    }

};

/*====================================================
        INICIAR
====================================================*/

carregarEpisodio(episodioAtual);