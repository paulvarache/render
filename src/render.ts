import puppeteer from 'puppeteer';

export async function render(url : string) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url);
    const img = await page.screenshot({ type: 'png' });
    return img;
}