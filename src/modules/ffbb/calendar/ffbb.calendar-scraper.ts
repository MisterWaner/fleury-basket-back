import puppeteer from "puppeteer";
import { parseCalendar } from "./ffbb.calendar-parser.js";
import type { ParsedGame } from "./ffbb.calendar-parser.js";
import { SimpleCache } from "../../../lib/cache.js";
import { delay } from "../../../lib/delay.js";

const scrapedDataCache = new SimpleCache<ParsedGame[]>();
const GLOBAL_SCRAPE_DELAY_MS = 2000;

export async function scrapeCalendar(url: string) {
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

        const raw = await parseCalendar(page);
        const parsed = raw.map((game) => ({
            ...game,
            us: isNaN(game.us as number) ? null : game.us,
            them: isNaN(game.them as number) ? null : game.them,
        }));

        scrapedDataCache.set(url, parsed, 60 * 60 * 1000); // Cache for 1 hour

        return parsed;
    } catch (error) {
        console.error("Error during scraping:", error);
        throw error;
    } finally {
        await browser.close();
    }
}

