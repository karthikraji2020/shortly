const express = require('express');
const router = express.Router();
const checkAuth= require('./../middleware/check-auth');

const URLShortener = require('../controllers/urlshortener.controller.js');

    // Retrieve all Notes
    router.get('/getallurls', URLShortener.findAll);

    // Create a new Url
    router.post('/createshorturl', checkAuth,  URLShortener.create);

    // Retrieve a single Url with urlId
    router.get('/geturlbyid/:urlId', URLShortener.findOne);

    // Update a Url with urlId
    router.put('/updateurl/:urlId', URLShortener.update);

    // Delete a Url with urlId
    router.delete('/deleteurl/:urlId', URLShortener.delete);

    //new page URL
    // app.get('/:shortUrl',URLShortener.shortIdNewTab);
    // app.get('/:userId/:shortUrl',URLShortener.shortIdNewTab);

    module.exports = router;
