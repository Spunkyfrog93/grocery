/* eslint-disable require-jsdoc */
const counter = 1;

$(document).ready(function() {
  $('.modalButton').click(function() {
    const fdDiv = $('.content');
    getNutrition(fdDiv);
  });

  $('.toCart').on('click', function(event) {
    const food = $('.modalButton').text();
    const qty = 4;
    const item = 'Apples';
    const price = 2.99;
    localStorage.setItem(counter.toString(),
        food+','+qty.toString()+','+item+','+price.toString());
    // alert('Item added to cart');
    $('.foodModal').modal({closable: false,
      allowMultiple: true,
    }).modal('hide');
    // const a = localStorage.getItem(counter.toString());
    // const b = a.split(',');
    // alert('Item added to cart');
  });

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function(data) {
    $('.member-name').text(data.email);
  });
});

function getNutrition(fdDiv, food) {
  const settings = {
    'async': true,
    'crossDomain': true,
    'url': 'https://nutritionix-api.p.rapidapi.com/v1_1/search/cheddar%2520cheese?fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_total_fat',
    'method': 'GET',
    'headers': {
      'x-rapidapi-host': 'nutritionix-api.p.rapidapi.com',
      'x-rapidapi-key': 'aad762d868mshe6662fe1389f96ap19b662jsnf52bcba02f5f',
    },
  };

  $.ajax(settings).done(function(response) {
    console.log(response);

    // Here we loop through our array and append a new div with each iteration
    for (let i=0; i < 10; i++) {
      fdDiv.append(`<div>Item: ${response.hits[i].fields.item_name}<br>`);
      fdDiv.append(`Brand Name: ${response.hits[i].fields.brand_name}<br>`);
      fdDiv.append(`Calories: ${response.hits[i].fields.nf_calories}<br>`);
      fdDiv.append(`Fat: ${response.hits[i].fields.nf_total_fat}</div><br>`);
      fdDiv.append(`<br>`);
    }
    $('.foodModal').modal({closable: false,
      allowMultiple: true,
    }).modal('show');
  });
};