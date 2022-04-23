var express = require("express");
var router = express.Router();
const Url = require("../models/url");
var randomstring = require("randomstring");
const getUniqueShortUrl = require("../modules/utils");

/* GET home page. */
router.post("/url", async (req, res) => {
  try {
    const originalUrl = req.body.url;

    const getShortUrl = () =>
      randomstring.generate({
        length: 6,
        charset: "alphanumeric",
      });

    const shortUrl = await getUniqueShortUrl(getShortUrl());

    let createdURL = await Url.create({ originalUrl, shortUrl: shortUrl });

    res.json({
      message: "Short URL created successfully",
      shortUrl: createdURL.shortUrl,
    });
  } catch (err) {
    console.log(err, "error creating URL");
    res.status(400).json({ message: "Url not created " });
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.data("url not found");
    }
  } catch (err) {
    console.log(err, "error creating URL");
    res.status(400).json({ message: "Url not found " });
  }
});

module.exports = router;
