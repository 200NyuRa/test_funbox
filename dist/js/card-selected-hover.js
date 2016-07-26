(function($) {
	$('.card__prew-wrapper').hover(
		function(){
			$(this).prev().filter(':checked').addClass('js-hover');
			$(this).prev().change(function(){
				$(this).removeClass('js-hover');
			});
		},
		function(){
			if($(this).prev().filter(':checked').is('.js-hover')) {
				$(this).prev().filter(':checked').removeClass('js-hover');
			}
		}
	);
})(jQuery);