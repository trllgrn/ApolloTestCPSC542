const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Url
        await new Promise(resolve => setTimeout(resolve, 2000));
        await driver.get('https://www.google.com');

        await new Promise(resolve => setTimeout(resolve, 5000));

        // Enter text "cheese" and perform keyboard action "Enter"
        await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);

        await new Promise(resolve => setTimeout(resolve, 3000));

        let firstResult = await driver.wait(until.elementLocated(By.css('h3')), 10000);

        console.log(await firstResult.getAttribute('textContent'));
        console.log('GREENT: WebDriver Test Completed');
    }
    finally{
        await driver.quit();
    }
})();