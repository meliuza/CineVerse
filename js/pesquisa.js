/*=========================================
            ELEMENTOS
=========================================*/

const campoPesquisa = document.getElementById("pesquisa");
const resultadoPesquisa = document.getElementById("resultadoPesquisa");
const botaoLimpar = document.getElementById("limparPesquisa");

/*=========================================
            PESQUISAR
=========================================*/

function pesquisar(texto){

    if(!resultadoPesquisa) return;

    texto = texto.trim().toLowerCase();

    resultadoPesquisa.innerHTML = "";

    if(texto === ""){

        resultadoPesquisa.style.display = "none";
        return;

    }

    const encontrados = catalogo.filter(filme=>{

        const nome = filme.nome.toLowerCase();

        const categoria = Array.isArray(filme.categoria)
            ? filme.categoria.join(" ").toLowerCase()
            : (filme.categoria || "").toLowerCase();

        const colecao = (filme.colecao || "").toLowerCase();

        const tipo = (filme.tipo || "").toLowerCase();

        const genero = Array.isArray(filme.genero)
            ? filme.genero.join(" ").toLowerCase()
            : "";

        return nome.includes(texto)
            || categoria.includes(texto)
            || colecao.includes(texto)
            || genero.includes(texto)
            || tipo.includes(texto);

    });

    if(encontrados.length === 0){

        resultadoPesquisa.innerHTML =

        `
        <div class="semResultado">

            Nenhum resultado encontrado.

        </div>
        `;

        resultadoPesquisa.style.display = "block";

        return;

    }

    encontrados.forEach(filme=>{

        resultadoPesquisa.innerHTML +=

        `
        <div class="resultado-item"

        onclick="window.location.href='${filme.pagina}'">

            <img src="${filme.poster}">

            <div class="resultado-info">

                <h3>${filme.nome}</h3>

                <p>${filme.ano} • ${filme.tipo}</p>

                <div class="resultado-tags">

                    ${filme.dublado ? '<span class="dublado">Dublado</span>' : ''}

                    ${filme.novo ? '<span class="novo">Novo</span>' : ''}

                </div>

            </div>

        </div>
        `;

    });

    resultadoPesquisa.style.display = "block";

}

/*=========================================
            EVENTOS
=========================================*/

if(campoPesquisa){

    campoPesquisa.addEventListener("input",()=>{

        pesquisar(campoPesquisa.value);

    });

}

/*=========================================
            ENTER
=========================================*/

if(campoPesquisa){

    campoPesquisa.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            const primeiro = catalogo.find(f=>

                f.nome.toLowerCase().includes(

                    campoPesquisa.value.toLowerCase()

                )

            );

            if(primeiro){

                window.location.href = primeiro.pagina;

            }

        }

    });

}

/*=========================================
            LIMPAR
=========================================*/

if(botaoLimpar){

    botaoLimpar.addEventListener("click",()=>{

        campoPesquisa.value = "";

        resultadoPesquisa.innerHTML = "";

        resultadoPesquisa.style.display = "none";

        campoPesquisa.focus();

    });

}

/*=========================================
        FECHAR RESULTADOS
=========================================*/

document.addEventListener("click",(e)=>{

    if(

        !e.target.closest(".search-box")

    ){

        if(resultadoPesquisa){

            resultadoPesquisa.style.display = "none";

        }

    }

});