/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : 'path=/',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};


$(document).ready(function () {
    //공동 재생 멈춤
    slick_stop = $('.slick-stop').on('click', function () {
        $(this).siblings('.slick-play').css('display', 'inline-block').focus();
        $(this).css('display', 'none');
        $(this).parent().parent().siblings('.slick-slider').slick('slickPause');
    });

    $('.slick-play').on('click', function () {
        $(this).siblings('.slick-stop').css('display', 'inline-block').focus();
        $(this).css('display', 'none');
        $(this).parent().parent().siblings('.slick-slider').slick('slickPlay');
    });
    $('.slick-prev').on('click', function () {
        $(this).parent().parent().siblings('.slick-slider').slick('slickPrev');
        $(this).parent().parent().siblings('.slick-slider').slick('slickPause');
        $(this).siblings('.slick-play').css('display', 'inline-block');
        $(this).siblings('.slick-stop').css('display', 'none');
    });

    $('.slick-next').on('click', function () {
        $(this).parent().parent().siblings('.slick-slider').slick('slickNext');
        $(this).parent().parent().siblings('.slick-slider').slick('slickPause');
        $(this).siblings('.slick-play').css('display', 'inline-block');
        $(this).siblings('.slick-stop').css('display', 'none');
    });

    /* 팝업열기,닫기 */
    $('.t_pop_control .popup_close').click(function () {
        $('.top_banne_sd').slick("refresh");
        if ($('#topLayer').css('display') == 'none') {
            $('#topLayer').stop().show().animate({ marginTop: '0px', opacity: 1 }, 500);
            $(this).removeClass('popup_open').addClass('popup_close').html('팝업닫기 <span class="ico arrow_t"></span>');
            $('.top_banne_sd').slick("refresh");
        } else {
            $('#topLayer').stop().animate({ marginTop: '-60px', opacity: 0 }, 500, function () {
                $(this).hide();
                $('.top_banne_sd').slick("refresh");
            });
            $(this).removeClass('popup_close').addClass('popup_open').html('팝업열기 <span class="ico arrow_t"></span>');
        }
    });

    /* 쿠키 */
    if ($.cookie('topLayer') == 'done') {
        var btn = $(".t_pop_control a");
        $('#topLayer').hide();
        btn.removeClass('popup_open').addClass('popup_close').html('팝업열기  <span class="ico arrow_t"></span>');
        $('#onedayClose_chk').attr("checked", "checked");
        $('.top_banne_sd').slick("refresh");
    }

    if ($.cookie('topLayer') != 'done') {
        $('.top_banne_sd').slick("refresh");
        $('#topLayer').stop().css("display", "block").animate({ marginTop: '0px', opacity: 1 }, 1000);
    }

    /* label */
    $('#onedayClose_chk').click(function () {
        if ($(this).is(':checked')) {
            $('#topLayer').animate({ marginTop: '-60px', opacity: 0 }, 500, function () {
                $(this).hide();
                if ($(this).hide()) {
                    $('.t_pop_control a').removeClass('popup_close').addClass('popup_open').html('팝업열기 <span class="ico arrow_t"></span>');
                    $('.top_banne_sd').slick("refresh");
                }
                else {
                    $('.t_pop_control a').removeClass('popup_open').addClass('popup_close').html('팝업닫기 <span class="ico arrow_t"></span>');
                    $('.top_banne_sd').slick("refresh");
                }
            });

            $.cookie('topLayer', 'done', { expires: 1 });
        } else {
            $('#topLayer').stop().css("display", "block").animate({ marginTop: '0px', opacity: 1 }, 1000);
            $('.t_pop_control a').removeClass('popup_open').addClass('popup_close').html('팝업닫기 <span class="ico arrow_t"></span>');
            $.cookie('topLayer', '', { expires: 1 });
            $('.top_banne_sd').slick("refresh");

        }
    });

    // -------------------------- Gnb 열기/덛가 --------------------------	
    $('.main_wp').addClass('header_ov');

    $(".gnb_dep1").mouseenter(function () {
        $(".gnb_dep2").stop().animate({ height: 280 }, 300);
        $(".tmnBg").stop().animate({ height: 280 }, 300);
        $('.main_wp').removeClass('header_ov');

    }).mouseleave(function () {
        $(".gnb_dep2").stop().animate({ height: 0 }, 300);
        $(".tmnBg").stop().animate({ height: 0 }, 300);
        $('.main_wp').addClass('header_ov');
    });

    /*gnb tabkey focusin/focusout*/
    $(".gnb_dep1 > li").focusin(function () {
        $(".gnb_dep2").stop().animate({ height: 280 }, 300);
        $(".tmnBg").stop().animate({ height: 280 }, 300);
    }).focusout(function () {
        $(".gnb_dep2").stop().animate({ height: 0 }, 300);
        $(".tmnBg").stop().animate({ height: 0 }, 300);
    });
    // -------------------------- mGnb 열기 --------------------------
    $("#mMenu").click(function () {
        $("#mGnb").css("display", "block");
        $("#mGnb").animate({ right: 0 }, 300);
        $("#dimed").fadeIn(300);
    });

    // -------------------------- mGnb 메뉴 열기닫기  --------------------------
    $(".mDepth1 > li > a").click(function () {
        $(".mDepth1 > li > a").removeClass("active");
        $(".mDepth2 li").removeClass("active");
        var mDepth2 = $(this).siblings("ul").css("display");
        if (mDepth2 == "block") {
            $(this).siblings("ul").slideUp(300);
        } else {
            $(this).addClass("active");
            $(".mDepth2").slideUp(300);
            $(this).siblings("ul").slideDown(300);
        }
    });
    /*mGnb menu*/
    $(".mDepth2 > li > a").click(function () {
        $(".mDepth2 > li > a").removeClass("active");
        $(".mDepth3 li").removeClass("active");
        var mDepth3 = $(this).siblings("ul").css("display");
        if (mDepth3 == "block") {
            $(this).siblings("ul").slideUp(300);
        } else {
            $(this).addClass("active");
            $(".mDepth3").slideUp(300);
            $(this).siblings("ul").slideDown(300);
            $(this).siblings("ul").find("li").addClass("active");
        }
    });

    // -------------------------- gotop top bottom --------------------------

    $(".loca_nav .top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
    });
    $('.loca_nav .bottom').click(function () {
        $('body,html').animate({ scrollTop: $(document).height() }, 500);
        return false;
    });

    // -------------------------- gotop top bottom --------------------------
    $(".tab_link").click(function () {
        $(this).addClass('active');
        $(this).parent('li').siblings('li').find('.tab_link').removeClass('active');
        $(this).parent('li').find('.noti_list').css('display', 'block');
        $(this).parent('li').find('.more').css('display', 'block');
        $(this).parent('li').siblings('li').find('.noti_list').css('display', 'none');
        $(this).parent('li').siblings('li').find('.more').css('display', 'none');
    });

    $(".btab_link").click(function () {
        $(this).addClass('tab_on');
        $(this).parent('li').siblings('li').find('a').removeClass('tab_on');
        $(this).parent('li').find('.total_srch_wp').css('display', 'block');
        $(this).parent('li').siblings('li').find('.total_srch_wp').css('display', 'none');


        $("#find_id_nm").val("");
        $("#find_id_num").val("");
        $("#id_find_result").hide();

        $("#find_pw_nm").val("");
        $("#find_pw_num").val("");
        $("#pw_find_result").hide();

    });

    $(".ftab_link").click(function () {


        $("#find_id_nm").val("");
        $("#find_id_num").val("");
        $("#id_find_result").hide();

        $("#find_pw_nm").val("");
        $("#find_pw_num").val("");
        $("#pw_find_result").hide();
    });


    // -------------------------- 스킵네비 포커스잡아주기--------------------------
    $("#skipNavi > a").click(function () {
        $($(this).attr("href"))
            .attr("tabindex", "0")
            .css("outline", "0")
            .focus();
    });

    // Select all links with hashes
    $('a.smooth[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    $(".footlink").click(function () {
        $(this).parent().toggleClass("cur").siblings().removeClass("cur");
        $(this).parent().children("ul").stop().slideToggle();
        $(this).parent().siblings().children("ul").stop().slideUp();
    });

    // -------------------------- snb --------------------------
	$(".snb_select").click(function(){
		$(this).toggleClass("on");
		$(this).parent().children("ul").stop().slideToggle();
		$(this).parent().siblings().children("ul").stop().slideUp();
	});

    // -------------------------- gallery --------------------------
    $('.view_sd').on('init', function(event, slick) {
        $(this).siblings('.slick-controls').children('.slick-nav').children('.counter').append('<span class="current"></span> / <span class="totals"></span>');
        $('.current').text(slick.currentSlide + 1);
        $('.totals').text(slick.slideCount);
      })
      
      main_visual = $('.view_sd').slick({
          autoplay: true,
          dots: false,
          pauseOnDotsHover: false,
          pauseOnHover: false,
          speed: 600,
          arrows: false,
          autoplaySpeed: 5000,
          fade: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          cssEase: 'linear'
          
      }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.current').text(nextSlide + 1);
      });

});

// -------------------------- mGnb close --------------------------
function mGnbClose() {
    $("#mGnb").animate({ right: "-80%" }, 300);
    $("#mGnb").fadeOut(300);
    $("#dimed").fadeOut(300);
    $(".mDepth2 > li > a").removeClass("active");
    $(".mDepth3").slideUp(300);
}

//  -------------------------- mGnb display --------------------------
$(window).resize(function () {
    var winWidth = $(window).width();
    if (winWidth >= 1024) {
        mGnbClose();
    } else {
        mGnbClose();
    }
});


// -------------------------- 상단으로 나타나기 --------------------------
$(window).scroll(function () {
    if ($(this).scrollTop() > 360) {
        $('.loca_nav').fadeIn(500);
    } else {
        $('.loca_nav').fadeOut(500);
    }

});


// fixed header(pc)
$(window).scroll(function () {
    if ($(window).width() > 1200) {
        var scroll = $(window).scrollTop();
        if (scroll >= 70) {
            $("#header").addClass("fixed");
            $("#wrapper").removeClass("main_wp header_ov");

        } else {
            $("#header").removeClass("fixed");
            $("#wrapper").addClass("main_wp header_ov");
        }
    }
});





function choiceFocus(arrId) {
    var menuH = document.querySelector("#gnb").offsetHeight;
    var div_location = document.querySelector("#year" + arrId).offsetTop;
    window.scrollTo({ top: div_location + 350, behavior: 'smooth' });
}


// -------------------------- 화면확대축소 --------------------------

$(function () {

    var zoom = 1;
    $(".btn-zoomup").click(function () {
        var T = Number('1e' + 1);
        if (zoom == 1.5) {
            alert("최대 화면 크기 입니다.\n더 이상 확대하실 수 없습니다");
            return false;
        }
        zoom = Math.round((zoom + 0.1) * T) / T;
        $("body").css("zoom", zoom);
    });
    $(".btn-zoomdown").click(function () {
        var T = Number('1e' + 1);
        if (zoom == .8) {
            alert("최소 화면 크기 입니다.\n더 이상 축소하실 수 없습니다.");
            return false;
        }
        zoom = Math.round((zoom - 0.1) * T) / T;
        $("body").css("zoom", zoom);
    });
    $(".btn-zoom100").click(function () {
        zoom = 1;
        $("body").attr("style", '');
    });
});

/*
window.history.forward(); 
function noBack(){
    window.history.forward();
}
*/

$(function(){
    //자주묻는질문
        function close_accordion_section() {
            $('.bo_tit').removeClass('active');
            $('.bo_cont').stop().slideUp(300);
        }
    
        $('.bo_tit').click(function(e) {
            // Grab current anchor value
    
            if($(this).is('.active')) {
                close_accordion_section();
            }else {
                close_accordion_section();
    
                // Add active class to section title
                $(this).addClass('active');
                // Open up the hidden content panel
                $(this).next('.bo_cont').stop().slideDown(300).addClass('open'); 
            }
    
            e.preventDefault();
        });
    });