const novelas = {

    1003: {

        temporadas: [

            {
                nome: "Temporada 1",

                episodios: Array.from(
                    { length: 146 },
                    (_, indice) => {

                        const numero = indice + 1;

                        return {
                            numero: numero,
                            nome: `Episódio ${numero}`,
                            video: "0"
                        };

                    }
                )

            }

        ]

    }

};