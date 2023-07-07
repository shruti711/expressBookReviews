const express = require('express');
let books = require("./booksdb.js");
const jwt = require('jsonwebtoken');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

console.log('users', users);

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.Username;
  const password = req.body.Password;
  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Succefully register"});
    } else {
      return res.status(404).json({message: "User already exists"});
    }
  } 
  // return res.status(300).json({message: "Yet to be implemented"});
});


// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  const bookAuth = JSON.stringify(books);
  res.send(bookAuth);
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here

  const data = books.filter((isbn) => {
    return req.params.isbns === `/isbn/:${isbn.isbns}`
  })
  // return res.status(300).json({message: "Yet to be implemented"});
  return res.status(200).json(data);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const data = Object.values(books).filter((auth) => {
    return req.params.author === `:${auth.author}`
  })
  // return res.status(300).json({message: "Yet to be implemented"});
  return res.status(300).json(data);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const data = Object.values(books).filter((title) => {
    return req.params.title === `:${title.title}`
  })

  return res.status(300).json(data);
  // return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const data = Object.values(books).filter((review) => {
    return req.params.title === `:${review.reviews}`
  })

  return res.status(300).json(data);
  // return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
