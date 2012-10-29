//cookies manage
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',action:'get', getContent:['cookies']}, function(response) {	
				var html=[],cookieTemp=[],cookiesKey=['domain','name','value','expirationDate','path','hostOnly','httpOnly','secure','session','storeId'];
				if(response&&response.constructor===Array&&response.length>0){
					response.forEach(function(cookie, index){
						cookieTemp=[];
                        cookieTemp.push('<div class="ck-list">');
                        cookiesKey.forEach(function(key,kindex){
                        	if(key==='expirationDate'){
								cookieTemp.push('<div class="ck-item"><span class="c-gray">' + key + '</span> : <span class="c-blue">' + new Date(cookie[key]*1000)+'</span></div>');
							}else{
								cookieTemp.push('<div class="ck-item"><span class="c-gray">' + decodeURIComponent(key) + '</span> : <span class="c-blue">' + decodeURIComponent(cookie[key])+'</div>');
							}
                        });

						/*for(var key in cookie){
							if(key==='expirationDate'){
								cookieTemp.push('<div class="ck-item"><span class="c-gray">' + key + '</span> : <span class="c-blue">' + new Date(cookie[key]*1000)+'</span><input type="text" value="'+new Date(cookie[key]*1000)+'" /></div>');
							}else{
								cookieTemp.push('<div class="ck-item"><span class="c-gray">' + decodeURIComponent(key) + '</span> : <span class="c-blue">' + decodeURIComponent(cookie[key])+'</span><input type="text" value="'+decodeURIComponent(cookie[key])+'" /></div>');
							}
						}*/
                        cookieTemp.push('</div>');
						html.push('<h3 class="right-topic">Cookie name：「<span class="c-red">' + cookie['name'] + '</span>」</h3>' + cookieTemp.join(''));
					});
				}else{
					html.push('抱歉，没找到与本页匹配的Cookies!');
				}

				section.html(html.join(''));
			});		
		});
	}

	/*function setCookies(){}
	function deleteCookies(){}
	function clearCookies(){}*/
});