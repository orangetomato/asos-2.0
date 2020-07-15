const {Router} = require('express');
const Page = require('../models/page');
const router = Router();

router.get('/', async (req, res) => {
    const link = 'https://www.asos.com/ru/asos-tall/sinie-dzhinsy-skinni-v-vintazhnom-stile-s-zavyshennoj-taliej-asos-design-tall-ridley/prd/13680439?CTAref=We+Recommend+Carousel_3&featureref1=we+recommend+pers';
    const data = await Page.scrape(link);
    res.render('index', {
        title: 'ASOS',
        data
    });
});

module.exports = router;