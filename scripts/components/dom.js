//get dom nodes
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',get:['nodeTags','nodeLength']}, function(response) {
				var html=[];
	
				html.push('<h3>节点数=&gt;'+response['nodeLength']+'</h3>');
				for(var key in response['nodeTags']){
  					html.push('<a class="button dom-tags">'+key+'<sup class="red-dot">'+response['nodeTags'][key]+'</sup></a>');
  				}
	
  				section.html(html.join(''));
			});
		});
	}
});