import { SimpleCache } from "../../lib/cache.js";
import { scrapeTeamMatches } from "./ffbb.scraper.js";

const cache = new SimpleCache<any>();
const TTL = 60 * 60 * 1000; // 1 hour

export async function getTeamData(teamPageUrl: string) {
    const key = `ffbb_team_${teamPageUrl}`;
    const cached = cache.get(key);
    if (cached) {
        return { fromCache: true, ...cached };
    }

    const matchesData = await scrapeTeamMatches(teamPageUrl);

    cache.set(key, matchesData, TTL);
    return { fromCache: false, ...matchesData };
}