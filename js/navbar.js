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

/*=========================================
        MENU CATEGORIAS
=========================================*/

if(btnCategorias){

    btnCategorias.addEventListener("click",()=>{

        categorias.classList.toggle("ativo");
        overlayCategorias.classList.toggle("ativo");

    });

}

/*=========================================
        FECHAR CATEGORIAS
=========================================*/

if(overlayCategorias){

    overlayCategorias.addEventListener("click",()=>{

        categorias.classList.remove("ativo");
        overlayCategorias.classList.remove("ativo");

    });

}

/*=========================================
        MENU MOBILE
=========================================*/

if(menuMobile){

    menuMobile.addEventListener("click",()=>{

        mobileMenu.classList.add("ativo");
        overlayMobile.classList.add("ativo");

    });

}

/*=========================================
        FECHAR MOBILE
=========================================*/

if(fecharMobile){

    fecharMobile.addEventListener("click",fecharMenu);

}

if(overlayMobile){

    overlayMobile.addEventListener("click",fecharMenu);

}

function fecharMenu(){

    mobileMenu.classList.remove("ativo");
    overlayMobile.classList.remove("ativo");

}

/*=========================================
        FECHAR COM ESC
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        categorias.classList.remove("ativo");
        overlayCategorias.classList.remove("ativo");

        fecharMenu();

    }

});

/*=========================================
        FECHAR AO REDIMENSIONAR
=========================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth>900){

        fecharMenu();

    }

});

/*=========================================
        EFEITO NAVBAR
=========================================*/

window.addEventListener("scroll",()=>{

    const navbar=document.querySelector(".navbar");

    if(window.scrollY>40){

        navbar.style.background="#0c0c0c";
        navbar.style.borderBottom="1px solid #333";

    }else{

        navbar.style.background="#111111";
        navbar.style.borderBottom="1px solid #222";

    }

})