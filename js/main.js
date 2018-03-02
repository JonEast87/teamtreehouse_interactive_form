// jshint esversion: 6

$(document).ready(function (event) {
  const USERNAME = $('#name'),
    SIZE = $('#size'),
    EMAIL = $('#mail'),
    DESIGN = $('#design'),
    PAYMENT = $('#payment'),
    ZIPCODE = $('input[name=user_zip]'),
    CCNUMBER = $('input[name=user_cvv]'),
    CHECKBOXES = $('input[type=checkbox]'),
    CREDITCARD = $('input[name=user_cc-num]');

  $('#name').focus();

  // alters class depending on Boolean returned from handlers and their function calls
  const trueOrNot = function (Boolean, SELECTED) {
    if (Boolean === true) {
      $(SELECTED).addClass('success');
      $(SELECTED).removeClass('failed');
    } else if (Boolean === false) {
      $(SELECTED).removeClass('success');
      $(SELECTED).addClass('failed');
    }
  };

  // tests username entry and returns boolean based on regex
  function checkUserName(SELECTED) {
    const USERNAMECHECK = /^[a-zA-Z]+([_ -]?[a-zA-Z])*$/;
    if (USERNAMECHECK.test($(SELECTED).val())) {
      return trueOrNot(true, SELECTED);
    } else if (!USERNAMECHECK.test($(SELECTED).val())) {
      return trueOrNot(false, SELECTED);
    }
  }

  // tests email entry and returns boolean based on regex
  function checkEmail(SELECTED) {
    const EMAILCHECK = /\S+@\S+\.\S+/;
    if (EMAILCHECK.test($(SELECTED).val())) {
      return trueOrNot(true, SELECTED);
    } else if (!EMAILCHECK.test($(SELECTED).val())) {
      return trueOrNot(false, SELECTED);
    }
  }

  // tests creditcard entry and returns boolean based on regex
  function checkCreditCard(SELECTED) {
    const CCCHECK = /[0-9]{12}/;
    if (CCCHECK.test($(SELECTED).val())) {
      return trueOrNot(true, SELECTED);
    } else if (!CCCHECK.test($(SELECTED).val())) {
      return trueOrNot(false, SELECTED);
    }
  }

  // tests zipcode entry and returns boolean based on regex
  function checkZipCode(SELECTED) {
    const ZIPCHECK = /[0-9]{5}/;
    if (ZIPCHECK.test($(SELECTED).val())) {
      return trueOrNot(true, SELECTED);
    } else if (!ZIPCHECK.test($(SELECTED).val())) {
      return trueOrNot(false, SELECTED);
    }
  }

  // tests ccv number entry and returns boolean based on regex
  function checkSecurityNumber(SELECTED) {
    const CCVCHECK = /[0-9]{3}/;
    if (CCVCHECK.test($(SELECTED).val())) {
      return trueOrNot(true, SELECTED);
    } else if (!CCVCHECK.test($(SELECTED).val())) {
      return trueOrNot(false, SELECTED);
    }
  }

  // handler for username
  $(USERNAME).on('focusout', function (event) {
    checkUserName(USERNAME);
  });

  // handler for email
  $(EMAIL).on('focusout', function (event) {
    checkEmail(EMAIL);
  });

  // text field revealed if user selects 'Other'
  $('#title').on('change', function () {
    const CONDITION = $('select[name="user_title"]').val();
    if (CONDITION === 'other') {
      $('#other-title').removeClass('hidden');
    } else if (CONDITION !== 'other') {
      $('#other-title').addClass('hidden');
    }
  });

  // new HTML element shows dynamically
  $(SIZE).on('change', function (event) {
    $(DESIGN).parent().removeClass('hidden');
  });

  // color options change based on what the user picks for their shirt design
  $(DESIGN).on('change', function (event) {
    $('#color').parent().removeClass('hidden');
    const select = $('optgroup[label="Select Theme"] option:selected').val();
    if (select === 'js puns') {
      $('optgroup[value="js puns"]').addClass('show');
      $('optgroup[value="heart js"]').removeClass('show');
    } else if (select === 'heart js') {
      $('optgroup[value="heart js"]').addClass('show');
      $('optgroup[value="js puns"]').removeClass('show');
    }
  });

  // boxes are disabled if times are competing, price is dynamically changed based on user selection
  $(CHECKBOXES).on('change', function (event) {
    const total_price = $('#total_price');
    let price = $(this).parent().text().split(' ');
    let selectedPrice = parseInt(price.pop().replace(/([^0-9\\.])/g, ""));
    let selectedTime = price.pop();
    let total = parseInt($('#total_price').text().replace(/([^0-9\\.])/g, ""));

    if ($(this).prop('checked') === true) {
      total += selectedPrice;
      if ($(this).attr('name') === 'js-frameworks') {
        $('input[name="express"]').prop('disabled', true);
      } else if ($(this).attr('name') === 'express') {
        $('input[name="js-frameworks"]').prop('disabled', true);
      } else if ($(this).attr('name') === 'js-libs') {
        $('input[name="node"]').prop('disabled', true);
      } else if ($(this).attr('name') === 'node') {
        $('input[name="js-libs"]').prop('disabled', true);
      }
    } else if ($(this).prop('checked') === false) {
      total -= selectedPrice;
      if ($(this).attr('name') === 'js-frameworks') {
        $('input[name="express"]').prop('disabled', false);
      } else if ($(this).attr('name') === 'express') {
        $('input[name="js-frameworks"]').prop('disabled', false);
      } else if ($(this).attr('name') === 'js-libs') {
        $('input[name="node"]').prop('disabled', false);
      } else if ($(this).attr('name') === 'node') {
        $('input[name="js-libs"]').prop('disabled', false);
      }
    }
    total_price.text(`$${total}`);
  });

  // depending on selection HTML elemtns will be shown or removed on choice
  $(PAYMENT).on('change', function (event) {
    const CREDIT_CARD = $('#payment option:selected').val();

    if (CREDIT_CARD === 'credit card') {
      $('div[value="credit-card"]').removeClass('hidden');
      $('div[value="paypal"]').addClass('hidden');
      $('div[value="bitcoin"]').addClass('hidden');
    } else if (CREDIT_CARD === 'paypal') {
      $('div[value="paypal"]').removeClass('hidden');
      $('div[value="bitcoin"]').addClass('hidden');
      $('div[value="credit-card"]').addClass('hidden');
    } else if (CREDIT_CARD === 'bitcoin') {
      $('div[value="bitcoin"]').removeClass('hidden');
      $('div[value="paypal"]').addClass('hidden');
      $('div[value="credit-card"]').addClass('hidden');
    }
  });

  // handler for creditcard
  $(CREDITCARD).on('focusout', function (event) {
    checkCreditCard(CREDITCARD);
  });

  // handler for zipcode
  $(ZIPCODE).on('focusout', function (event) {
    checkZipCode(ZIPCODE);
  });

  // handler for ccnumber
  $(CCNUMBER).on('focusout', function (event) {
    checkSecurityNumber(CCNUMBER);
  });

});