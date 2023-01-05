const getHashtags = (req, res, next) => {
  const { text } = req.body;
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (text) {
    const words = text.split(" ");

    const hashtags = words.filter((word) => {
      return word[0] === "#" && !format.test(word.substring(1));
    });
    const uniqueHashtags = [...new Set(hashtags)];

    if (uniqueHashtags.length > 0) {
      const uniqueHashtagsTreated = uniqueHashtags.map((hashtag) => {
        return hashtag.substring(1);
      });
      res.locals.hashtags = uniqueHashtagsTreated;

      next();
      return;
    }

    next();
    return;
  }
  next();
};

export default getHashtags;
