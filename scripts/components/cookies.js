//cookies manage
define(function(require, exports, module) {
	function getCookies(section,tabId){
		chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'get', getContent:['cookies']}, function(response) {	
			var html=[],cookieTemp=[],cookiesKey=['domain','name','value','expirationDate','path','hostOnly','httpOnly','secure','session','storeId'];
			if(response&&response.constructor===Array&&response.length>0){
				response.forEach(function(cookie, index){
					cookieTemp=[];
                    cookieTemp.push('<div class="ck-list">');
                    cookiesKey.forEach(function(key,kindex){
                        if(key==='expirationDate'){
							cookieTemp.push('<div class="ck-item"><span class="c-black">' + key + '</span> : <span class="c-blue">' + new Date(cookie[key]*1000)+'</span></div>');
						}else{
							cookieTemp.push('<div class="ck-item"><span class="c-black">' + decodeURIComponent(key) + '</span> : <span class="c-blue">' + decodeURIComponent(cookie[key])+'</div>');
						}
                    });
                    cookieTemp.push('</div>');
					html.push('<div class="ck-wrap"><a class="button ck-link"><span class="c-black">' + cookie['name'] + '</span></a>' + cookieTemp.join('') + '</div>');
				});
			}else{
				html.push('抱歉，没找到与本页匹配的Cookies!');
			}

			section.html(html.join(''));
		});

	}

	function setCookies(section){

	}

	function deleteCookies(){

	}

	function clearCookies(){

	}

	return function(win,index,tabId){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			getCookies(section,tabId);
		});
	}
});