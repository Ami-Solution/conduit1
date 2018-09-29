// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o')
  
  $.get('/orders', function(orders) {
    orders.forEach(function(orders) {
      $('<li></li>').text(orders).appendTo('ul#orders')
    })
  })

  $('form').submit(function(event) {
    event.preventDefault()
    var order = $('input').val()
    $.post('/orders?' + $.param({order: order}), function() {
      $('<li></li>').text(order).appendTo('ul#orders')
      $('input').val('')
      $('input').focus()
    })
  })

})
