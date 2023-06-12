const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const User = require("./user");
const Comment = require('./comment');
//----------------------------------------- END OF IMPORTS---------------------------------------------------
require('dotenv').config();
mongoose.connect(
  process.env.DB_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);


// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://meek-sawine-05f4b2.netlify.app/", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days (example)
    }
  })
);
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Custom middleware to set CORS headers
app.use((req, res, next) => {
  const mainUrl = 'https://meek-sawine-05f4b2.netlify.app';
  const allowedOrigins = [mainUrl,mainUrl+'/auth',mainUrl+'/auth/login', mainUrl+'/auth/sigin', mainUrl+'/profile', mainUrl+'/home', mainUrl+'/books', mainUrl+'/about'];

  // Check if the request origin matches any of the allowed origins
  if (allowedOrigins.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes


app.get('/checkAuth', (req, res) => res.send(req.isAuthenticated() ? { message: 'LOGGED', status: true, userData: req.user } : { message: 'UNLOGGED', status: false }));

app.post("/login", (req, res, next) => {
  // User login route
  passport.authenticate("local", (err, user, info) => {
    console.log('bdd');
    if (err) throw err;
    if (!user) {
      // If user authentication fails
      res.send({ message: "No such user !", status: false });
      console.log('No user');
    } else {
      // If user authentication succeeds
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ message: "Successfully Authenticated", status: true, userData: req.user });
        console.log(req.user);
      });
    }
  })(req, res, next); // Invoking the passport.authenticate() middleware
});

app.post("/signin", (req, res) => {
  // User sign-in route
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) {
      // If user already exists
      res.send({ message: "User Already Exists", status: false });
      console.log('Exists');
    } else {
      // If user does not exist, create a new user
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      });
      await newUser.save();
      res.send({ message: "User Successfully registered", status: true, userData: newUser });
      console.log('New user');
    }
  });
});

app.post("/logout", (req, res) => {
  // User logout route
  req.logout()

  res.send({ message: "Successfully Logged out", status: true, userData: req.user });
});

app.post("/addFavourite", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err || !doc || doc.books.some(book => book.bookId === req.body.bookId)) {
      res.send({ message: "Not added", status: false });
    } else {
      doc.books.push({ bookId: req.body.bookId, bookStatus: 'Unread' });
      await doc.save();
      res.send({ message: "Added successfully", status: true });
    }
  });
});

app.post("/removeFavourite", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err || !doc || !doc.books.some(book => book.bookId === req.body.bookId)) {
      res.send({ message: "Not deleted", status: false });
    } else {
      doc.books = doc.books.filter(book => book.bookId !== req.body.bookId);
      await doc.save();
      res.send({ message: "Deleted successfully", status: true });
    }
  });
});

app.post("/changeStatus", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err || !doc || !doc.books.some(book => book.bookId === req.body.bookId)) {
      res.send({ message: "Status not changed", status: false });
    } else {
      [...doc.books.map(book => book.bookId === req.body.bookId ? book.bookStatus = req.body.bookStatus : book)];
      await doc.save();
      res.send({ message: "Status changed successfully", status: true });
    }
  });
});

app.delete("/deleteAccount", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err || !doc) {
      res.send({ message: "Account Not deleted", status: false });
    } else {
      await doc.remove();
      res.send({ message: "Account Deleted successfully", status: true });
    }
  });
});


// ------- Comment section Routes ---------------

app.post("/addComment", (req, res) => {
  const { bookId, body, username, userId, parentId, createdAt } = req.body;

  // Create a new comment document
  const newComment = new Comment({
    bookId,
    body,
    username,
    userId,
    parentId,
    createdAt,
  });

  // Save the new comment to the database
  newComment.save((err, comment) => {
    if (err) {
      console.log(res.json);
      res.send({ message: "Failed to add comment", status: false });
    } else {
      res.send({ message: "Comment added successfully", status: true, data: newComment });
    }
  });
});

app.get("/getComments/:bookId", (req, res) => {
  const bookId = req.params.bookId;

  // Find comments for the specified bookId
  Comment.find({ bookId }, (err, comments) => {
    if (err) {
      res.send({ message: "Failed to retrieve comments", status: false });
    } else {
      res.send({ message: "Comments retrieved successfully", status: true, data: comments });
    }
  });
});

// Modify a comment
app.put("/updateComment/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  const body = req.body.text;

  // Find the comment by commentId and update its body and updatedAt fields
  Comment.findByIdAndUpdate(
    commentId,
    { body },
    { new: true },
    (err, updatedComment) => {
      if (err) {
        console.error(err);
        res.send({ message: "Failed to modify comment", status: false });
      } else if (!updatedComment) {
        res.send({ message: "Comment not found", status: false });
      } else {
        res.send({ message: "Comment modified successfully", status: true, data: updatedComment });
      }
    }
  );
});

// Delete a comment
app.delete("/deleteComment/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  // Find the comment by commentId and remove it
  Comment.findOneAndDelete({ _id: commentId }, (err, deletedComment) => {
    if (err) {
      // console.error(err);
      res.send({ message: "Failed to delete comment", status: false });
    } else if (!deletedComment) {
      res.send({ message: "Comment not found", status: false });
    } else {
      res.send({ message: "Comment deleted successfully", status: true });
    }
  });
});





//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
  console.log("Server Has Started on Port " + 4000);
});
