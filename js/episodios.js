// =====================================================
// CINEVERSE — SISTEMA DE EPISÓDIOS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const parametros =
        new URLSearchParams(window.location.search);

    const id =
        parametros.get("id");

    if(!id){

        console.error(
            "CineVerse: nenhum ID foi informado."
        );

        return;
    }


    // =============================================
    // PROCURA O CONTEÚDO NO CATÁLOGO
    // =============================================

    const conteudo =
        catalogo.find(item =>
            Number(item.id) === Number(id)
        );


    if(!conteudo){

        console.error(
            "CineVerse: conteúdo não encontrado.",
            id
        );

        return;
    }


    // =============================================
    // DESCOBRE O TIPO
    // =============================================

    const tipo =
        String(conteudo.tipo || "")
            .trim()
            .toLowerCase();


    console.log(
        "CineVerse:",
        conteudo.nome,
        "→",
        conteudo.tipo
    );


    // =============================================
    // ESCOLHE O ARQUIVO DE CONTEÚDO
    // =============================================

    let dados = null;


    if(tipo === "novela"){

        dados =
            novelas[conteudo.id];

    }

    else if(tipo === "série" || tipo === "serie"){

        dados =
            series[conteudo.id];

    }

    else if(tipo === "anime"){

        dados =
            animes[conteudo.id];

    }

    else if(tipo === "dorama"){

        dados =
            doramas[conteudo.id];

    }


    // =============================================
    // VERIFICA SE EXISTE
    // =============================================

    if(!dados){

        console.warn(
            "CineVerse: ainda não existem episódios cadastrados para:",
            conteudo.nome
        );

        mostrarInformacoes(conteudo);

        return;
    }


    // =============================================
    // INFORMAÇÕES
    // =============================================

    mostrarInformacoes(conteudo);


    // =============================================
    // TEMPORADAS
    // =============================================

    carregarTemporadas(dados);

});


// =====================================================
// INFORMAÇÕES DO CONTEÚDO
// =====================================================

function mostrarInformacoes(conteudo){

    const titulo =
        document.getElementById(
            "episodiosTitulo"
        );

    const descricao =
        document.getElementById(
            "episodiosDescricao"
        );

    const banner =
        document.getElementById(
            "episodiosBanner"
        );

    const meta =
        document.getElementById(
            "episodiosMeta"
        );


    if(titulo){

        titulo.textContent =
            conteudo.nome || "Sem título";

    }


    if(descricao){

        descricao.textContent =
            conteudo.sinopse || "";

    }


    if(banner){

        banner.src =
            conteudo.banner ||
            conteudo.poster ||
            "../img/sem-poster.png";

        banner.alt =
            conteudo.nome || "";

    }


    if(meta){

        meta.innerHTML = `

            ${conteudo.ano
                ? `<span>${conteudo.ano}</span>`
                : ""}

            ${conteudo.classificacao
                ? `<span>${conteudo.classificacao}</span>`
                : ""}

            ${conteudo.genero
                ? `<span>${
                    Array.isArray(conteudo.genero)
                        ? conteudo.genero.join(" • ")
                        : conteudo.genero
                }</span>`
                : ""}

        `;

    }

}


// =====================================================
// TEMPORADAS
// =====================================================

function carregarTemporadas(dados){

    const areaTemporadas =
        document.getElementById(
            "temporadas"
        );

    if(!areaTemporadas){

        return;
    }


    areaTemporadas.innerHTML = "";


    if(!Array.isArray(dados.temporadas)){

        console.warn(
            "CineVerse: nenhuma temporada encontrada."
        );

        return;
    }


    dados.temporadas.forEach(
        (temporada, indice) => {

            const botao =
                document.createElement("button");


            botao.className =
                "temporadaBotao";


            botao.textContent =
                temporada.nome ||
                `Temporada ${indice + 1}`;


            botao.addEventListener(
                "click",
                () => {

                    carregarEpisodios(
                        temporada
                    );

                }
            );


            areaTemporadas.appendChild(
                botao
            );

        }
    );


    // Abre a primeira temporada automaticamente

    if(dados.temporadas.length > 0){

        carregarEpisodios(
            dados.temporadas[0]
        );

    }

}


// =====================================================
// EPISÓDIOS
// =====================================================

function carregarEpisodios(temporada){

    const lista =
        document.getElementById(
            "listaEpisodios"
        );

    if(!lista){

        return;
    }


    lista.innerHTML = "";


    if(
        !Array.isArray(
            temporada.episodios
        )
    ){

        return;
    }


    temporada.episodios.forEach(
        episodio => {

            const numero =
                episodio.numero ?? "";


            const nome =
                episodio.nome ||
                `Episódio ${numero}`;


            const botao =
                document.createElement("button");


            botao.className =
                "episodioBotao";


            botao.innerHTML = `

                <span class="numeroEpisodio">
                    ${numero}
                </span>

                <span class="nomeEpisodio">
                    ${nome}
                </span>

            `;


            botao.addEventListener(
                "click",
                () => {

                    abrirEpisodio(
                        episodio
                    );

                }
            );


            lista.appendChild(
                botao
            );

        }
    );

}


// =====================================================
// ABRIR EPISÓDIO
// =====================================================

function abrirEpisodio(episodio){

    if(!episodio){

        return;
    }


    if(episodio.video){

        console.log(
            "Abrindo episódio:",
            episodio.numero
        );


        window.location.href =
            episodio.video;

        return;

    }


    console.warn(
        "CineVerse: este episódio ainda não possui vídeo."
    );

}