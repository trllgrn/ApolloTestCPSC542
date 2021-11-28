const webdriver = require("selenium-webdriver");
var assert = require("assert").strict;
// Instantiate a web browser page
const serverUri = "http://localhost:3000";
const appTitle = "Launches";
const email = "test@gmail.com"

var browser = new webdriver.Builder()
 .usingServer()
 .withCapabilities({ browserName: "chrome" })
 .build();


/**
 * Function to get the title and resolve it it promise.
 * @return {[type]} [description]
 */
 function logTitle() {
  return new Promise((resolve, reject) => {
   browser.getTitle().then(function(title) {
    resolve(title);
   });
  });
 }


describe("Load home page", function() {

  it("Should load the home page and get title", function() {
    return new Promise((resolve, reject) => {
    browser
      .get(serverUri)
      .then(logTitle)
      .then(title => {
      assert.strictEqual(title, appTitle);
      resolve();
      })
      .catch(err => reject(err));
    });
});

  it("Fill in email text field", function() {
    return new Promise((resolve, reject) => {
     browser
      .findElement({ name: "email" }).sendKeys(email)
      .then(elem => resolve())
      .catch(err => reject(err));
    });
   });

  it("Click login button ", function() {
    return new Promise((resolve, reject) => {
     browser
      .findElement({ className: "css-wwcn44" }).click()
      .then(elem => resolve())
      .catch(err => reject(err));
    });
   });
});
