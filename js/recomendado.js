/*=========================================
        RECOMENDADO PARA VOCÊ
=========================================*/

function carregarRecomendadoUsuario(){

    const lista = document.getElementById("recomendadoUsuario");

    const categoria = document.getElementById("recomendadoUsuarioCategoria");

    if(!lista || !categoria) return;

    lista.innerHTML = "";

    const historico = obterHistorico();

    if(historico.length === 0){

        categoria.style.display = "none";

        return;

    }

    let filmesRecomendados = [];

    historico.forEach(item=>{

        catalogo.forEach(filme=>{

            if(

                filme.id !== item.id &&

                filme.genero.some(

                    genero=>item.genero.includes(genero)

                )

            ){

                if(!filmesRecomendados.find(f=>f.id===filme.id)){

                    filmesRecomendados.push(filme);

                }

            }

        });

    });

    filmesRecomendados = filmesRecomendados.slice(0,20);

    if(filmesRecomendados.length===0){

        categoria.style.display="none";

        return;

    }

    categoria.style.display="block";

    filmesRecomendados.forEach(filme=>{

        lista.innerHTML += criarCard(filme);

    });

}