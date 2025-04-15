const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl , handleGetAnalytics } = require('../controllers/url');
const URL = require("../models/url");

router.post('/' , handleGenerateNewShortUrl);

// router.get('/:shortId', async(req, res) => {
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: {
//       timestamp: Date.now()
//     }, }, });
  
//     if (!entry) {
//       return res.status(404).json({ error: "Short URL not found" });
//   }
  
  
//     res.redirect(entry.redirectURL);
  
// });

module.exports = router;