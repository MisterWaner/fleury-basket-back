import { Page } from "puppeteer";

export async function parseRencontres(page: Page) {
    await page.waitForSelector(
        "#calendar > div.flex.flex-col.gap-5 > div.flex.flex-col.items-center.w-full > div.w-full",
        { timeout: 5000 }
    );

    const data = await page.evaluate(() => {
        const results: string[] = [];
        const calendar = document.querySelector(
            "#calendar > div.flex.flex-col.gap-5 > div.flex.flex-col.items-center.w-full > div.w-full"
        );

        if (calendar) {
            calendar?.querySelectorAll("div").forEach((row) => {
                const text = row.textContent?.trim();
                if (text) {
                    results.push(text);
                }
            });
        }
        return results;
    });

    return data;
}

