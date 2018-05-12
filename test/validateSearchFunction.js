const puppeteer = require('puppeteer');
let pageUrl='https://google.com/ncr';
let searchBox='#gs_lc0';
let searchBtn="input[name='btnK']";
let searchPageLbl='#resultStats';
let searchPageHeader='span[data-original-name="The Avengers film series"]'; 
let searchString='Avengers';
let assert = require('chai').assert;

describe('checking search function', function () {
  this.timeout(10000);
  this.retries(1);
  let page;
  let browser;
  let selector = '';

  // before - Will open chromium session
  before(async function () {
    console.log('opening the session!' + pageUrl);
    // Headless mode!
    // browser = await puppeteer.launch();
    browser = await puppeteer.launch({ headless: false });    
    page = await browser.newPage();
    page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 2, isLandscape: true });
    await page.goto(pageUrl, { waitUntil: 'networkidle2' }).catch(() => {
      console.log('Exception occurred while opening the URL!');
      this.skip();
    });
  });


  // after - Will close chromium session 
  after(async function () {
    await browser.close().catch(() => {
      console.log('Exception occurred while closing session on URL')
    });
  })


  // it - Test to search string and validate the results 
  it('should be able to search.', async function () {
    await page.type(searchBox, searchString);
    await page.click(searchBtn)
    await page.waitForSelector(searchPageLbl);
    let searchElement=await page.waitForSelector(searchPageHeader);
    assert.exists(searchElement, 'Able to find search results!');
  });
});