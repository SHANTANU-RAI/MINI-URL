const User = require('../models/user');
const URL = require('../models/url');
const { v4: uuidv4 } = require('uuid'); 
const {setUser , getUser} =  require('../service/auth');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

async function handleUserSignup(req , res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.redirect("/");
}

async function handleUserLogin(req , res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email
    });

    if(!user) {
        return res.render("auth", { formType: "login", error: "Invalid email" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
        return res.render("auth", { formType: "login", error: "Invalid password" });
    }

    const token = setUser(user);
    res.cookie("uid" , token );

    res.redirect("/");
}

async function handleUserLogout(req , res) {
    res.clearCookie("uid");
    res.redirect("/");
}

async function handleAnalytics(req, res){
    if(!req.user) {
        return res.redirect("/login");
    }
    const allurls = await URL.find({ createdBy: req.user._id });
    res.render("analytics", { urls: allurls });;
}

async function handleContactGet(req, res){
    res.render("contact");;
}

async function handleContactPost(req, res){
    const { name, email, message } = req.body;
  
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.EMAIL_PASS
        }
      });
  
      const mailOptions = {
        from: process.env.MY_EMAIL,
        to: process.env.MY_EMAIL,
        replyTo: email,
        subject: `New message from ${name}`,
        text: `You received a new message from your blog contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
      };
  
      await transporter.sendMail(mailOptions);
  
      res.send(`
        <script>
          alert("Message sent successfully!");
          window.location.href = "/user/contact";
        </script>
      `);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to send message.');
    }
  }

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
    handleAnalytics,
    handleContactGet,
    handleContactPost,
};