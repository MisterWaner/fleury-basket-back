import { FFBB_URLS } from "./urls.js";
import { scrapeRencontres } from "./ffbb.scraper.js";

export const FFBBService = {
    async getSenior1Rencontres() {
        return scrapeRencontres(FFBB_URLS.senior_1.rencontres);
    },
    async getSenior2Rencontres() {
        return scrapeRencontres(FFBB_URLS.senior_2.rencontres);
    },
};
