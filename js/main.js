// jshint esversion: 6

$(document).ready(function () {

  $('#name').focus();


  // Will change change of inputs
  function checkField(field) {
    if (field.value === '') {
      $(field).addClass('failed');
    } else if (field.value !== undefined) {
      $(field).addClass('success');
    }
  }

  // Function checkField is ran on all inputs
  $('input[type=text], input[type=email]').on('focusout', function (event) {
    const field = event.target;
    event.preventDefault();
    checkField(field);
  });

  // Title selector will show new html element on if condition is met
  $('#title').on('change', function () {
    const condition = $('select[name="user_title"]').val();
    if (condition === 'other') {
      $('#other-title').removeClass('hidden');
    } else if (condition !== 'other') {
      $('#other-title').addClass('hidden');
    }
  });

  // HTML element shows on change
  $('#size').on('change', function (event) {
    $('#design').parent().removeClass('hidden');
  });

  // HTML element shows on change, certain themes are shown in selection list depending on choice
  $('#size, #design').on('change', function (event) {
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

  // Checkboxes are disabled if times are competing, price is dynamically changed based on user selection
  $('input[type=checkbox]').on('change', function (event) {
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

  // Depending on selection HTML elemtns will be shown or removed on choice
  $('#payment').on('change', function (event) {
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

});