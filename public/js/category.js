// eslint-disable-next-line no-invalid-this
$(document).ready(function() {
  $('.goback').on('click', function() {
    window.location.replace('/category');
  });

  $('div.col-6.item').on('click', function() {
    // eslint-disable-next-line no-invalid-this
    const food = $(this).text();
    $('.content').empty();
    const fdDiv = $('.content');
    getNutrition(fdDiv, food);
  });

  $('.toCart').on('click', function(event) {
    $('.foodModal').modal({closable: false,
      allowMultiple: true,
    }).modal('hide');

    // const a = localStorage.getItem(counter.toString());
    // const b = a.split(',');
    // alert(b[0]+'\n'+b[1]+'\n'+b[2]+'\n'+b[3]);
    // alert('Item added to cart');
    alert('Item added to cart');
  });
});


// eslint-disable-next-line require-jsdoc
function getNutrition(fdDiv, food) {
  const foodLookup = food.toLowerCase().replace(' ', '%2520');
  const settings = {
    'async': true,
    'crossDomain': true,
    'url': `https://nutritionix-api.p.rapidapi.com/v1_1/search/${foodLookup}?fields=item_name%2Cbrand_name%2Cnf_calories%2Cnf_total_fat`,
    'method': 'GET',
    'headers': {
      'x-rapidapi-host': 'nutritionix-api.p.rapidapi.com',
      'x-rapidapi-key': 'aad762d868mshe6662fe1389f96ap19b662jsnf52bcba02f5f',
    },
  };

  $.ajax(settings).done(function(response) {
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
      observeChanges: true,
    }).modal('show');
  });
}
