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
				panelDd.eq(i).show();
				//change menu arrow direction
				arrow.removeClass('arrow-right').addClass('arrow-down');
			},
			function(){
				//show sub menus
				panelDd.eq(i).hide();
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

			sections.hide();
			sections.eq(i).show();

			introPage.hide();
		});
	});

	//intro button
	jQuery("#intro").click(function(){
		sections.hide();
		introPage.show();
	});
}

if($('section').length>0){bindEvents();}