const publishPost = (req, res) => {
  const userId = req.userId;

  console.log("userId: ", userId);

  res.sendStatus(200);
};

export default publishPost;
