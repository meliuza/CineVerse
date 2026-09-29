/* =====================================================
   CINEVERSE — PLAYER PREMIUM
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const player = document.getElementById("player");

    if (!player || player.tagName !== "VIDEO") {
        console.warn("CineVerse Player: vídeo #player não encontrado.");
        return;
    }

    /* =================================================
       ESTRUTURA
    ================================================= */

    let cinePlayer = player.closest(".cinePlayer");

    if (!cinePlayer) {

        cinePlayer = document.createElement("div");

        cinePlayer.className = "cinePlayer";

        player.parentNode.insertBefore(
            cinePlayer,
            player
        );

        cinePlayer.appendChild(player);
    }

    player.controls = false;

    player.setAttribute(
        "playsinline",
        ""
    );

    player.setAttribute(
        "preload",
        "metadata"
    );

    /* =================================================
       CONTROLES
    ================================================= */

    const controls = document.createElement("div");

    controls.className = "cineControls";

    controls.innerHTML = `

        <div class="cineProgressArea">

            <input
                type="range"
                class="cineProgress"
                min="0"
                max="100"
                value="0"
                step="0.1"
            >

            <div class="cinePreview">
                <div class="cinePreviewTime">
                    00:00
                </div>
            </div>

        </div>

        <div class="cineControlsRow">

            <button
                class="cineBtn cinePlay"
                title="Reproduzir"
            >
                ▶
            </button>

            <button
                class="cineBtn cineBack10"
                title="Voltar 10 segundos"
            >
                ↶
            </button>

            <button
                class="cineBtn cineForward10"
                title="Avançar 10 segundos"
            >
                ↷
            </button>

            <div class="cineVolume">

                <button
                    class="cineBtn cineMute"
                    title="Volume"
                >
                    🔊
                </button>

                <input
                    type="range"
                    class="cineVolumeSlider"
                    min="0"
                    max="1"
                    step="0.01"
                    value="1"
                >

            </div>

            <div class="cineTime">

                <span class="cineCurrentTime">
                    00:00
                </span>

                <span class="cineTimeSeparator">
                    /
                </span>

                <span class="cineDuration">
                    00:00
                </span>

            </div>

            <div class="cineControlsRight">

                <button
                    class="cineBtn cineSubtitle"
                    title="Legendas"
                >
                    CC
                </button>

                <button
                    class="cineBtn cineSettings"
                    title="Configurações"
                >
                    ⚙
                </button>

                <button
                    class="cineBtn cineCinema"
                    title="Modo cinema"
                >
                    🎬
                </button>

                <button
                    class="cineBtn cinePiP"
                    title="Picture in Picture"
                >
                    ▣
                </button>

                <button
                    class="cineBtn cineFullscreen"
                    title="Tela cheia"
                >
                    ⛶
                </button>

            </div>

        </div>

    `;

    cinePlayer.appendChild(controls);

    const centerPlay = document.createElement("button");

centerPlay.className = "cineCenterPlay";

centerPlay.innerHTML = "▶";

centerPlay.setAttribute(
    "aria-label",
    "Reproduzir vídeo"
);

cinePlayer.appendChild(centerPlay);

    /* =================================================
       MENU
    ================================================= */

    const menu = document.createElement("div");

    menu.className = "cineMenu";

    menu.innerHTML = `

        <div class="cineMenuSection">

            <div class="cineMenuTitle">
                Legendas
            </div>

            <button
                class="subtitleToggle active"
            >
                🇧🇷 Português
            </button>

            <button
                class="subtitleOff"
            >
                Desativar legendas
            </button>

        </div>

        <div class="cineMenuSection">

            <div class="cineMenuTitle">
                Tamanho da legenda
            </div>

            <button data-subtitle-size="small">
                Pequena
            </button>

            <button
                data-subtitle-size="normal"
                class="active"
            >
                Normal
            </button>

            <button data-subtitle-size="large">
                Grande
            </button>

        </div>

        <div class="cineMenuSection">

            <div class="cineMenuTitle">
                Velocidade
            </div>

            <button data-speed="0.5">
                0.5x
            </button>

            <button data-speed="0.75">
                0.75x
            </button>

            <button
                data-speed="1"
                class="active"
            >
                Normal
            </button>

            <button data-speed="1.25">
                1.25x
            </button>

            <button data-speed="1.5">
                1.5x
            </button>

            <button data-speed="2">
                2x
            </button>

        </div>

        <div class="cineMenuSection">

            <div class="cineMenuTitle">
                Temporizador
            </div>

            <button data-sleep="15">
                15 minutos
            </button>

            <button data-sleep="30">
                30 minutos
            </button>

            <button data-sleep="60">
                1 hora
            </button>

            <button data-sleep="off">
                Desativar
            </button>

        </div>

    `;

    cinePlayer.appendChild(menu);

    /* =================================================
       TOAST
    ================================================= */

    const toast = document.createElement("div");

    toast.className = "cineToast";

    cinePlayer.appendChild(toast);

    let toastTimer = null;

    function mostrarToast(texto) {

        toast.textContent = texto;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 1800);
    }

    /* =================================================
       ELEMENTOS
    ================================================= */

    const playBtn =
        controls.querySelector(".cinePlay");

    const backBtn =
        controls.querySelector(".cineBack10");

    const forwardBtn =
        controls.querySelector(".cineForward10");

    const muteBtn =
        controls.querySelector(".cineMute");

    const volumeSlider =
        controls.querySelector(".cineVolumeSlider");

    const progress =
        controls.querySelector(".cineProgress");

    const currentTime =
        controls.querySelector(".cineCurrentTime");

    const duration =
        controls.querySelector(".cineDuration");

    const subtitleBtn =
        controls.querySelector(".cineSubtitle");

    const settingsBtn =
        controls.querySelector(".cineSettings");

    const cinemaBtn =
        controls.querySelector(".cineCinema");

    const pipBtn =
        controls.querySelector(".cinePiP");

    const fullscreenBtn =
        controls.querySelector(".cineFullscreen");

    const preview =
        controls.querySelector(".cinePreview");

    const previewTime =
        controls.querySelector(".cinePreviewTime");

    /* =================================================
       TEMPO
    ================================================= */

    function formatarTempo(segundos) {

        if (!Number.isFinite(segundos)) {
            return "00:00";
        }

        segundos = Math.max(
            0,
            Math.floor(segundos)
        );

        const horas =
            Math.floor(segundos / 3600);

        const minutos =
            Math.floor(
                (segundos % 3600) / 60
            );

        const segundosRestantes =
            segundos % 60;

        if (horas > 0) {

            return (
                String(horas).padStart(2, "0")
                + ":" +
                String(minutos).padStart(2, "0")
                + ":" +
                String(segundosRestantes).padStart(2, "0")
            );

        }

        return (
            String(minutos).padStart(2, "0")
            + ":" +
            String(segundosRestantes).padStart(2, "0")
        );
    }

    /* =================================================
       PLAY / PAUSE
    ================================================= */

    function atualizarPlay() {

        if (player.paused) {

            playBtn.textContent = "▶";
            playBtn.title = "Reproduzir";

        } else {

            playBtn.textContent = "❚❚";
            playBtn.title = "Pausar";
        }
    }

    async function alternarPlay() {

        try {

            if (player.paused) {

                await player.play();

            } else {

                player.pause();
            }

        } catch (erro) {

            console.warn(
                "Não foi possível reproduzir o vídeo:",
                erro
            );
        }
    }

    centerPlay.addEventListener(
    "click",
    evento => {

        evento.stopPropagation();

        alternarPlay();
    }
);

player.addEventListener(
    "play",
    () => {

        centerPlay.classList.add(
            "hidden"
        );
    }
);

player.addEventListener(
    "pause",
    () => {

        centerPlay.classList.remove(
            "hidden"
        );
    }
);

player.addEventListener(
    "ended",
    () => {

        centerPlay.classList.remove(
            "hidden"
        );
    }
);

    playBtn.addEventListener(
        "click",
        alternarPlay
    );

    player.addEventListener(
        "play",
        atualizarPlay
    );

    player.addEventListener(
        "pause",
        atualizarPlay
    );

    player.addEventListener(
        "ended",
        atualizarPlay
    );

    /* =================================================
       AVANÇAR / VOLTAR
    ================================================= */

    backBtn.addEventListener(
        "click",
        () => {

            player.currentTime =
                Math.max(
                    0,
                    player.currentTime - 10
                );

            mostrarToast("−10 segundos");
        }
    );

    forwardBtn.addEventListener(
        "click",
        () => {

            player.currentTime =
                Math.min(
                    player.duration || Infinity,
                    player.currentTime + 10
                );

            mostrarToast("+10 segundos");
        }
    );

    /* =================================================
       PROGRESSO
    ================================================= */

    player.addEventListener(
        "loadedmetadata",
        () => {

            duration.textContent =
                formatarTempo(
                    player.duration
                );

            progress.value = 0;

            progress.style.background = `
                linear-gradient(
                    to right,
                    #ffffff 0%,
                    #ffffff 0%,
                    rgba(255,255,255,.25) 0%,
                    rgba(255,255,255,.25) 100%
                )
            `;
        }
    );

    player.addEventListener(
        "timeupdate",
        () => {

            if (!player.duration) {
                return;
            }

            const porcentagem =
                (player.currentTime /
                    player.duration) * 100;

            progress.value =
                porcentagem;

            currentTime.textContent =
                formatarTempo(
                    player.currentTime
                );

            duration.textContent =
                formatarTempo(
                    player.duration
                );
        }
    );

    progress.addEventListener(
        "input",
        () => {

            if (!player.duration) {
                return;
            }

            player.currentTime =
                (Number(progress.value) / 100)
                * player.duration;
        }
    );

    /* =================================================
       PREVIEW DA TIMELINE
    ================================================= */

    progress.addEventListener(
        "mousemove",
        evento => {

            if (!player.duration) {
                return;
            }

            const rect =
                progress.getBoundingClientRect();

            const porcentagem =
                Math.max(
                    0,
                    Math.min(
                        1,
                        (evento.clientX - rect.left)
                        / rect.width
                    )
                );

            const tempo =
                porcentagem *
                player.duration;

            previewTime.textContent =
                formatarTempo(tempo);

            preview.style.left =
                `${porcentagem * 100}%`;

            preview.classList.add(
                "visible"
            );
        }
    );

    progress.addEventListener(
        "mouseleave",
        () => {

            preview.classList.remove(
                "visible"
            );
        }
    );

    /* =================================================
       VOLUME
    ================================================= */

    const volumeSalvo =
        localStorage.getItem(
            "cineverse_volume"
        );

    if (volumeSalvo !== null) {

        player.volume =
            Number(volumeSalvo);

        volumeSlider.value =
            player.volume;
    }

    volumeSlider.addEventListener(
        "input",
        () => {

            player.volume =
                Number(volumeSlider.value);

            player.muted =
                player.volume === 0;

            localStorage.setItem(
                "cineverse_volume",
                player.volume
            );

            atualizarMute();
        }
    );

    function atualizarMute() {

        if (
            player.muted ||
            player.volume === 0
        ) {

            muteBtn.textContent = "🔇";

        } else if (
            player.volume < .5
        ) {

            muteBtn.textContent = "🔉";

        } else {

            muteBtn.textContent = "🔊";
        }
    }

    muteBtn.addEventListener(
        "click",
        () => {

            player.muted =
                !player.muted;

            atualizarMute();
        }
    );

    /* =================================================
       CONFIGURAÇÕES
    ================================================= */

    settingsBtn.addEventListener(
        "click",
        evento => {

            evento.stopPropagation();

            menu.classList.toggle(
                "open"
            );
        }
    );

    document.addEventListener(
        "click",
        evento => {

            if (
                !menu.contains(evento.target) &&
                evento.target !== settingsBtn
            ) {

                menu.classList.remove(
                    "open"
                );
            }
        }
    );

    /* =================================================
       VELOCIDADE
    ================================================= */

    const velocidadeSalva =
        localStorage.getItem(
            "cineverse_speed"
        );

    if (velocidadeSalva) {

        player.playbackRate =
            Number(velocidadeSalva);
    }

    menu
        .querySelectorAll("[data-speed]")
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    const velocidade =
                        Number(
                            botao.dataset.speed
                        );

                    player.playbackRate =
                        velocidade;

                    localStorage.setItem(
                        "cineverse_speed",
                        velocidade
                    );

                    menu
                        .querySelectorAll(
                            "[data-speed]"
                        )
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );

                    botao.classList.add(
                        "active"
                    );

                    mostrarToast(
                        `Velocidade: ${velocidade}x`
                    );
                }
            );

        });

    /* =================================================
       LEGENDAS
    ================================================= */

    function obterTracks() {

        return player.querySelectorAll(
            "track"
        );
    }

    function definirLegendas(ativar) {

        const tracks =
            obterTracks();

        tracks.forEach(track => {

            track.track.mode =
                ativar
                    ? "showing"
                    : "disabled";
        });

        localStorage.setItem(
            "cineverse_legendas",
            ativar
                ? "on"
                : "off"
        );

        subtitleBtn.classList.toggle(
            "active",
            ativar
        );
    }

    subtitleBtn.addEventListener(
        "click",
        () => {

            const tracks =
                obterTracks();

            if (!tracks.length) {

                mostrarToast(
                    "Este vídeo não possui legenda."
                );

                return;
            }

            const algumaAtiva =
                [...tracks].some(
                    track =>
                        track.track.mode ===
                        "showing"
                );

            definirLegendas(
                !algumaAtiva
            );
        }
    );

    menu
        .querySelector(".subtitleToggle")
        .addEventListener(
            "click",
            () => {

                definirLegendas(true);

                mostrarToast(
                    "Legendas ativadas"
                );
            }
        );

    menu
        .querySelector(".subtitleOff")
        .addEventListener(
            "click",
            () => {

                definirLegendas(false);

                mostrarToast(
                    "Legendas desativadas"
                );
            }
        );

    /* =================================================
       TAMANHO DA LEGENDA
    ================================================= */

    const tamanhos = {

        small: "0.95em",

        normal: "1.15em",

        large: "1.4em"
    };

    const tamanhoSalvo =
        localStorage.getItem(
            "cineverse_subtitle_size"
        ) || "normal";

    function aplicarTamanhoLegenda(
        tamanho
    ) {

        let style =
            document.getElementById(
                "cineverseSubtitleStyle"
            );

        if (!style) {

            style =
                document.createElement(
                    "style"
                );

            style.id =
                "cineverseSubtitleStyle";

            document.head.appendChild(
                style
            );
        }

        style.textContent = `
            #player::cue {
                font-size:
                    ${tamanhos[tamanho]}
                    !important;
            }
        `;

        localStorage.setItem(
            "cineverse_subtitle_size",
            tamanho
        );
    }

    aplicarTamanhoLegenda(
        tamanhoSalvo
    );

    menu
        .querySelectorAll(
            "[data-subtitle-size]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    const tamanho =
                        botao.dataset.subtitleSize;

                    aplicarTamanhoLegenda(
                        tamanho
                    );

                    menu
                        .querySelectorAll(
                            "[data-subtitle-size]"
                        )
                        .forEach(item =>
                            item.classList.remove(
                                "active"
                            )
                        );

                    botao.classList.add(
                        "active"
                    );

                    mostrarToast(
                        "Tamanho da legenda alterado"
                    );
                }
            );

        });

    /* =================================================
       TEMPORIZADOR
    ================================================= */

    let sleepTimer = null;

    menu
        .querySelectorAll(
            "[data-sleep]"
        )
        .forEach(botao => {

            botao.addEventListener(
                "click",
                () => {

                    const valor =
                        botao.dataset.sleep;

                    clearTimeout(
                        sleepTimer
                    );

                    if (valor === "off") {

                        mostrarToast(
                            "Temporizador desativado"
                        );

                        return;
                    }

                    const minutos =
                        Number(valor);

                    sleepTimer =
                        setTimeout(
                            () => {

                                player.pause();

                                mostrarToast(
                                    "Vídeo pausado pelo temporizador."
                                );

                            },
                            minutos *
                            60 *
                            1000
                        );

                    mostrarToast(
                        `Temporizador: ${minutos} min`
                    );
                }
            );

        });

    /* =================================================
       MODO CINEMA
    ================================================= */

    cinemaBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "cinemaMode"
            );

            const ativo =
                document.body.classList.contains(
                    "cinemaMode"
                );

            cinemaBtn.textContent =
                ativo
                    ? "✕"
                    : "🎬";

            mostrarToast(
                ativo
                    ? "Modo cinema ativado"
                    : "Modo cinema desativado"
            );
        }
    );

    /* =================================================
       FULLSCREEN
    ================================================= */

    async function entrarFullscreen() {

        try {

            if (!document.fullscreenElement) {

                if (
                    cinePlayer.requestFullscreen
                ) {

                    await cinePlayer
                        .requestFullscreen();

                } else if (
                    player.webkitEnterFullscreen
                ) {

                    player.webkitEnterFullscreen();
                }

                fullscreenBtn.textContent =
                    "⛶";

            } else {

                await document.exitFullscreen();

            }

        } catch (erro) {

            console.warn(
                "Fullscreen:",
                erro
            );
        }
    }

    fullscreenBtn.addEventListener(
        "click",
        entrarFullscreen
    );

    document.addEventListener(
        "fullscreenchange",
        () => {

            fullscreenBtn.textContent =
                document.fullscreenElement
                    ? "✕"
                    : "⛶";
        }
    );

    /* =================================================
       PICTURE IN PICTURE
    ================================================= */

    if (
        !document.pictureInPictureEnabled
    ) {

        pipBtn.style.display =
            "none";
    }

    pipBtn.addEventListener(
        "click",
        async () => {

            try {

                if (
                    document.pictureInPictureElement
                ) {

                    await document
                        .exitPictureInPicture();

                } else {

                    await player
                        .requestPictureInPicture();
                }

            } catch (erro) {

                console.warn(
                    "Picture in Picture:",
                    erro
                );
            }
        }
    );

    /* =================================================
       DUPLO CLIQUE
    ================================================= */

    let ultimoClique = 0;

    cinePlayer.addEventListener(
        "click",
        evento => {

            const agora =
                Date.now();

            if (
                agora - ultimoClique <
                280
            ) {

                const rect =
                    player.getBoundingClientRect();

                const posicao =
                    evento.clientX -
                    rect.left;

                const metade =
                    rect.width / 2;

                if (posicao < metade) {

                    player.currentTime =
                        Math.max(
                            0,
                            player.currentTime - 10
                        );

                    mostrarToast(
                        "−10 segundos"
                    );

                } else {

                    player.currentTime =
                        Math.min(
                            player.duration || Infinity,
                            player.currentTime + 10
                        );

                    mostrarToast(
                        "+10 segundos"
                    );
                }
            }

            ultimoClique = agora;
        }
    );

    /* =================================================
       TECLADO
    ================================================= */

    document.addEventListener(
        "keydown",
        evento => {

            const tag =
                document.activeElement?.tagName;

            if (
                tag === "INPUT" ||
                tag === "TEXTAREA"
            ) {
                return;
            }

            switch (evento.key.toLowerCase()) {

                case " ":

                    evento.preventDefault();

                    alternarPlay();

                    break;

                case "arrowleft":

                    evento.preventDefault();

                    player.currentTime =
                        Math.max(
                            0,
                            player.currentTime - 5
                        );

                    break;

                case "arrowright":

                    evento.preventDefault();

                    player.currentTime =
                        Math.min(
                            player.duration || Infinity,
                            player.currentTime + 5
                        );

                    break;

                case "m":

                    player.muted =
                        !player.muted;

                    atualizarMute();

                    break;

                case "f":

                    entrarFullscreen();

                    break;

                case "c":

                    subtitleBtn.click();

                    break;

                case "escape":

                    if (
                        document.body.classList
                            .contains(
                                "cinemaMode"
                            )
                    ) {

                        document.body.classList
                            .remove(
                                "cinemaMode"
                            );
                    }

                    break;
            }

        }
    );

    /* =================================================
       MOSTRAR / ESCONDER CONTROLES
    ================================================= */

    let hideTimer = null;

    function mostrarControles() {

        cinePlayer.classList.add(
            "controlsVisible"
        );

        clearTimeout(
            hideTimer
        );

        hideTimer =
            setTimeout(
                () => {

                    if (!player.paused) {

                        cinePlayer.classList
                            .remove(
                                "controlsVisible"
                            );
                    }

                },
                3000
            );
    }

    cinePlayer.addEventListener(
        "mousemove",
        mostrarControles
    );

    cinePlayer.addEventListener(
        "touchstart",
        mostrarControles,
        {
            passive: true
        }
    );

    cinePlayer.addEventListener(
        "mouseleave",
        () => {

            if (!player.paused) {

                cinePlayer.classList
                    .remove(
                        "controlsVisible"
                    );
            }
        }
    );

    /* =================================================
       RESTAURAR VOLUME
    ================================================= */

    atualizarMute();

/* =================================================
   SALVAR PROGRESSO
================================================= */

let ultimoSalvamento = 0;

player.addEventListener(
    "timeupdate",
    () => {

        if(!player.duration){
            return;
        }

        const porcentagem =
            (player.currentTime / player.duration) * 100;

        progress.value = porcentagem;

        /* =========================================
           PARTE JÁ ASSISTIDA
        ========================================= */

        progress.style.background = `
            linear-gradient(
                to right,
                #ffffff 0%,
                #ffffff ${porcentagem}%,
                rgba(255,255,255,.25) ${porcentagem}%,
                rgba(255,255,255,.25) 100%
            )
        `;

        currentTime.textContent =
            formatarTempo(player.currentTime);

        duration.textContent =
            formatarTempo(player.duration);


        /* =========================================
           SALVAR NO HISTÓRICO
        ========================================= */

        const agora = Date.now();

        // Salva no máximo a cada 2 segundos
        if(agora - ultimoSalvamento < 2000){
            return;
        }

        ultimoSalvamento = agora;


        const filmeId =
            new URLSearchParams(
                window.location.search
            ).get("id");

        if(!filmeId){
            return;
        }

        /* =========================================
        SALVAR TAMBÉM PARA RETOMAR O VÍDEO
        ========================================= */

        localStorage.setItem(
            `cineverse_progresso_${filmeId}`,
            JSON.stringify({
                tempo: player.currentTime,
                duracao: player.duration
            })
        );


        if(
            typeof registrarProgresso === "function"
        ){

            registrarProgresso({

                id: filmeId,

                tipo:
                    typeof filme !== "undefined"
                        ? filme.tipo
                        : "Filme",

                nome:
                    typeof filme !== "undefined"
                        ? filme.nome
                        : "",

                categoria:
                    typeof filme !== "undefined"
                        ? filme.categoria
                        : "",

                genero:
                    typeof filme !== "undefined" &&
                    Array.isArray(filme.genero)
                        ? filme.genero
                        : [],

                tempo: player.currentTime,

                duracao: player.duration

            });

        }

    }
);

    /* =================================================
       RESTAURAR PROGRESSO
    ================================================= */

    player.addEventListener(
        "loadedmetadata",
        () => {

            const filmeId =
                new URLSearchParams(
                    window.location.search
                ).get("id");

            if (!filmeId) {
                return;
            }

            const salvo =
                localStorage.getItem(
                    `cineverse_progresso_${filmeId}`
                );

            if (!salvo) {
                return;
            }

            try {

                const dados =
                    JSON.parse(salvo);

                if (
                    Number.isFinite(
                        dados.tempo
                    ) &&
                    dados.tempo > 10 &&
                    dados.tempo <
                    player.duration - 5
                ) {

                    player.currentTime =
                        dados.tempo;
                }

            } catch (erro) {

                console.warn(
                    "Erro ao restaurar progresso:",
                    erro
                );
            }
        }
    );

    /* =================================================
       LIMPAR PROGRESSO AO TERMINAR
    ================================================= */

    player.addEventListener(
        "ended",
        () => {

            const filmeId =
                new URLSearchParams(
                    window.location.search
                ).get("id");

            if (!filmeId) {
                return;
            }

            localStorage.removeItem(
                `cineverse_progresso_${filmeId}`
            );
        }
    );

    /* =================================================
       INICIALIZAÇÃO
    ================================================= */

    atualizarPlay();
    atualizarMute();

    console.log(
        "🎬 CineVerse Player carregado!"
    );

});