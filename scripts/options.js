$(document).ready(function(){
	var li=$('.item-lists>li'),
		section=$('article>section');

	li.each(function(i){
		$(this).click(function(){
			li.removeClass('active');
			$(this).addClass('active');
			section.slideUp();
			section.eq(i).slideDown();
		});
	});
});