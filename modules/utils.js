const getUniqueShortUrl = async (url) => {
  const doesShortUrlalreadyExist = await Url.findOne({
    shortUrl: url,
  });

  if (!doesShortUrlalreadyExist) {
    return url;
  } else {
    const shortUrl = getShortUrl();
    getUniqueShortUrl(shortUrl);
  }
};
exports.getUniqueShortUrl = getUniqueShortUrl;
