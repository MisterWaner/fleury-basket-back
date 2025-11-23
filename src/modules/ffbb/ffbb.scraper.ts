import { fetchWithCache } from "../../lib/fetchWithCache.js";
import { parseRencontres } from "./ffbb.parser.js";

export async function scrapeRencontres(url: string) {
    const html = await fetchWithCache(url);
    return parseRencontres(html);
}
