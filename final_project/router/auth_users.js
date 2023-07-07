const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
  let userswithsamename = users.filter((user) => {
    return user.username === username
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username, password) => {
  //write code to check if username and password match the one we have in records.
  let validusers = users.filter((user) => {
    return (user.username === username && user.password === password)
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const username = req.body.Username;
  const password = req.body.Password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken, username
    }
    users.push()
    return res.status(200).send("Successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Username and password" });
  }
  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const updateReview = req.query;
  const isbns = req.params.isbn;

  if (username || password) {
    Object.values(books).filter((review) => {
      if (`:${review.isbns}` === isbns) {
        return { ...review.reviews,  ...updateReview}
      }
    })
    return res.status(404).json({ message: "Error logging in" });
  }
  return res.status(300).json(updateReview);
});

regd_users.delete('/auth/review/:isbn', (req, res) => {
  const isbns = req.params.isbn;
  Object.values(books).filter(isbn => isbn.reviews !== isbns)
  res.json({message: "Review is deleted successfully"})
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
