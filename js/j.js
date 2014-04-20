$(document).ready(function () {

  $('.search-param')
    .on('click', '.param-name', function () {
      $(this).parent().toggleClass('collapsed');
      $(this).parent().toggleClass('expanded');
    });
  $priceLine = $('.price-line');
  var $dragging = null;

  $priceLine.on("mousemove", function(e) {
    if ($dragging) {
      $dragging.offset({
        left: e.pageX
      });
    }
    if ($dragging.hasClass('price-from'))
  });


  $priceLine.on("mousedown", ".price-toggle", function (e) {
    $dragging = $(e.target);
  });

  $(document).on("mouseup", function (e) {
    $dragging = null;
  });

});