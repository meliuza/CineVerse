/*=========================================
            SLIDER.JS
=========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    const sliders=document.querySelectorAll(".listaFilmes");

    sliders.forEach(slider=>{

        /*=================================
                BOTÕES
        =================================*/

        const proximo=slider.parentElement.querySelector(".proximo");
        const voltar=slider.parentElement.querySelector(".voltar");

        if(proximo){

            proximo.addEventListener("click",()=>{

                slider.scrollBy({

                    left:900,

                    behavior:"smooth"

                });

            });

        }

        if(voltar){

            voltar.addEventListener("click",()=>{

                slider.scrollBy({

                    left:-900,

                    behavior:"smooth"

                });

            });

        }

        /*=================================
            ARRASTAR COM MOUSE
        =================================*/

        let pressionado=false;

        let inicioX;

        let scrollInicial;

        slider.addEventListener("mousedown",(e)=>{

            pressionado=true;

            slider.classList.add("arrastando");

            inicioX=e.pageX-slider.offsetLeft;

            scrollInicial=slider.scrollLeft;

        });

        slider.addEventListener("mouseleave",()=>{

            pressionado=false;

            slider.classList.remove("arrastando");

        });

        slider.addEventListener("mouseup",()=>{

            pressionado=false;

            slider.classList.remove("arrastando");

        });

        slider.addEventListener("mousemove",(e)=>{

            if(!pressionado) return;

            e.preventDefault();

            const x=e.pageX-slider.offsetLeft;

            const distancia=(x-inicioX)*2;

            slider.scrollLeft=scrollInicial-distancia;

        });

        /*=================================
            TOUCH CELULAR
        =================================*/

        let touchX=0;

        slider.addEventListener("touchstart",(e)=>{

            touchX=e.touches[0].clientX;

        });

        slider.addEventListener("touchmove",(e)=>{

            const atual=e.touches[0].clientX;

            slider.scrollLeft += (touchX-atual);

            touchX=atual;

        });

    });

});