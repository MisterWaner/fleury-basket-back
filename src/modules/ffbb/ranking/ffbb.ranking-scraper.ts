import puppeteer from "puppeteer";
import { parseRankingTable } from "./ffbb.ranking-parser.js";
import type { ParsedRankingTableRow } from "./ffbb.ranking-parser.js";
import { SimpleCache } from "../../../lib/cache.js";
import { delay } from "../../../lib/delay.js";

const scrapedDataCache = new SimpleCache<ParsedRankingTableRow[]>();
const GLOBAL_SCRAPE_DELAY_MS = 2000;

export async function scrapeRankingTable(url: string) {
    const cachedData = scrapedDataCache.get(url);
    if (cachedData) {
        return cachedData;
    }

    await delay(GLOBAL_SCRAPE_DELAY_MS);

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
        const page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        );

        await page.goto(url, { waitUntil: "networkidle2" });

        const raw = await parseRankingTable(page);

        scrapedDataCache.set(url, raw, 60 * 60 * 1000); // Cache for 1 hour

        return raw;
    } catch (error) {
        console.error("Error during scraping:", error);
        throw error;
    } finally {
        await browser.close();
    }
}
