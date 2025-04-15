const express = require('express');
const router = express.Router();
const URL = require("../models/url");


router.get('/', async (req, res) => {
    if(!req.user) {
        return res.redirect("/login");
    }
    const allurls = await URL.find({ createdBy: req.user._id });
    res.render("home", { id: null , urls: allurls });;
});

router.get('/login', (req , res) => {
    res.render("auth", { formType: "login", error: null });
});

router.get('/signup', (req , res) => {
    res.render("auth", { formType: "signup", error: null });
});


module.exports = router;