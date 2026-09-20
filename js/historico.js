/*====================================================
                 HISTORICO.JS
         Sistema Universal CineVerse
====================================================*/

const CHAVE_HISTORICO = "cineverse_historico";


/*====================================================
             CARREGAR HISTÓRICO
====================================================*/

function obterHistorico(){

    try{

        const salvo = localStorage.getItem(CHAVE_HISTORICO);

        if(!salvo){
            return [];
        }

        const lista = JSON.parse(salvo);

        return Array.isArray(lista) ? lista : [];

    }catch(erro){

        console.error("Erro ao carregar histórico:", erro);

        return [];

    }

}


/*====================================================
             SALVAR HISTÓRICO
====================================================*/

function salvarHistorico(lista){

    localStorage.setItem(

        CHAVE_HISTORICO,

        JSON.stringify(lista)

    );

}


/*====================================================
         REGISTRAR PROGRESSO
====================================================*/

function registrarProgresso({

    id,

    tipo,

    nome = "",

    categoria = "",

    genero = [],

    episodio = null,

    tempo = 0,

    duracao = 0

}){

    let historico = obterHistorico();


    const indice = historico.findIndex(

        item => item.id == id

    );


    const dados = {

        id,

        tipo,

        nome,

        categoria,

        genero: Array.isArray(genero) ? genero : [],

        episodio,

        tempo,

        duracao,

        atualizado: Date.now()

    };


    if(indice >= 0){

        historico[indice] = {

            ...historico[indice],

            ...dados

        };

    }else{

        historico.push(dados);

    }


    salvarHistorico(historico);

}


/*====================================================
             REGISTRAR FILME
====================================================*/

function registrarFilme(filme){

    if(!filme) return;


    let historico = obterHistorico();


    const indice = historico.findIndex(

        item => item.id == filme.id

    );


    const dados = {

        id: filme.id,

        tipo: filme.tipo,

        nome: filme.nome || "",

        categoria: filme.categoria || "",

        genero: Array.isArray(filme.genero)

            ? filme.genero

            : [],

        episodio: null,

        tempo: 0,

        duracao: 0,

        atualizado: Date.now()

    };


    if(indice >= 0){

        historico[indice] = {

            ...historico[indice],

            ...dados

        };

    }else{

        historico.unshift(dados);

    }


    historico.sort(

        (a,b) => b.atualizado - a.atualizado

    );


    salvarHistorico(historico);

}


/*====================================================
             OBTER PROGRESSO
====================================================*/

function obterProgresso(id){

    return obterHistorico().find(

        item => item.id == id

    );

}


/*====================================================
             REMOVER PROGRESSO
====================================================*/

function removerHistorico(id){

    const lista = obterHistorico().filter(

        item => item.id != id

    );


    salvarHistorico(lista);

}


/*====================================================
             LISTA ORDENADA
====================================================*/

function listarHistorico(){

    return obterHistorico()

        .sort(

            (a,b) => b.atualizado - a.atualizado

        );

}


/*====================================================
             PORCENTAGEM
====================================================*/

function porcentagemAssistida(item){

    if(!item || !item.duracao) return 0;


    return Math.floor(

        (item.tempo / item.duracao) * 100

    );

}