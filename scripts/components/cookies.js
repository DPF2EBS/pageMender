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
								cookieTemp.push('<div class="ck-item"><span class="c-gray">' + key + '</span> : <span class="c-red">' + new Date(cookie[key]*1000)+'</span></div>');
							}else{
								cookieTemp.push('<div class="ck-item"><span class="c-gray">' + decodeURIComponent(key) + '</span> : <span class="c-red">' + decodeURIComponent(cookie[key])+'</span></div>');
							}
						}
                        cookieTemp.push('</div>');
						html.push('<h3 class="right-topic">Cookie name：「<span class="c-blue">' + cookie['name'] + '</span>」</h3>' + cookieTemp.join(''));
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