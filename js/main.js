$(document).ready(function(){
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