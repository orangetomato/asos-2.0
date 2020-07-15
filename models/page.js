const puppeteer = require('puppeteer');

class Page {
    static async scrape(url) {
        try {
            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();
            
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
            
            await page.goto(url, {
                waitUntil: ['networkidle2', 'domcontentloaded'],
            });
            
            const data = await page.evaluate(() => {
                const result = {};

                //product name
                const productNameNode = document.querySelector('.product-hero h1', {timeout: 0});
                const productName = productNameNode.textContent;
                result.productName = productName;
            
                //current price
                const currentPriceNode = document.querySelector('.current-price');
                const currentPrice = currentPriceNode.textContent;
                result.currentPrice = currentPrice;
            
                //previous price
                if (currentPriceNode.classList.contains('product-price-discounted')) {
                    const previousPriceNode = document.querySelector('[data-id="previous-price"]');
                    const previousPrice = previousPriceNode.textContent;
                    result.previousPrice = previousPrice;
                }
            
                //all images
                const imageList = document.querySelectorAll('.img');
                const srcList = [];
            
                for (let i = 1; i < imageList.length; i++) {
                    imageSrc = imageList[i].getAttribute('src');
                    srcList.push(imageSrc);
                }
            
                result.srcList = srcList;
            
                //main image
                const mainImageSrc = srcList[0];
                result.mainImageSrc = mainImageSrc;
            
                return result;
            });

            await browser.close();
            return data;
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = Page;