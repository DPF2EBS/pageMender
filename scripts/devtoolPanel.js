var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36435133-1']);
_gaq.push(['_trackPageview','devtoolPanel.html']);

(function() {
  var ga = document.createElement('script'); 
  ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(ga, s);
})();

//get left menus
var panelDt,
	panelDd,
	subMenu,
	sections,
	introPage=$('#intro-page');

function bindEvents(){
	panelDt=$('aside dt');
	panelDd=$('aside dd');
	subMenu=$('.item-lists li');
	sections=$('article>section');

	//bind panel main menu events
	panelDt.each(function(i){
		var arrow=$(this).find('i');
		//each dt menu item click event
		$(this).toggle(
			function(){
				//show sub menus
				panelDd.eq(i).slideDown();
				//change menu arrow direction
				arrow.removeClass('arrow-right').addClass('arrow-down');
			},
			function(){

				//show sub menus
				panelDd.eq(i).slideUp();
				//change menu arrow direction
				arrow.removeClass('arrow-down').addClass('arrow-right');
			}
		);
	});

	//submenu
	subMenu.each(function(i){
		$(this).click(function(){
			subMenu.removeClass('active');
			$(this).addClass('active');

			// _gaq.push(['_trackPageview','devtoolPanel.html']);
			_gaq.push(['_trackEvent', $(this).attr("rel") , 'clicked']);

			sections.slideUp();
			sections.eq(i).slideDown();

			introPage.slideUp();
		});
	});

	//intro button
	jQuery("#intro").click(function(){
		sections.hide();
		introPage.show();
	});
}

if($('section').length>0){bindEvents();}