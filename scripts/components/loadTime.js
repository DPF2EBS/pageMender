//get domready and load time
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index),
			reloading=false;
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools', action:'get', getContent:['domReadyTime','loadTime']}, function(response) {
				var html=[];
                html.push('<h3 class="right-topic">加载时间统计<h3>');
				for(var key in response){
  					html.push('<div class="metro-box"><div class="load-name">' + key + '</div><div class="load-time">' + (response[key] + '(秒)' || 'waiting...') + '</div></div>');
  				}

  				if(html.length<1&&!reloading){
  					html.push('<h3>请刷新页面！</h3>');
  					/*chrome.extension.sendMessage(
  						{
  							from:'devtools', 
  							action:'reload', 
  							reloadConfig:{
  								useCache:true,
  								needResponse:true
  							}
  						},
  						function(response) {
  							reloading=true;
  							if(response==='reloaded'){
  								setTimeout(function(){win.subMenu.eq(index).click();},500);
  							}
  						}
  					);*/			
  				};
  				
  				section.html(html.join(''));
			});
		});
	}
});