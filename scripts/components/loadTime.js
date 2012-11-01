//get domready and load time
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);

		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools', action:'get', getContent:['domReadyTime','loadTime']}, function(response) {
				var html=['<div class="center">'];				             
				for(var key in response){					
  					html.push('<div class="button load-desc"><div class="load-name">' + key + '</div><div class="load-time">' + (response[key]?response[key]+'(秒)':'waiting...') + '</div></div>');
  				}

  				html=['<h3 class="right-topic">'+(html.length<1?'<a href="#" id="reload">点击刷新页面</a>':'加载时间统计')+'<h3>'].concat(html);
  				if(html.length<2){					
  					html.push('<div class="button load-desc"><div class="load-name">domReady</div><div class="load-time">无数据</div></div>');
  					html.push('<div class="button load-desc"><div class="load-name">loadTime</div><div class="load-time">无数据</div></div>');
  				};
  				html.push('</div>');
  				section.html(html.join(''));

  				section.find('#reload').click(function(){
					chrome.extension.sendMessage(
  						{
  							from:'devtools', 
  							action:'reload', 
  							reloadConfig:{
  								useCache:true,
  								needResponse:true
  							}
  						},
  						function(response) {
  							if(response==='reloaded'){
  								// setTimeout(function(){win.subMenu.eq(index).click();},2000);
  								// alert("刷新成功!");
  							}
  						}
  					);	
				});
			});
		});
	}
});