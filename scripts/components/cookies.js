//cookies manage
define(function(require, exports, module) {
	function getCookies(section,tabId){
		chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'get', getContent:['cookies']}, function(response) {	
			var html=[],cookieTemp=[],cookiesKey=['domain','name','value','expirationDate','path','hostOnly','httpOnly','secure','session','storeId'];
			if(response&&response.constructor===Array&&response.length>0){
				response.forEach(function(cookie, index){
					cookieTemp=[];
                    cookieTemp.push('<div class="ck-list Hide">');
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
                    			cookieTemp.push('<div class="ck-item"><span class="c-black">' + decodeURIComponent(key) + '</span> : <input class="c-blue" value="' + decodeURIComponent(cookie[key])+'" /></div>');
                    		break;
                    		default:
                    			cookieTemp.push('<div class="ck-item" style="display:none;"><span class="c-black">' + decodeURIComponent(key) + '</span> : <span class="c-blue">' + decodeURIComponent(cookie[key])+'</span></div>');
                    		break;
                    	}
                    });
                    cookieTemp.push('</div>');
					html.push('<div class="ck-wrap"><a class="button ck-look"><span class="c-black">查看' + cookie['name'] + '</span></a><a class="button ck-edit operate Hide">编辑</a><a class="button ck-del operate Hide">删除</a>' + cookieTemp.join('') + '</div>');
				});
			}else{
				html.push('抱歉，没找到与本页匹配的Cookies!');
			}

			section.html(html.join(''));

			// some interaction

			var cookieItem = section.find('div.ck-wrap');
			cookieItem.each(function(index) {
				var _this = cookieItem.eq(index),
					ckList = _this.find('div.ck-list');
				_this.mouseenter(function() {
					_this.find('a.operate').removeClass('Hide');
				});
				_this.mouseleave(function() {
					_this.find('a.operate').addClass('Hide');
				});
				_this.find('a.ck-look').click(function() {
					var look = _this.find('a.c-black');
					if(ckList.css('display') == 'block') {
						look.html(look.html().replace(/收起/g, '查看'));
						ckList.slideUp();
					} else {
						look.html(look.html().replace(/查看/g, '收起'));
						ckList.slideDown();
					}
				});
				_this.find('a.ck-edit').click(function() {
					if(ckList.css('display') == 'none') { 
						ckList.slideDown();
					}
				});
			});

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