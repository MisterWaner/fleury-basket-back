import { Page } from "puppeteer";

export interface ParsedRankingTableRow {
    position: number;
    club: string;
    rankingPoints: number;
    gamesData: {
        played: number;
        won: number;
        lost: number;
        nulls: number;
    };

    points: {
        for: number;
        against: number;
        difference: number;
    };
}

export async function parseRankingTable(
    page: Page
): Promise<ParsedRankingTableRow[]> {
    await page.waitForSelector("table", { timeout: 5000 });

    const data = await page.evaluate(() => {
        const results: ParsedRankingTableRow[] = [];

        const table = document.querySelector("table");

        if (table) {
            const rows = table.querySelectorAll("tbody > tr.bg-white");

            rows.forEach((row) => {
                const cells = row.querySelectorAll("td");
                const position = Number(cells[0]?.textContent?.trim() ?? "0");
                const club = cells[1]?.textContent?.trim() ?? "";
                const rankingPoints = Number(
                    cells[2]?.textContent?.trim() ?? "0"
                );
                const gamesDataRow = cells[3]?.querySelector("div");
                const gamesDataCells = gamesDataRow?.querySelectorAll("div");
                const gamesData = {
                    played: Number(
                        gamesDataCells?.[0]?.textContent?.trim() ?? "0"
                    ),
                    won: Number(
                        gamesDataCells?.[1]?.textContent?.trim() ?? "0"
                    ),
                    lost: Number(
                        gamesDataCells?.[2]?.textContent?.trim() ?? "0"
                    ),
                    nulls: Number(
                        gamesDataCells?.[3]?.textContent?.trim() ?? "0"
                    ),
                };

                const pointsDataRow = cells[10]?.querySelector("div");
                const pointsDataCells = pointsDataRow?.querySelectorAll("div");
                const points = {
                    for: Number(
                        pointsDataCells?.[0]?.textContent?.trim() ?? "0"
                    ),
                    against: Number(
                        pointsDataCells?.[1]?.textContent?.trim() ?? "0"
                    ),
                    difference: Number(
                        pointsDataCells?.[2]?.textContent?.trim() ?? "0"
                    ),
                };

                results.push({
                    position,
                    club,
                    rankingPoints,
                    gamesData,
                    points,
                });
            });

            return results;
        }
    });

    return data || [];
}
