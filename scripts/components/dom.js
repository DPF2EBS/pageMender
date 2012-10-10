//get dom nodes
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',get:['nodeTags','nodeLength']}, function(response) {
				var html=[];
				
				if(typeof response['nodeLength']!=='undefined'){
					html.push('<h3>节点数=&gt;'+response['nodeLength']+'</h3>');
					for(var key in response['nodeTags']){
  						html.push('<a class="button dom-tags">'+key+'<sup class="red-dot">'+response['nodeTags'][key]+'</sup></a>');
  					}
  				}else{
  					html.push('<h3>请刷新页面！</h3>');
  				}
	
  				section.html(html.join(''));
			});
		});
	}
});