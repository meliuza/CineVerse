/*=========================================
        PORQUE VOCÊ ASSISTIU...
=========================================*/

function carregarRecomendacoes(){

    const lista = document.getElementById("recomendados");
    const titulo = document.getElementById("tituloRecomendado");
    const categoria = document.getElementById("recomendadoCategoria");

    if(!lista || !titulo || !categoria) return;

    lista.innerHTML = "";

    const historico = obterHistorico();

    if(!historico || historico.length === 0){

        categoria.style.display = "none";

        return;
    }

    /*
        Pega o último conteúdo assistido
    */

    const ultimo = historico[0];

    /*
        Se o último conteúdo não possui mais
        vídeo, procuramos outro do histórico
        que possua vídeo.
    */

    let referencia = null;

    for(const item of historico){

        const filme = catalogo.find(
            f => Number(f.id) === Number(item.id)
        );

        if(!filme) continue;

        if(typeof temVideo === "function" && !temVideo(filme)){
            continue;
        }

        referencia = filme;

        break;
    }

    if(!referencia){

        categoria.style.display = "none";

        return;
    }

    titulo.innerHTML =
        `❤️ Porque você assistiu ${referencia.nome}`;

    let recomendados = catalogo.filter(filme => {

        if(Number(filme.id) === Number(referencia.id)){
            return false;
        }

        /*
            Só recomenda conteúdo que tenha vídeo.
        */

        if(
            typeof temVideo === "function" &&
            !temVideo(filme)
        ){
            return false;
        }

        return (

            filme.categoria === referencia.categoria ||

            (
                Array.isArray(filme.genero) &&
                Array.isArray(referencia.genero) &&
                filme.genero.some(
                    genero => referencia.genero.includes(genero)
                )
            )

        );

    });

    recomendados = recomendados.slice(0,20);

    if(recomendados.length === 0){

        categoria.style.display = "none";

        return;
    }

    categoria.style.display = "block";

    recomendados.forEach(filme => {

        lista.innerHTML += criarCard(filme);

    });

}