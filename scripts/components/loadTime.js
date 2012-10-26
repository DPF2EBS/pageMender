//get domready and load time
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',get:['domReadyTime','loadTime']}, function(response) {
				var html=[];
                html.push('<h3 class="right-topic">加载时间统计<h3>');
				for(var key in response){
  					html.push('<div class="metro-box"><div class="load-name">' + key + '</div><div class="load-time">' + (response[key] + '(秒)' || 'waiting...') + '</div></div>');
  				}
  				section.html(html.join(''));
			});
		});
	}
});