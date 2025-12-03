import { Page } from "puppeteer";

export interface ParsedGame {
    id: string;
    day: string;
    datetime: string;
    location: "Domicile" | "Extérieur";
    opponent: string;
    us: number | null;
    them: number | null;
    result: "Victoire" | "Défaite" | "N/A";
}

export async function parseCalendar(page: Page): Promise<ParsedGame[]> {
    await page.waitForSelector("#calendar", { timeout: 5000 });

    const data = await page.evaluate(() => {
        const results: ParsedGame[] = [];

        const calendarDiv = document.querySelector(
            "#calendar > div.flex.flex-col.gap-5 > div.flex.flex-col.items-center.w-full > div.w-full"
        );

        if (calendarDiv) {
            const rows = calendarDiv.querySelectorAll(
                "div.bg-white"
            );

            rows.forEach((row) => {
                const infoDivs = row.querySelectorAll("div:nth-child(1) > div.flex.gap-1.items-center > div");
                console.log(infoDivs)
                const id = infoDivs[0]?.textContent?.trim() ?? "";
                console.log(id)
                const day = infoDivs[1]?.textContent?.trim() ?? "";
                const datetime = infoDivs[2]?.textContent?.trim() ?? "";
                const location =
                    infoDivs[3]?.textContent?.trim() === "Domicile"
                        ? "Domicile"
                        : "Extérieur";

                const opponent =
                    row
                        .querySelector("a[title] > div.leading-\\[15px\\]")
                        ?.textContent?.trim() ?? "";

                let leftScore: number | null = null;
                let rightScore: number | null = null;

                const scoreWrapper = row.querySelector(
                    "a[href*='match'] div.flex.flex-row"
                );

                if (scoreWrapper) {
                    const spans = scoreWrapper.querySelectorAll("span");
                    if (spans.length >= 2) {
                        leftScore = Number(spans[0]?.textContent?.trim());
                        rightScore = Number(spans[1]?.textContent?.trim());
                    }
                }

                let us: number | null = null;
                let them: number | null = null;

                if (location === "Domicile") {
                    us = leftScore;
                    them = rightScore;
                } else {
                    us = rightScore;
                    them = leftScore;
                }

                let result: "Victoire" | "Défaite" | "N/A" = "N/A";

                if (us !== null && them !== null) {
                    if (us > them) {
                        result = "Victoire";
                    } else if (us < them) {
                        result = "Défaite";
                    }
                }

                results.push({
                    id,
                    day,
                    datetime,
                    location,
                    opponent,
                    us: Number.isNaN(us) ? null : us,
                    them: Number.isNaN(them) ? null : them,
                    result,
                });
            });
        }
        
        return results;
    });
    

    return data;
}


