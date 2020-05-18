$(document).ready(function() {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the signup button is clicked,
  // we validate the email and password are not blank
  signUpForm.on('submit', function(event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });

  // Does a post to the signup route. If successful, we are redirected
  // to the members page.  Otherwise we log any errors
  /**
 * This signs up a new User.
 * @param {string} email The email address.
 * @param {string} password The password.
 *
 */
  function signUpUser(email, password) {
    $.post('/api/signup', {
      email: email,
      password: password,
    })
        .then(function(data) {
          window.location.replace('/category');
        // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
  }

  /**
 * This signs up a new User.
 * @param {object} err The error object.
 */
  function handleLoginErr(err) {
    $('#alert .msg').text('An error has occurred.  Please contact support.');
    $('#alert').fadeIn(500);
  }
});
