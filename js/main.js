// jshint esversion: 6

$(document).ready(function () {

  function checkField(field) {
    if (field.value === '') {
      $(field).addClass('failed');
    } else {
      $(field).addClass('success');
    }
  }

  $('form input[type=text], input[type=email]').on('focusout', function (event) {
    const field = event.target;
    event.preventDefault();
    checkField(field);
    if ($('input[type=text]').hasClass('success') && $('input[type=email]').hasClass('success')) {
      $('#title').prop('disabled', false);
    }
  });

  $('#title').on('change', function (event) {
    $('#size').prop('disabled', false);
  });

  $('#size').on('change', function (event) {
    $('#design').prop('disabled', false);
  });

  $('#design').on('change', function (event) {
    $('#color').prop('disabled', false);
    const select = $('optgroup[label="Select Theme"] option:selected').val();
    if (select === 'js puns') {
      $('optgroup[value="js puns"]').addClass('show');
      $('optgroup[value="heart js"]').removeClass('show');
    } else if (select === 'heart js') {
      $('optgroup[value="heart js"]').addClass('show');
      $('optgroup[value="js puns"]').removeClass('show');
    }

    if ($('#color option:selected').val() !== undefined) {
      $('input[type="checkbox"]:disabled').prop('disabled', false);
    }
  });

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
    if ($('input[type="checkbox"]').prop('checked') !== undefined) {
      $('#payment').prop('disabled', false);
    }

  });

  $('#payment').on('change', function (event) {
    $('#cc-num').prop('disabled', false);
  });

  $('#cc-num').on('focusout', function (event) {
    const field = event.target;
    event.preventDefault();
    checkField(field);

    if ($('#cc-num').hasClass('success')) {
      $('#zip').prop('disabled', false);
      $('#cvv').prop('disabled', false);
    }

  });

  $('#cvv').on('focusout', function (event) {
    const field = event.target;
    event.preventDefault();
    checkField(field);
    if ($('#cvv').hasClass('success')) {
      $('#exp-month').prop('disabled', false);
      $('#exp-year').prop('disabled', false);
    }
  });

  $('#exp-year').on('change', function (event) {
    $('button').prop('disabled', false);
  });

  $('#payment').on('change', function (event) {
    event.preventDefault();
    const CREDIT_CARD = $('#payment option:selected').val();
    console.log(CREDIT_CARD);
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