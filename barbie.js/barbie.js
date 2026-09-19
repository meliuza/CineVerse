/*=========================================
            BARBIE+
=========================================*/

const container = document.getElementById("filmes");

/*=========================================
            MOSTRAR CATÁLOGO
=========================================*/

function carregarCatalogo() {

    container.innerHTML = "";

    const lista = [...FILMES].sort((a, b) => a.ano - b.ano);

    lista.forEach(filme => {

        const poster =
            POSTERS[filme.titulo] ||
            "https://placehold.co/300x450/f8c8dc/ffffff?text=Sem+Poster";

        const video =
            VIDEOS[filme.titulo] ||
            filme.video ||
            "";

        container.innerHTML += `

        <div class="card">

            <div class="poster">

                <span class="badge">
                    ${filme.idioma}
                </span>

                <img src="${poster}" alt="${filme.tituloPT}">

            </div>

            <div class="info">

                <h2>${filme.tituloPT}</h2>

                <p> ${filme.ano}</p>

                <p> ${filme.categoria}</p>

                ${criarBotao(filme, video)}

            </div>

        </div>

        `;

    });

    const loading = document.getElementById("loading");

    if (loading) {

        loading.style.display = "none";

    }

}

/*=========================================
            BOTÃO
=========================================*/

function criarBotao(filme, video){

    if(filme.tipo === "serie"){

        return `

        <a
            href="${filme.pagina}"
        class="btn-assistir">

            📺 Ver episódios

        </a>

        `;

    }

    return `

        <button
        class="btn-assistir"
        onclick="assistir('${video}')">

            ▶ Assistir

        </button>

    `;

}

/*=========================================
            ASSISTIR
=========================================*/

function assistir(link){

    if(!link){

        alert("Este filme ainda não possui link.");

        return;

    }

    window.open(link, "_blank");

}

/*=========================================
            INICIAR
=========================================*/

carregarCatalogo();
















