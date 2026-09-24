/*=========================================
            FAVORITOS.JS
=========================================*/

const CHAVE_FAVORITOS = "cineverse_favoritos";

function obterFavoritos(){

    try{

        return JSON.parse(
            localStorage.getItem(CHAVE_FAVORITOS)
        ) || [];

    }catch{

        return [];

    }

}

function salvarFavoritos(lista){

    localStorage.setItem(
        CHAVE_FAVORITOS,
        JSON.stringify(lista)
    );

    if(typeof atualizarIcones === "function"){
        atualizarIcones();
    }

    if(typeof atualizarContadorFavoritos === "function"){
        atualizarContadorFavoritos();
    }

    if(typeof carregarPaginaFavoritos === "function"){
        carregarPaginaFavoritos();
    }

}

function isFavorito(id){

    return obterFavoritos().some(item =>
        Number(item.id) === Number(id)
    );

}

function favoritoExiste(id){

    return isFavorito(id);

}

function adicionarFavorito(filme){

    if(!filme) return;

    const favoritos = obterFavoritos();

    if(
        favoritos.some(item =>
            Number(item.id) === Number(filme.id)
        )
    ){
        return;
    }

    favoritos.push({

        id: filme.id,
        nome: filme.nome || "",
        tipo: filme.tipo || "",
        categoria: filme.categoria || "",
        poster: filme.poster || "",
        ano: filme.ano || "",
        nota: filme.nota || 0

    });

    salvarFavoritos(favoritos);

}

function removerFavorito(id){

    const favoritos =
        obterFavoritos().filter(item =>
            Number(item.id) !== Number(id)
        );

    salvarFavoritos(favoritos);

}

function alternarFavorito(filme){

    if(!filme) return;

    if(isFavorito(filme.id)){

        removerFavorito(filme.id);

    }else{

        adicionarFavorito(filme);

    }

}

function listarFavoritos(){

    return obterFavoritos();

}

function atualizarIcones(){

    document
        .querySelectorAll(".btnFavorito")
        .forEach(botao => {

            const id = Number(botao.dataset.id);

            if(isFavorito(id)){

                botao.classList.add("ativo");
                botao.innerHTML = "❤️";

            }else{

                botao.classList.remove("ativo");
                botao.innerHTML = "🤍";

            }

        });

}

function atualizarContadorFavoritos(){

    const contador =
        document.getElementById("contadorFavoritos");

    if(contador){

        contador.textContent =
            obterFavoritos().length;

    }

}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarIcones();
        atualizarContadorFavoritos();

    }
);