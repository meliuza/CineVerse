/*=========================================
        CONTINUAR ASSISTINDO
=========================================*/

function carregarContinuarAssistindo(){

    const lista = document.getElementById("continuarAssistindo");
    const categoria = document.getElementById("continuarAssistindoCategoria");

    if(!lista || !categoria) return;

    lista.innerHTML = "";

    const historico = obterHistorico();

    if(!historico || historico.length === 0){

        categoria.style.display = "none";

        return;
    }

    /*
        Mostra somente conteúdos que ainda
        possuem vídeo disponível.
    */

    let encontrados = 0;

    historico.forEach(item => {

        const filme = catalogo.find(
            f => Number(f.id) === Number(item.id)
        );

        if(!filme) return;

        if(typeof temVideo === "function" && !temVideo(filme)){
            return;
        }

        lista.innerHTML += criarCard(filme);

        encontrados++;

    });

    /*
        Se nenhum conteúdo do histórico
        possui vídeo, esconde a seção.
    */

    if(encontrados === 0){

        categoria.style.display = "none";

        return;
    }

    categoria.style.display = "block";

}