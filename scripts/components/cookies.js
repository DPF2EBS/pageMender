//cookies manage
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',get:['cookies']}, function(response) {	
				var html=[],cookieTemp=[];
				if(response&&response.constructor===Array&&response.length>0){
					response.forEach(function(cookie, index){
						cookieTemp=[];
                        cookieTemp.push('<div class="ck-list">');
						for(var key in cookie){
							if(key==='expirationDate'){
								cookieTemp.push('<span>' + key + ' : ' + new Date(cookie[key]*1000)+'</span>');
							}else{
								cookieTemp.push('<span>' + decodeURIComponent(key)+' : '+decodeURIComponent(cookie[key])+'</span>');
							}
						}
                        cookieTemp.push('</div>');
						html.push('<h3 class="right-topic">Cookie['+(index+1)+']</h3>'+cookieTemp.join(''));
					});
				}else{
					html.push('没有匹配的Cookies数据!');
				}

				section.html(html.join(''));
			});		
		});
	}

	/*function setCookies(){}
	function deleteCookies(){}
	function clearCookies(){}*/
});