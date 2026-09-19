/*=========================================
        BARBIE MYSTERIES
=========================================*/

const temporadas = [

{
    temporada:1,
    titulo:"The Great Horse Chase",
    episodios:[

        {
            numero:1,
            nome:"Episode 1",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"Barbie Malibu e Barbie Brooklyn começam um novo mistério.",
            video:""
        },

        {
            numero:2,
            nome:"Episode 2",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"As pistas levam a uma competição de cavalos.",
            video:""
        },

        {
            numero:3,
            nome:"Episode 3",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"As duas Barbies descobrem um suspeito.",
            video:""
        },

        {
            numero:4,
            nome:"Episode 4",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"A investigação fica ainda mais complicada.",
            video:""
        },

        {
            numero:5,
            nome:"Episode 5",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"O grande mistério é resolvido.",
            video:""
        }

    ]
},

{
    temporada:2,
    titulo:"The Malibu Mystery",
    episodios:[

        {
            numero:1,
            nome:"Episode 1",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"Um novo mistério começa em Malibu.",
            video:""
        },

        {
            numero:2,
            nome:"Episode 2",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"As investigações continuam.",
            video:""
        },

        {
            numero:3,
            nome:"Episode 3",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"Novos suspeitos aparecem.",
            video:""
        },

        {
            numero:4,
            nome:"Episode 4",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"O caso fica cada vez mais misterioso.",
            video:""
        },

        {
            numero:5,
            nome:"Episode 5",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"As Barbies chegam perto da verdade.",
            video:""
        },

        {
            numero:6,
            nome:"Episode 6",
            imagem:"https://zwgzxewhpmxyksfripti.supabase.co/storage/v1/object/public/Videos/horse%20chase%20ep%201.jpg",
            descricao:"Mistério resolvido.",
            video:""
        }

    ]
}

];

/*=========================================
        GERAR EPISÓDIOS
=========================================*/

const container = document.getElementById("episodios");

temporadas.forEach(temp=>{
document.querySelectorAll(".btn-assistido").forEach(botao=>{

    const onclick = botao.getAttribute("onclick");

    const id = onclick.match(/'(.*?)'/)[1];

    if(localStorage.getItem(id)=="true"){

        botao.classList.add("assistido");

        botao.innerHTML="✔ Assistido";

    }

});

    const titulo = document.createElement("h3");

    titulo.className = "titulo-temporada";

    titulo.innerHTML = `🎀 Temporada ${temp.temporada} <small>${temp.titulo}</small>`;

    container.appendChild(titulo);

    const grade = document.createElement("div");

    grade.className = "grade-temporada";

    temp.episodios.forEach((ep,index)=>{

        grade.innerHTML += `

        <div class="episodio">

            <img src="${ep.imagem}" alt="${ep.nome}">

            <div class="episodio-info">

                <h3>Episódio ${ep.numero}</h3>

                <strong>${ep.nome}</strong>

                <p>${ep.descricao}</p>

                <button class="btn-episodio" onclick="assistir('${ep.video}')">
                    ▶ Assistir
                </button>

                <button class="btn-assistido" onclick="marcarAssistido(this,'t${temp.temporada}ep${index+1}')">
                    ✔ Marcar como assistido
                </button>

            </div>

        </div>

        `;

    });

    container.appendChild(grade);

});

/*=========================================
        ASSISTIR
=========================================*/

function assistir(link){

    if(link===""){

        alert("Este episódio ainda não possui link.");

        return;

    }

    window.open(link,"_blank");

}




















function marcarAssistido(botao,id){

    const assistido =
        !botao.classList.contains("assistido");

    if(assistido){

        botao.classList.add("assistido");
        botao.innerHTML="✔ Assistido";

    }else{

        botao.classList.remove("assistido");
        botao.innerHTML="✔ Marcar como assistido";

    }

    localStorage.setItem(id,assistido);

}