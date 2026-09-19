/*=========================================
        CONTINUAR ASSISTINDO
=========================================*/

function carregarContinuarAssistindo(){

    const lista = document.getElementById("continuarAssistindo");

    const categoria = document.getElementById("continuarAssistindoCategoria");

    if(!lista || !categoria) return;

    lista.innerHTML = "";

    const historico = obterHistorico();

    if(historico.length === 0){

        categoria.style.display = "none";

        return;

    }

    categoria.style.display = "block";

    historico.forEach(item=>{

        const filme = catalogo.find(

            f => f.id === item.id

        );

        if(filme){

            lista.innerHTML += criarCard(filme);

        }

    });

}