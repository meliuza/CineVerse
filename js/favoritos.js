/*=========================================
            FAVORITOS.JS
=========================================*/

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

/*=========================================
        SALVAR FAVORITOS
=========================================*/

function salvarFavoritos(){

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

    atualizarIcones();

    atualizarContadorFavoritos();

    if(typeof carregarPaginaFavoritos === "function"){

        carregarPaginaFavoritos();

    }

}

/*=========================================
        VERIFICAR FAVORITO
=========================================*/

function favoritoExiste(id){

    return favoritos.includes(id);

}

/*=========================================
        ADICIONAR / REMOVER
=========================================*/

function alternarFavorito(id){

    if(favoritoExiste(id)){

        favoritos = favoritos.filter(f => f != id);

    }else{

        favoritos.push(id);

    }

    salvarFavoritos();

    atualizarIcones();

}

/*=========================================
        ATUALIZAR ÍCONES
=========================================*/

function atualizarIcones(){

    document.querySelectorAll(".btnFavorito").forEach(botao=>{

        const id = Number(botao.dataset.id);

        if(favoritoExiste(id)){

            botao.classList.add("ativo");

            botao.innerHTML = "❤️";

        }else{

            botao.classList.remove("ativo");

            botao.innerHTML = "🤍";

        }

    });

}

/*=========================================
        QUANTIDADE
=========================================*/

function atualizarContadorFavoritos(){

    const contador = document.getElementById("contadorFavoritos");

    if(contador){

        contador.textContent = favoritos.length;

    }

}

/*=========================================
        INICIAR
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    atualizarIcones();

    atualizarContadorFavoritos();

});