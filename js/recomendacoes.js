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

    if(historico.length === 0){

        categoria.style.display = "none";

        return;

    }

    const ultimo = historico[0];

    titulo.innerHTML = `❤️ Porque você assistiu ${ultimo.nome}`;

    let recomendados = catalogo.filter(filme=>{

        return (

            filme.id !== ultimo.id &&

            (

                filme.categoria === ultimo.categoria ||

                filme.genero.some(g=>ultimo.genero.includes(g))

            )

        );

    });

    recomendados = recomendados.slice(0,20);

    if(recomendados.length === 0){

        categoria.style.display = "none";

        return;

    }

    categoria.style.display = "block";

    recomendados.forEach(filme=>{

        lista.innerHTML += criarCard(filme);

    });

}