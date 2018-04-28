var express = require('express');
var app = express();
var ejs = require('ejs');
var secrets = require('./database/secrets');
var port = process.env.PORT || 4000;
var database = require('./database/database');
var urlModel = require('./model/url');
var GoogSearch = require('google-images');
var client = new GoogSearch(secrets.CSE, secrets.GOOG_API);


database.connect();

app.use(express.static('public'));
app.set('view-engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
})

app.get("/api/latest/imageSearch", (req, res) => {
    urlModel.find({}).exec((err, url) => {
        if (err) throw err;
        let url_pick = {};
        const new_url = url.map(urls => {
            url_pick.search_term = urls.search_term;
            url_pick.when = urls.when

            return url_pick;
        })
        return res.render("result.html", {
            image: new_url
        });
    })
});

app.get("/api/imageSearch/:search", (req, res) => {
    let imgObj = {};
    let page = {}
    if (req.query.page) page.page = Number(req.query.page);
    client.search(req.params.search, page).then(images => {
        const refinedImg = images.map(image => {
            imgObj = {
                url: image.url,
                thumbnail: image.thumbnail.url,
                description: image.description,
                context: image.parentPage
            }

            return imgObj
        })

        const url = urlModel({
            search_term: req.params.search
        });
        url.save(err => {
            if (err) throw err;
            return res.render('result.html', {
                image: refinedImg
            });
        })


    })
});




// listen for requests :)
var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});