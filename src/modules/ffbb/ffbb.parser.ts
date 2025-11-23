import * as cheerio from "cheerio"

export function parseRencontres(html: string) {
    const $ = cheerio.load(html);
    
    $("#calendar", html).each(function() {
        console.log($(this).html());
    })

}