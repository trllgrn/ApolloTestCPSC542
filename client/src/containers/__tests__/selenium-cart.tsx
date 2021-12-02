import React from 'react';
import { empty } from '@apollo/client';
import {Builder, By, Key, until, WebDriver, util} from 'selenium-webdriver'
require('chromedriver')

//async function SeleniumCartTest(){
describe('selenium add items to cart test', ()=> {
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

    

    it('Add Crew-1 trip to cart', async () => {
        // Navigate to Url
        //await new Promise(resolve => setTimeout(resolve, 2000));
        await driver.get(testUrl);
        let location = await driver.getCurrentUrl();
        
        await new Promise(resolve => setTimeout(resolve, 2000));

        //Use tester email address
        let emailAddress = 'tester@mail.com';
        //Input the email string into the element called email and press the enter key
        await driver.findElement(By.name('email')).sendKeys('tester@mail.com', Key.ENTER);
        expect(location).toContain('localhost');
        driver.navigate().refresh();
        await driver.navigate().refresh();

        //Locate button containing trip name in title
        //In this case it is Crew-1
        let tripTile = await driver.wait(until.elementLocated(By.partialLinkText('Crew-1')), 3000);
        await driver.wait(until.elementIsVisible(tripTile), 3000);
        //Click the button
        await tripTile.click();
        //Wait for next screen to load
        await new Promise(resolve => setTimeout(resolve, 3000));

        //Locate add to cart button based off string in the buttons text
        //let addToCartButton = await driver.wait(until.elementLocated(By.partialLinkText('Add To Cart')), 3000);
        let addToCartButton = await driver.wait(until.elementLocated(By.css('[data-testid="action-button"]')), 3000);
        await driver.wait(until.elementIsVisible(addToCartButton), 3000);
        //Click the button
        await addToCartButton.click();
        await new Promise(resolve => setTimeout(resolve, 3000));

        //Locate cart button located on bottom of the page
        //Its element id is "footerCart"
        
        let cartButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/footer/div/a[2]')), 3000);
        await driver.wait(until.elementIsVisible(cartButton), 3000);
        //Once located, click the button
        await cartButton.click();
        await new Promise(resolve => setTimeout(resolve, 3000));

        //wait for the Crew-1 trip to appear in the cart
        let cartTripTile = await driver.wait(until.elementLocated(By.partialLinkText('Crew-1')), 3000);
        await driver.wait(until.elementIsVisible(cartTripTile), 3000);
        console.log('cartTile text: ', await cartTripTile.getText());
        await new Promise(resolve => setTimeout(resolve, 3000));

        //Confirm that the expected Crew-1 trip appears in the cart to be true for the test
        expect((await cartTripTile.getText()).includes('Crew-1')).toBeTruthy();

    });
})