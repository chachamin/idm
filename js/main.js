$(document).ready(function () {

	//alim
	$('.alim_sd').on('init', function (event, slick) {
		$(this).siblings('.slick-controls').append('<div class="counter"><span class="current"></span>/<span class="total"></span></div>');
		$('.current').text(slick.currentSlide + 1);
		$('.total').text(slick.slideCount);
	})
	alim_sd = $('.alim_sd').slick({
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
	}).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		$('.current').text(nextSlide + 1);
	});

	//news
	$('.news_tabs > li > a.tab_link').on('focus click', function () {
		$(this).addClass('active');
		$(this).parent('li').siblings('li').find('a').removeClass('active');
		$(this).parent('li').find('div').css('display', 'block');
		$(this).parent('li').siblings('li').find('div').css('display', 'none');
		$(this).parent('li').find('a.more').css('display', 'block');
		$(this).parent('li').siblings('li').find('a.more').css('display', 'none');
	});

	//프로그램
	$('.pg_tabs > li > a.tab_link').on('focus click', function () {
		$(this).addClass('active');
		$(this).parent('li').siblings('li').find('a').removeClass('active');
		$(this).parent('li').find('div').css('display', 'block');
		$(this).parent('li').siblings('li').find('div').css('display', 'none');
		$(this).parent('li').find('a.more').css('display', 'block');
		$(this).parent('li').siblings('li').find('a.more').css('display', 'none');
		$('.pg_sd').slick("setPosition");
	});

	$('.pg_sd').slick({
		autoplay: false,
		dots: false,
		pauseOnDotsHover: false,
		pauseOnHover: false,
		speed: 600,
		arrows: false,
		autoplaySpeed: 3000,
		fade: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		cssEase: 'linear',
		responsive: [

			{
				breakpoint: 960,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 620,
				settings: {
					centerMode: true,
					slidesToShow: 1
				}
			}
		]
	});
})