$(document).ready(function () {

  $('.search-param')
    .on('click', '.param-name', function () {
      $(this).parent().toggleClass('collapsed');
      $(this).parent().toggleClass('expanded');
    });
  var $priceLine = $('.price-line');
  var $priceFrom = $('.price-from');
  var $priceTo = $('.price-to');
  var $priceLineFill = $('.price-line__fill');
  var $pFI = $('.from-input');
  var $pFT = $('.to-input');
  var $dragging = null;
  var nV = 0;
  var rightLimit = 0;
  var leftLimit = 0;

  $pFI.on('keyup', function () {
    nV = parseInt($(this).val());
    var rV = parseInt($pFT.val());
    if (nV < rV && nV >= 0){
      moveFrom($priceFrom, nV);
    }
  });
  $pFT.on('keyup', function () {
    nV = parseInt($(this).val());
    var lV = parseInt($pFI.val());
    if (nV > lV && nV < 24000 ){
      moveTo($priceTo, nV);
    }
  });
  $priceLine.on("mousedown", ".price-toggle", function (e) {
    $dragging = $(e.target);
  });
  $priceLine.on("mousemove", function(e) {
    nV = e.pageX - 5 - this.offsetLeft;
    rightLimit = parseInt($priceTo.css('left'));
    leftLimit = parseInt($priceFrom.css('left'));
    if ($dragging && ($dragging.hasClass('price-from')) && (nV >= 0) && (nV < rightLimit)) {
      $dragging.css('left', nV);
      $pFI.val(Math.round(nV / (this.offsetWidth - $dragging.width() - 1) * 24000));
      $priceLineFill.css({
        left: nV + 5,
        width: rightLimit - nV
      });
    }
    if ($dragging && ($dragging.hasClass('price-to')) && (nV <= (this.offsetWidth - $dragging.width() - 1)) && (nV > leftLimit)) {
      $dragging.css('left', nV);
      $pFT.val(Math.round(nV / (this.offsetWidth - $dragging.width() - 1) * 24000));
      $priceLineFill.css({
        width: nV - leftLimit
      });
    }
  });
  var moveFrom = function (elem, nV) {
    var newPos = nV / 24000 * ($priceLine.width() - elem.width() - 1);
    rightLimit = parseInt($priceTo.css('left'));
    elem.css('left', newPos);
    $priceLineFill.css({
      left: newPos + 5,
      width: rightLimit - newPos
    });
  };
  var moveTo = function (elem, nV) {
    var newPos = nV / 24000 * ($priceLine.width() - elem.width() - 1);
    leftLimit = parseInt($priceFrom.css('left'));
    elem.css('left', newPos);
    $priceLineFill.css({
      width: newPos - leftLimit
    });
  };
  $(document).on("mouseup", function (e) {
    $dragging = null;

  });

});