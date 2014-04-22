$(document).ready(function () {

    $('.search-param')
        .on('click', '.param-name', function () {
            $(this).parent().toggleClass('collapsed');
            $(this).parent().toggleClass('expanded');
        });
    var $priceLine = $('.price-line');
    var $showModels = $('.js-show-models');
    var $priceFrom = $('.price-from');
    var $priceTo = $('.price-to');
    var $paramCont = $('.search-param__container');
    var $priceLineFill = $('.price-line__fill');
    var $checkbox = $('.for-checkbox');
    var $pFI = $('.from-input');
    var $pTI = $('.to-input');
    var $dragging = null;
    var nV = 0;
    var rightLimit = 0;
    var leftLimit = 0;

    $pFI.on('keydown', function (e) {
        numericValidate(e);
    })
        .on('keyup', function () {
            nV = parseInt($(this).val());
            var rV = parseInt($pTI.val());
            if (nV < rV && nV >= 0) {
                moveFrom($priceFrom, nV);
            }

        });
    $pTI.on('keyup', function () {
        nV = parseInt($(this).val());
        var lV = parseInt($pFI.val());
        if (nV > lV) {
            moveTo($priceTo, Math.min(nV, 24000));
        }
    })
        .on('keydown', function (e) {
            numericValidate(e);
        });
    $priceLine.on('mousedown', '.price-toggle', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $dragging = $(e.target);
    });
    $(document).on('mouseup', function (e) {
        if ($dragging){
            $dragging = null;
            return;
        }
        $showModels.hide();
    });
    $(document).on('mousemove', function (e) {
        if ($dragging) {
            nV = e.pageX - 5 - $priceLine.offset().left;
            rightLimit = parseInt($priceTo.css('left'));
            leftLimit = parseInt($priceFrom.css('left'));
            if (($dragging.hasClass('price-from')) && (nV >= 0) && (nV < rightLimit)) {
                $dragging.css('left', nV);
                $pFI.val(Math.round(nV / ($priceLine.width() - $dragging.width() - 1) * 24000));
                $priceLineFill.css({
                    left: nV + 5,
                    width: rightLimit - nV
                });
            }
            if (($dragging.hasClass('price-to')) && (nV <= ($priceLine.width() - $dragging.width() - 1)) && (nV > leftLimit )) {
                $dragging.css('left', nV);
                $pTI.val(Math.round(nV / ($priceLine.width() - $dragging.width() - 1) * 24000));
                $priceLineFill.css({
                    width: nV - leftLimit + 1
                });
            }
            $showModels.show();
        }
    });
    $checkbox.on('click', function (e) {
        $showModels.show();
    });
    var moveFrom = function (elem, nV) {
        var newPos = nV / 24000 * ($priceLine.width() - elem.width() - 1);
        rightLimit = parseInt($priceTo.css('left'));
        elem.css('left', newPos);
        $priceLineFill.css({
            left: newPos + 5,
            width: rightLimit - newPos
        });
        $showModels.show();
    };
    var moveTo = function (elem, nV) {
        var newPos = nV / 24000 * ($priceLine.width() - elem.width() - 1);
        leftLimit = parseInt($priceFrom.css('left'));
        elem.css('left', newPos);
        $priceLineFill.css({
            width: newPos - leftLimit + 1
        });
        $showModels.show();
    };
    var numericValidate = function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode == 67 && e.ctrlKey === true) ||
            (e.keyCode == 86 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    };
    var tV = $('.js-toggleView');
    tV.click(function (e) {
        e.preventDefault();
        tV.removeClass('selected');
        $(this).addClass('selected');
        $('.dash-catalog').toggle();
        $('.list-catalog').toggle();
    });
    var tS = $('.js-sort');
    tS.click(function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass('asc')) {
            $this.removeClass('asc');
            $this.addClass('desc');
        } else {
            tS.removeClass('desc');
            tS.removeClass('asc');
            $this.addClass('asc');
        }
    })
});