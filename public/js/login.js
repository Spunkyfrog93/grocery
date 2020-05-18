$(document).ready(function() {
  // Getting references to our form and inputs
  const loginForm = $('form.login');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the form is submitted,
  // we validate there's an email and password entered
  loginForm.on('submit', function(event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function
    // and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  // loginUser does a post to our 'api/login' route and if successful,
  // redirects us the the members page
  /**
   * Adds two numbers together.
   * @param {string} email Email Address.
   * @param {string} password The password.
   */
  function loginUser(email, password) {
    $.post('/api/login', {
      email: email,
      password: password,
    })
        .then(function() {
          window.location.replace('/category');
        // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(handleLoginErr);
        });
  }

  // eslint-disable-next-line require-jsdoc
  function handleLoginErr(err) {
    $('#alert .msg').text('An error has occurred.  Please contact support.');
    $('#alert').fadeIn(500);
  }
});