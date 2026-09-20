/*=========================================
            ELEMENTOS
=========================================*/

const btnCategorias = document.getElementById("btnCategorias");
const categorias = document.getElementById("categorias");
const overlayCategorias = document.getElementById("overlayCategorias");

const menuMobile = document.getElementById("menuMobile");
const mobileMenu = document.getElementById("mobileMenu");
const overlayMobile = document.getElementById("overlayMobile");

const fecharMobile = document.querySelector("#mobileMenu .fechar");
const mobileCategorias = document.getElementById("mobileCategorias");


/*=========================================
        ABRIR / FECHAR CATEGORIAS
=========================================*/

function abrirCategorias(){

    if(!categorias) return;

    categorias.classList.add("ativo");

    if(overlayCategorias){
        overlayCategorias.classList.add("ativo");
    }

}


function fecharCategorias(){

    if(!categorias) return;

    categorias.classList.remove("ativo");

    if(overlayCategorias){
        overlayCategorias.classList.remove("ativo");
    }

}


/*=========================================
        BOTÃO CATEGORIAS DESKTOP
=========================================*/

if(btnCategorias){

    btnCategorias.addEventListener("click",()=>{

        if(categorias.classList.contains("ativo")){

            fecharCategorias();

        }else{

            abrirCategorias();

        }

    });

}


/*=========================================
        BOTÃO CATEGORIAS MOBILE
=========================================*/

if(mobileCategorias){

    mobileCategorias.addEventListener("click",()=>{

        // Fecha o menu lateral
        fecharMenu();

        // Abre o painel de categorias
        abrirCategorias();

    });

}


/*=========================================
        FECHAR CATEGORIAS
=========================================*/

if(overlayCategorias){

    overlayCategorias.addEventListener("click",()=>{

        fecharCategorias();

    });

}


/*=========================================
            MENU MOBILE
=========================================*/

if(menuMobile){

    menuMobile.addEventListener("click",()=>{

        mobileMenu.classList.add("ativo");

        if(overlayMobile){
            overlayMobile.classList.add("ativo");
        }

    });

}


/*=========================================
            FECHAR MOBILE
=========================================*/

if(fecharMobile){

    fecharMobile.addEventListener("click",()=>{

        fecharMenu();

    });

}


if(overlayMobile){

    overlayMobile.addEventListener("click",()=>{

        fecharMenu();

    });

}


function fecharMenu(){

    if(mobileMenu){
        mobileMenu.classList.remove("ativo");
    }

    if(overlayMobile){
        overlayMobile.classList.remove("ativo");
    }

}


/*=========================================
        FECHAR TUDO COM ESC
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        fecharCategorias();

        fecharMenu();

    }

});


/*=========================================
        FECHAR AO REDIMENSIONAR
=========================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth > 900){

        fecharMenu();

    }

});


/*=========================================
            EFEITO NAVBAR
=========================================*/

window.addEventListener("scroll",()=>{

    const navbar = document.querySelector(".navbar");

    if(!navbar) return;


    if(window.scrollY > 40){

        navbar.style.background = "#0c0c0c";
        navbar.style.borderBottom = "1px solid #333";

    }else{

        navbar.style.background = "#111111";
        navbar.style.borderBottom = "1px solid #222";

    }

});