const URLShortener = require('../models/urlshortener.model.js');

// Create and Save a new URL
exports.create = (req, res) => {
    // Validate request
    console.log(req.body.longUrl +"data")
    if(!req.body.longUrl) {
        return res.status(400).send({
            message: "LongURL content can not be empty"
        });
    }
    // Create a Url
    const urlShortener = new URLShortener({
        userId:req.userData.userId,
        longUrl:req.body.longUrl,
        shortUrl: generateUrl()
    });

    // Save Url in the database
    urlShortener.save()
    .then(data => {
        res.send(data);
        // res.redirect('/');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while shortening the url."
        });
    });
};


// Retrieve and return all urls from the database.
exports.findAll = (req, res) => {
    URLShortener.findById(req.userData.userId)
    .then(urls => {
        res.send(urls);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the url."
        });
    });
};

// Find a single Url with a UrlId
exports.findOne = (req, res) => {
    URLShortener.findById(req.params.urlId)
    .then(url => {
        if(!url) {
            return res.status(404).send({
                message: "LongUrl not found with id " + req.params.urlId
            });            
        }
        res.send(url);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "LongUrl not found with id " + req.params.urlId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving LongUrl with id " + req.params.urlId
        });
    });
};

// Update a url identified by the urlId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.longUrl) {
        return res.status(400).send({
            message: "LongUrl content can not be empty"
        });
    }
    // Find url and update it with the request body
    URLShortener.findByIdAndUpdate(req.params.urlId, {
        longUrl: req.body.longUrl,
        shortUrl:req.body.shortUrl,
        clickCount:req.body.clickCount,
    }, {new: true})
    .then(url => {
        if(!url) {
            return res.status(404).send({
                message: "longUrl not found with id " + req.params.urlId
            });
        }
        res.send(url);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "longUrl not found with id " + req.params.urlId
            });                
        }
        return res.status(500).send({
            message: "Error updating longUrl with id " + req.params.urlId
        });
    });
};

// Delete a url with the specified urlId in the request
exports.delete = (req, res) => {
    URLShortener.findByIdAndRemove(req.params.urlId)
    .then(url => {
        if(!url) {
            return res.status(404).send({
                message: "longUrl not found with id " + req.params.urlId
            });
        }
        res.send({message: "longUrl deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "longUrl not found with id " + req.params.urlId
            });                
        }
        return res.status(500).send({
            message: "Could not delete longUrl with id " + req.params.urlId
        });
    });
};

// exports.shortIdNewTab=  (req,res) => {
//     // console.log(req.params);
//      URLShortener.findOne({shortUrl:req.params.shortUrl} , function (err, data) {
//         if (err) throw err;
//         // console.log(req.params.noteId);
//         console.log(data);

//         URLShortener.findByIdAndUpdate({ _id: data.id }, { $inc: { clickCount: 1 } }, function (err, updatedData) {
//                         if (err) throw err;
//                         // exports.createbyid();
//                         console.log(data);
//                         res.redirect(data.longUrl);
//                     })
//     });
// };


function generateUrl() {
    var randomResult = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;

    for (var i = 0; i < 5; i++) {
        randomResult += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return randomResult;
}