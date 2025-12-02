export interface Game {
    id: string | undefined;
    day: string | undefined;
    datetime: string | undefined;
    location: "Domicile" | "Extérieur" | undefined;
    opponent: string | undefined;
    score: {
        us: number | undefined;
        them: number | undefined;
    };
}

export function cleanParse(raw: string[]): Game[] {
    const games: Game[] = [];

    // On parcourt par blocs de 10 éléments (pattern FFBB détecté)
    for (let i = 0; i < raw.length; i++) {
        if (!raw[i]?.startsWith("#")) continue;

        const id = raw[i + 3];
        const day = raw[i + 4];
        const datetime = raw[i + 5];
        const location = raw[i + 6];
        const opponentRaw = raw[i + 7];
        const scoreShort = raw[i + 9]; // souvent mal découpé, mais exploitable

        const opponent = opponentRaw?.split(" - ")[0]?.trim();

        // Extraction score brut
        const scoreDigits = opponentRaw?.split(" - ")[1] ?? "";
        // Séparation heuristique (tu pourras ajuster)
        const us = Number(scoreDigits.slice(0, 2));
        const them = Number(scoreDigits.slice(2));

        games.push({
            id,
            day,
            datetime,
            location: location as "Domicile" | "Extérieur",
            opponent,
            score: {
                us: isNaN(us) ? 0 : us,
                them: isNaN(them) ? 0 : them,
            },
        });
    }

    return games;
}



