// js/bloqueador-anuncios.js

(() => {

    "use strict";

    const seletores = [
        ".anuncio",
        ".anuncios",
        ".publicidade",
        ".publicidade-container",
        ".advertisement",
        ".advertising",
        ".adsbox",
        ".ad-container",
        "[data-ad]",
        "[data-ads]",
        "[data-ad-slot]"
    ];

    function bloquear() {

        document
            .querySelectorAll(seletores.join(","))
            .forEach(elemento => {

                elemento.remove();

            });

    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            bloquear,
            { once: true }
        );

    } else {

        bloquear();

    }

})();