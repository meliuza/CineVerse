/*====================================================
                HISTORICO.JS
        Sistema Universal CineVerse
====================================================*/

const CHAVE_HISTORICO = "cineverse_historico";

/*====================================================
            CARREGAR HISTÓRICO
====================================================*/

function obterHistorico(){

    return JSON.parse(

        localStorage.getItem(CHAVE_HISTORICO)

    ) || [];

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

        episodio,

        tempo,

        duracao,

        atualizado:Date.now()

    };

    if(indice >= 0){

        historico[indice] = dados;

    }else{

        historico.push(dados);

    }

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

        (a,b)=>b.atualizado-a.atualizado

    );

}

/*====================================================
        PORCENTAGEM
====================================================*/

function porcentagemAssistida(item){

    if(!item.duracao) return 0;

    return Math.floor(

        (item.tempo/item.duracao)*100

    );

}