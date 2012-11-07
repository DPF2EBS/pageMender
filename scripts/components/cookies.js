//cookies manage
define(function(require, exports, module) {
	function getCookies(section,tabId){
		chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'get', getContent:['cookies']}, function(response) {	
			var html=[],
				cookiesKey=['domain','name','value','expirationDate','path','hostOnly','httpOnly','secure','session','storeId'];

			if(response&&response.constructor===Array&&response.length>0){
				response.forEach(function(cookie, index){
                    html.push('<dl class="ck-wrap cookie"><dt class="clearfix">'+
                    	'<div class="ckname">'+decodeURIComponent(cookie.name)+'</div>'+
							'<div class="content Hide">'+
								'<label class="c-blue">name:</label><span>'+decodeURIComponent(cookie.name)+'</span>'+								
								'<label class="c-blue">domain:</label><span>'+decodeURIComponent(cookie.domain)+'</span>'+
								'<label class="c-blue">value:</label><span>'+decodeURIComponent(cookie.value)+'</span>'+
							'</div>'+
							'<div class="buttons">'+
								'<a class="button">详细</a>'+
								'<a class="button">编辑</a>'+
								'<a class="button Hide">保存</a>'+
								'<a class="button">删除</a>'+
							'</div>'+
						'</dt>'+
						'<dd class="ck-list">'+
							'<ul>'+
								'<li class="ck-item">'+
									'<label for="" class="c-black">name:</label>'+
									'<input type="" value="'+decodeURIComponent(cookie.name)+'" />'+
									'<label for="" class="c-black">domain:</label>'+
									'<input type="" value="'+decodeURIComponent(cookie.domain)+'" />'+
								'</li>'+
								'<li class="ck-item">'+
									'<label for="" class="c-black">expirationDate:</label>'+
									'<input type="" value="'+decodeURIComponent(cookie.expirationDate)+'" />'+
									'<label for="" class="c-black">path:</label>'+
									'<input type="" value="'+decodeURIComponent(cookie.path)+'" />'+
								'</li>'+
								'<li class="ck-item">'+
									'<label for="" class="c-black">value:</label>'+
									'<textarea rows="5">'+decodeURIComponent(cookie.value)+'</textarea>'+		
								'</li>'+
								'<li class="ck-item">'+
									'<label for="" class="c-black">hostOnly:</label>'+
									'<span class="c-blue">'+decodeURIComponent(cookie.hostOnly)+'</span>'+
									'<label for="" class="c-black">httpOnly:</label>'+
									'<span class="c-blue">'+decodeURIComponent(cookie.httpOnly)+'</span>'+
									'<label for="" class="c-black">secure:</label>'+
									'<span class="c-blue">'+decodeURIComponent(cookie.secure)+'</span>'+
									'<label for="" class="c-black">session:</label>'+
									'<span class="c-blue">'+decodeURIComponent(cookie.session)+'</span>'+
									'<label for="" class="c-black">storeId:</label>'+
									'<span class="c-blue">'+decodeURIComponent(cookie.storeId)+'</span>'+
								'</li>'+
							'</ul>'+
						'</dd></dl>');
				});
			}else{
				html.push('抱歉，没找到与本页匹配的Cookies!');
			}

			section.html(html.join(''));

			// some interaction
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