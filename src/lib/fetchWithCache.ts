import { fetch } from "undici";
import { SimpleCache } from "./cache.js";
import { delay } from "../utils/delay.js";

const cache = new SimpleCache<any>();

const GLOBAL_SCRAPE_DELAY = 2000; // 2 seconds

export async function fetchWithCache(
    url: string,
    ttlMs: number = 60 * 60 * 1000
) {
    const cached = cache.get(url);
    if (cached) {
        return { fromCache: true, data: cached };
    }

    await delay(GLOBAL_SCRAPE_DELAY);

    const response = await fetch(url, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status} - Impossible de charger l'URL: ${url}`);
    }

    const html = await response.text();

    cache.set(url, html, ttlMs);
    
    return html;
}
