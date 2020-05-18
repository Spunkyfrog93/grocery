// Requiring path to so we can use relative routes to our HTML files
const path = require('path');
const db = require('../models');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app) {
  app.get('/', function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/category');
    }
    res.sendFile(path.join(__dirname, '../public/signup.html'));
  });

  app.get('/login', function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/category');
    }
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });

  //  This will allow the style sheet to be loaded into the browser:
  app.get('/product/stylesheets/style.css', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/stylesheets/style.css'));
  });

  // This will allow the script to be used on the web pages
  // to be loaded into the browser:
  app.get('/product/js/category.js', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/js/category.js'));
  });

  app.get('/category', function(req, res) {
    db.product_category.findAll().then((allCat) => {
      const all = allCat.map((cat) => {
        return {
          id: cat.id,
          category: cat.category,
        };
      });

      res.render('category', {all});
    })
        .catch((err)=>console.log(err));
  });
  app.get('/product/:id', function(req, res, next) {
    db.product.findAll({
      where: {
        category_id: req.params.id,
      },
    }).then((allProd) => {
      const all = allProd.map((prod) => {
        return {
          item: prod.item,
          price: prod.price,
          category_id: prod.category_id,
        };
      });
      // console.log(allCat[0].get({plain: true}));
      // console.log('beginning of response:' + res);
      // console.log('endof');
      // const allCat = res;

      res.render('product', {all});
    })
        .catch((err)=>console.log(err));
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they
  // will be redirected to the signup page
  app.get('/members', isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
  });
};
