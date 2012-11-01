//get domready and load time
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index);

		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools', tabId:tabId,action:'get', getContent:['domReadyTime','loadTime']}, function(response) {
				var html=['<div class="center">'];
					html.push('<h3 class="right-topic">'+(response.domReadyTime?'加载时间统计':'<a href="#" id="reload">请点击刷新页面</a>')+'<h3>');
				if(response.domReadyTime){
					for(var key in response){				
						html.push('<div class="button load-desc"><div class="load-name">' + key + '</div><div class="load-time">' + (response[key]?response[key]+'(秒)':'waiting...') + '</div></div>');
					}
				}else{
					html.push('<div class="button load-desc"><div class="load-name">domReady</div><div class="load-time">无数据</div></div>');
					html.push('<div class="button load-desc"><div class="load-name">loadTime</div><div class="load-time">无数据</div></div>');
				}
				
				html.push('</div>');
				section.html(html.join(''));

				section.find('#reload').click(function(){
					chrome.extension.sendMessage(
						{
							from:'devtools',
							tabId:tabId,
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