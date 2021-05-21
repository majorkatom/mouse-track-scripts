const ghostCursor = require("ghost-cursor");
const puppeteer = require("puppeteer");

const tileIds = [
    "button#tile_1",
    "button#tile_2",
    "button#tile_3",
    "button#tile_4",
    "button#tile_5",
    "button#tile_6",
    "button#tile_7",
    "button#tile_8",
    "button#tile_9"
];

const buttonIds = [
    "button#button1",
    "button#button2",
    "button#button3",
    "button#button4",
    "button#button5",
    "button#button6",
    "button#button7",
    "button#button8",
    "button#button9",
    "button#button10"
];

(async () => {
    for(var k = 0; k < 1; k++){  // hányszor fusson le
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({ width:1920, height: 937});
        const cursor = ghostCursor.createCursor(page);
        await page.goto("https://mouse-track.herokuapp.com/");
        await page.waitForSelector("input#bot");
        await cursor.click("input#bot");
        await page.waitForSelector("input#botType", { visible: true });
        await page.type("input#botType", "ghost-cursor");
        await cursor.click("input[type=submit]");
        
        await page.waitForSelector("button#tile_1");
        await page.waitForTimeout(3000);  // várakozások a biztonság kedvéért (nélkülük néha nem jól működött)
        for(var i = 0; i < tileIds.length; i++){
            await cursor.click(tileIds[i]);
        }

        await page.waitForSelector("input");
        await page.waitForTimeout(1000);
        await cursor.click("input");

        await page.waitForSelector("button#start");
        await page.waitForTimeout(2000);
        await cursor.click("button#start");
        for(var j = 0; j < buttonIds.length; j++){
            await page.waitForSelector(buttonIds[j], { visible: true });
            waitTime = Math.floor(Math.random() * 41) + 180;
            await page.waitForTimeout(waitTime);
            await cursor.click(buttonIds[j]);
        }

        await page.waitForSelector("h1");
        await browser.close();
    }
})();