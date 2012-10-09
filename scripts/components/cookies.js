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
						for(var key in cookie){
							if(key==='expirationDate'){
								cookieTemp.push(key+' : '+new Date(cookie[key]*1000)+'<br />');
							}else{
								cookieTemp.push(decodeURIComponent(key)+' : '+decodeURIComponent(cookie[key])+'<br />');
							}
						}
						html.push('<h3>Cookie['+(index+1)+']</h3>'+cookieTemp.join(''));
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