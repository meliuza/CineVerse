/*=========================================
        RECOMENDADO PARA VOCÊ
=========================================*/

function carregarRecomendadoUsuario(){

    const lista = document.getElementById("recomendadoUsuario");
    const categoria = document.getElementById("recomendadoUsuarioCategoria");

    if(!lista || !categoria) return;

    lista.innerHTML = "";

    const historico = obterHistorico();

    if(!historico || historico.length === 0){

        categoria.style.display = "none";

        return;
    }

    let filmesRecomendados = [];

    historico.forEach(item => {

        const filmeAssistido = catalogo.find(
            f => Number(f.id) === Number(item.id)
        );

        if(!filmeAssistido) return;

        /*
            Procura conteúdos semelhantes
        */

        catalogo.forEach(filme => {

            if(Number(filme.id) === Number(filmeAssistido.id)){
                return;
            }

            /*
                Não recomenda conteúdo sem vídeo.
            */

            if(
                typeof temVideo === "function" &&
                !temVideo(filme)
            ){
                return;
            }

            if(
                !Array.isArray(filme.genero) ||
                !Array.isArray(filmeAssistido.genero)
            ){
                return;
            }

            const temGeneroParecido =
                filme.genero.some(
                    genero =>
                        filmeAssistido.genero.includes(genero)
                );

            if(!temGeneroParecido){
                return;
            }

            /*
                Evita duplicados.
            */

            if(
                !filmesRecomendados.find(
                    f => f.id === filme.id
                )
            ){

                filmesRecomendados.push(filme);

            }

        });

    });

    filmesRecomendados =
        filmesRecomendados.slice(0,20);

    if(filmesRecomendados.length === 0){

        categoria.style.display = "none";

        return;
    }

    categoria.style.display = "block";

    filmesRecomendados.forEach(filme => {

        lista.innerHTML += criarCard(filme);

    });

}