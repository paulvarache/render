import puppeteer from 'puppeteer';

export async function render(url : string) {
    const browser = await puppeteer.launch({
        args: ['--single-process'],
    });
    console.log('Launched');
    const page = await browser.newPage();
    console.log('page created');
    await page.goto(url, { waitUntil: ["load", "networkidle2"] });
    console.log('loading url');
    const img = await page.screenshot({ type: 'png' });
    await browser.close();
    return img;
}