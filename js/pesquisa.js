/*=========================================
            PESQUISA CINEVERSE
=========================================*/

const campoPesquisa = document.getElementById("pesquisa");
const resultadoPesquisa = document.getElementById("resultadoPesquisa");
const botaoLimpar = document.getElementById("limparPesquisa");

const botaoPesquisar = document.querySelector(
    '.search-box > button:not(#limparPesquisa)'
);


/*=========================================
            NORMALIZAR TEXTO
=========================================*/

function normalizarTexto(texto = "") {

    return texto
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

}


/*=========================================
            DEFINIR PÁGINA
=========================================*/

function paginaDoFilme(filme) {

    if (!filme || filme.id == null) {
        return "index.html";
    }

    const tipo = normalizarTexto(filme.tipo);

    if (tipo === "novela") {
        return `pages/novela.html?id=${filme.id}`;
    }

    if (tipo === "serie") {
        return `pages/serie.html?id=${filme.id}`;
    }

    return `pages/filme.html?id=${filme.id}`;

}


/*=========================================
            PESQUISAR
=========================================*/

function pesquisar(texto) {

    if (!resultadoPesquisa) return;

    texto = texto.trim();

    resultadoPesquisa.innerHTML = "";

    if (texto === "") {

        resultadoPesquisa.style.display = "none";

        return;
    }


    const busca = normalizarTexto(texto);


    const encontrados = catalogo.filter(filme => {

        const nome = normalizarTexto(
            filme.nome
        );


        const categoria = Array.isArray(filme.categoria)

            ? normalizarTexto(
                filme.categoria.join(" ")
            )

            : normalizarTexto(
                filme.categoria || ""
            );


        const colecao = normalizarTexto(
            filme.colecao || ""
        );


        const tipo = normalizarTexto(
            filme.tipo || ""
        );


        const genero = Array.isArray(filme.genero)

            ? normalizarTexto(
                filme.genero.join(" ")
            )

            : normalizarTexto(
                filme.genero || ""
            );


        const ano = String(
            filme.ano || ""
        );


        return (

            nome.includes(busca) ||

            categoria.includes(busca) ||

            colecao.includes(busca) ||

            genero.includes(busca) ||

            tipo.includes(busca) ||

            ano.includes(busca)

        );

    });


    /*=========================================
                NENHUM RESULTADO
    =========================================*/

    if (encontrados.length === 0) {

        resultadoPesquisa.innerHTML = `

            <div class="semResultado">

                Nenhum resultado encontrado.

            </div>

        `;

        resultadoPesquisa.style.display = "block";

        return;
    }


    /*=========================================
                MOSTRAR RESULTADOS
    =========================================*/

    encontrados.forEach(filme => {

        const item = document.createElement("div");

        item.className = "resultado-item";


        const poster =
            filme.poster ||
            "img/sem-poster.png";


        item.innerHTML = `

            <img
                src="${poster}"
                alt="${filme.nome || "Poster"}"
                onerror="this.src='img/sem-poster.png'"
            >


            <div class="resultado-info">

                <h3>
                    ${filme.nome || "Sem nome"}
                </h3>


                <p>

                    ${filme.ano || "—"}

                    •

                    ${filme.tipo || "Filme"}

                </p>


                <div class="resultado-tags">

                    ${
                        filme.dublado
                        ?
                        '<span class="dublado">Dublado</span>'
                        :
                        ''
                    }


                    ${
                        filme.novo
                        ?
                        '<span class="novo">Novo</span>'
                        :
                        ''
                    }


                    ${
                        normalizarTexto(filme.tipo) === "serie"
                        ?
                        '<span class="serie">Série</span>'
                        :
                        ''
                    }

                </div>

            </div>

        `;


        /*=========================================
                    CLICAR NO RESULTADO
        =========================================*/

        item.addEventListener("click", () => {

            window.location.href =
                paginaDoFilme(filme);

        });


        resultadoPesquisa.appendChild(item);

    });


    resultadoPesquisa.style.display = "block";

}


/*=========================================
            DIGITAR
=========================================*/

if (campoPesquisa) {

    campoPesquisa.addEventListener(
        "input",
        () => {

            pesquisar(
                campoPesquisa.value
            );

        }
    );

}


/*=========================================
            BOTÃO 🔍
=========================================*/

if (botaoPesquisar) {

    botaoPesquisar.addEventListener(
        "click",
        () => {

            const texto =
                campoPesquisa?.value.trim();


            if (!texto) {

                campoPesquisa?.focus();

                return;
            }


            const busca =
                normalizarTexto(texto);


            const primeiro =
                catalogo.find(filme =>

                    normalizarTexto(
                        filme.nome
                    ).includes(busca)

                );


            if (primeiro) {

                window.location.href =
                    paginaDoFilme(primeiro);

            } else {

                pesquisar(texto);

            }

        }
    );

}


/*=========================================
            ENTER
=========================================*/

if (campoPesquisa) {

    campoPesquisa.addEventListener(
        "keydown",
        (e) => {

            if (e.key !== "Enter") return;

            e.preventDefault();


            const texto =
                campoPesquisa.value.trim();


            if (!texto) return;


            const busca =
                normalizarTexto(texto);


            const primeiro =
                catalogo.find(filme =>

                    normalizarTexto(
                        filme.nome
                    ).includes(busca)

                );


            if (primeiro) {

                window.location.href =
                    paginaDoFilme(primeiro);

            } else {

                pesquisar(texto);

            }

        }
    );

}


/*=========================================
            LIMPAR ✖
=========================================*/

if (botaoLimpar) {

    botaoLimpar.addEventListener(
        "click",
        () => {

            if (campoPesquisa) {

                campoPesquisa.value = "";

                campoPesquisa.focus();

            }


            if (resultadoPesquisa) {

                resultadoPesquisa.innerHTML = "";

                resultadoPesquisa.style.display =
                    "none";

            }

        }
    );

}


/*=========================================
            FECHAR RESULTADOS
=========================================*/

document.addEventListener(
    "click",
    (e) => {

        if (
            !e.target.closest(".search-box")
        ) {

            if (resultadoPesquisa) {

                resultadoPesquisa.style.display =
                    "none";

            }

        }

    }
);