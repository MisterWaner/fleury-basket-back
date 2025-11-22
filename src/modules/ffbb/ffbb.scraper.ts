import { request } from "undici";
import * as cheerio from "cheerio";

type MatchDetails = {
    journeeId: string;
    journeeLabel: string;
    date: string;
    domicile: string;
    exterieur: string;
    scoreDomicile: number | null;
    scoreExterieur: number | null;
};

type ClassementItem = {
    rank: number;
    team: string;
    points: number;
};

export async function scrapeTeamMatches(
    teamUrl: string
): Promise<{ scrapedAt: string; matches: MatchDetails[] }> {
    const response = await request(teamUrl, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
    });

    if (response.statusCode !== 200) {
        throw new Error(`Failed to fetch team page: ${response.statusCode}`);
    }
    const body = await response.body.text();
    console.log(body)

    return { scrapedAt: new Date().toISOString(), matches: [] };
    
}
