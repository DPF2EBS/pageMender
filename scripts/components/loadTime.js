//get domready and load time
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',get:['domReadyTime','loadTime']}, function(response) {
				var html=[];
				for(var key in response){
  					html.push('<p>'+key+'=&gt;'+(response[key]||'waiting...'));
  				}
  				
  				section.html(html.join(''));
			});
		});
	}
});