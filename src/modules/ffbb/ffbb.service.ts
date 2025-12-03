import { FFBB_URLS } from "./urls.js";
import { scrapeCalendar } from "./calendar/ffbb.calendar-scraper.js";
import { scrapeRankingTable } from "./ranking/ffbb.ranking-scraper.js";

export const FFBBService = {
    async getSenior1Rencontres() {
        return scrapeCalendar(FFBB_URLS.senior_1.rencontres);
    },
    async getSenior2Rencontres() {
        return scrapeCalendar(FFBB_URLS.senior_2.rencontres);
    },
    async getSenior1Ranking() {
        return scrapeRankingTable(FFBB_URLS.senior_1.classement);
    },
    async getSenior2Ranking() {
        return scrapeRankingTable(FFBB_URLS.senior_2.classement);
    },
};

