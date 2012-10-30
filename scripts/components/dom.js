//get dom nodes
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools', action:'get', getContent:['nodeTags','nodeLength']}, function(response) {
				var html=[];
				
				if(typeof response['nodeLength']!=='undefined'){
					html.push('<h3 class="right-topic">节点数共计：<strong>'+(response['nodeLength']||'waiting...')+'</strong>&nbsp;个</h3><div class="cont-wrap">');

					for(var key in response['nodeTags']){
  						html.push('<a class="button dom-tags"><span class="red-dot">' + response['nodeTags'][key] + '</span>' + key + '</a>');
  					}

                    html.push('</div>');
  				}else{
  					html.push('<h3 class="right-topic"><a href="#" id="reload">点击刷新页面</a>！</h3>');
  				}
	
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