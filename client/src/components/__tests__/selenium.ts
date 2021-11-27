import { empty } from '@apollo/client';
import {Builder, By, Key, until, WebDriver} from 'selenium-webdriver'



describe('Selenium Test Suite', ()=> {
    jest.setTimeout(30000);
    const testUrl = 'http://localhost:3000/'
    let driver : WebDriver;
    beforeAll( async () => {
        driver = await new Builder().forBrowser('chrome').build();
        driver.manage().window().maximize();
    });

    afterAll( async () => {
        await driver.quit();
    });

    it('Starts the browser & navigates to dev site', async ()=>{
        // Navigate to Url
        //await new Promise(resolve => setTimeout(resolve, 2000));
        await driver.get(testUrl);
        let location = await driver.getCurrentUrl();
        expect(location).toContain('localhost:3000');

        await new Promise(resolve => setTimeout(resolve, 2000));
    });

    it('Enters a username & logs in', async () => {
        let emailAddress = 'jdoe@testmail.org';
        await driver.findElement(By.name('email')).sendKeys('jdoe@testmail.org', Key.ENTER);
        let headerSubTitle = await driver.wait(until.elementLocated(By.id('profileEmail')), 2000);
        await driver.wait(until.elementIsVisible(headerSubTitle), 2000);
        expect((await headerSubTitle.getText()).toLocaleLowerCase()).toEqual(emailAddress);
        driver.navigate().refresh();
    });

    // it('Loads more trips', async () => {
    //     let tripTiles = await driver.wait(until.elementsLocated(By.css('a')), 2000);
    //     const initialTripTilesCount = tripTiles?.length;
    //     let loadMoreButton = await driver.wait(until.elementLocated(By.id('loadMoreButton')), 2000);
    //     await driver.wait(until.elementIsVisible(loadMoreButton), 2000);
    //     await driver.actions({bridge: true}).move({origin: loadMoreButton}).sendKeys(Key.PAGE_DOWN).sendKeys(Key.PAGE_DOWN).perform();
    //     //await new Promise(resolve => setTimeout(resolve, 3000));
    //     loadMoreButton = await driver.wait(until.elementLocated(By.id('loadMoreButton')), 2000);
    //     await driver.wait(until.elementIsVisible(loadMoreButton), 2000);
    //     await loadMoreButton.click();
    //     await new Promise(resolve => setTimeout(resolve, 2000));
    //     tripTiles = await driver.wait(until.elementsLocated(By.css('a')), 2000);
    //     let newTripTilesCount = tripTiles?.length;
    //     expect(newTripTilesCount).toBeGreaterThan(initialTripTilesCount);
    // });

    it('Add trips to cart', async () => {
        await driver.navigate().refresh();
        const tripName = 'Starlink-15';
        let tripTile = await driver.wait(until.elementLocated(By.partialLinkText(tripName)), 2000);
        await driver.wait(until.elementIsVisible(tripTile), 2000);
        await tripTile.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        let addToCartButton = await driver.wait(until.elementLocated(By.css('[data-testid="action-button"]')), 2000);
        await driver.wait(until.elementIsVisible(addToCartButton), 2000);
        await addToCartButton.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        let cartButton = await driver.wait(until.elementLocated(By.id('footerCart')), 2000);
        await driver.wait(until.elementIsVisible(cartButton), 2000);
        await cartButton.click();
        let cartTripTile = await driver.wait(until.elementLocated(By.partialLinkText(tripName)), 2000);
        await driver.wait(until.elementIsVisible(cartTripTile), 2000);
        console.log('cartTile text: ', await cartTripTile.getText());
        expect((await cartTripTile.getText()).includes(tripName)).toBeTruthy();

    });

    it('Books a Trip', async () => {
        const tripName = 'Starlink-15';
        let bookAllButton = await driver.wait(until.elementLocated(By.css('[data-testid="book-button"]')), 2000);
        await driver.wait(until.elementIsVisible(bookAllButton), 2000);
        await bookAllButton.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        let profileButton = await driver.wait(until.elementLocated(By.id('footerProfile')), 2000);
        await driver.wait(until.elementIsVisible(profileButton), 2000);
        await profileButton.click();

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        let profileTripTile = await driver.wait(until.elementLocated(By.partialLinkText(tripName)), 2000);
        await driver.wait(until.elementIsVisible(profileTripTile), 2000);
        console.log('cartTile text: ', await profileTripTile.getText());
        expect((await profileTripTile.getText()).includes(tripName)).toBeTruthy();
    });

    it('Cancels a Trip', async() => {
        const tripName = 'Starlink-15';
        let tripTile = await driver.wait(until.elementLocated(By.partialLinkText(tripName)), 2000);
        await driver.wait(until.elementIsVisible(tripTile), 2000);
        await tripTile.click();
        let addToCartButton = await driver.wait(until.elementLocated(By.css('[data-testid="action-button"]')), 2000);
        await driver.wait(until.elementIsVisible(addToCartButton), 2000);
        await addToCartButton.click();
        let profileButton = await driver.wait(until.elementLocated(By.id('footerProfile')), 2000);
        await driver.wait(until.elementIsVisible(profileButton), 2000);
        await profileButton.click();
        let emptyCartMessage = await driver.wait(until.elementLocated(By.css('p')), 2000);
        await driver.wait(until.elementIsVisible(emptyCartMessage), 2000);
        expect((await emptyCartMessage.getText()).includes('booked any')).toBeTruthy();
    });

    it ('Logs out', async() => {
        let logoutButton = await driver.wait(until.elementLocated(By.id('footerLogout')), 2000);
        await driver.wait(until.elementIsVisible(logoutButton), 2000);
        logoutButton.click();
        let emailForm = await driver.wait(until.elementLocated(By.name('email')), 2000);
        await driver.wait(until.elementIsVisible(emailForm), 2000);
        expect(emailForm).toBeDefined();
    });

});