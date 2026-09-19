
const botao = document.getElementById("tema");
const icone = document.getElementById("iconeTema");

const temaSalvo = localStorage.getItem("tema");

if(temaSalvo==="dark"){

    document.body.classList.add("dark");

    icone.src="img/tema-light.png";

}else{

    icone.src="img/tema-dark.png";

}

botao.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("tema","dark");

        icone.src="img/tema-light.png";

    }else{

        localStorage.setItem("tema","light");

        icone.src="img/tema-dark.png";

    }

});