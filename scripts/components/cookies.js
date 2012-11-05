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
                    	switch(key){
                    		case 'expirationDate':
                    			cookieTemp.push('<div class="ck-item"><span class="c-black">' + key + '</span> : <input type="text" class="c-blue" value="' + new Date(cookie[key]*1000)+'"></div>');
                    		break;
                    		case 'name':
                    		case 'domain':
                    			cookieTemp.push('<div class="ck-item"><span class="c-black">' + decodeURIComponent(key) + '</span> : <input type="text" class="c-blue" value="' + decodeURIComponent(cookie[key])+'" /></div>');
                    		break;
                    		case 'value':
                    			cookieTemp.push('<div class="ck-item"><span class="c-black">' + decodeURIComponent(key) + '</span> : <textarea cols="60" rows="1" class="c-blue">' + decodeURIComponent(cookie[key])+'</textarea></div>');
                    		break;
                    		default:
                    			cookieTemp.push('<div class="ck-item" style="display:none;"><span class="c-black">' + decodeURIComponent(key) + '</span> : <span class="c-blue">' + decodeURIComponent(cookie[key])+'</span></div>');
                    		break;
                    	}
                    });
                    cookieTemp.push('</div>');
					html.push('<div class="ck-wrap"><a class="button ck-link"><span class="c-black">' + cookie['name'] + '</span></a><a class="button">Edit</a><a class="button">Delete</a>' + cookieTemp.join('') + '</div>');
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