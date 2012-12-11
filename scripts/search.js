var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36435133-1']);
_gaq.push(['_trackPageview','options.html']);

(function() {
  var ga = document.createElement('script'); 
  ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; 
  s.parentNode.insertBefore(ga, s);
})();

function getDateStr(d) {
	if(!d.getFullYear()) {
		return '';
	}
	return d.getFullYear() + '-' + format(d.getMonth() + 1) + '-' + format(d.getDate()) + ' ' + format(d.getHours()) + ':' + format(d.getMinutes()) + ':' + format(d.getSeconds());
}

function format(n) {
	return n < 10 ? '0' + n : n;
}

$(document).ready(function(){
	var titleData={
			'cookies':'Cookies',
			'ga':'GA and Hippo'
		},
		bgWin=chrome.extension.getBackgroundPage(),
		featuresHTML=[],
		// configData=config.getData(),
		resourceType=window.location.search.replace("?","").split("|"),
		tab={
			id:resourceType[1],
			url:bgWin.contentData[resourceType[1]].tabURL,
			domain:bgWin.contentData[resourceType[1]].domain
		};

	//dom
		buttons=$('#button>a'),
		fieldTitle=$('#j-field-title'),
		section=$('section').eq(0);

	//init page
	document.title=titleData[resourceType[0]];
	fieldTitle.html(titleData[resourceType[0]]+' ['+tab.url+']');

	if(resourceType[0]==='cookies'){
		fieldTitle.html(titleData[resourceType[0]]+' ['+tab.url+']<a class="button button-cookie-add" href="#">添加Cookie</a>');
		chrome.cookies.getAll({url:tab.url}, function (cookies) {
            // console.log(cookies);
            var cookieDomain=tab.domain,
            	tabId=tab.id,
            	html=[],
				response=cookies;

			if(response&&response.constructor===Array&&response.length>0){
				html.push('<dl class="ck-wrap cookie Hide new-cookie"><dt class="clearfix line-style0"><div class="ckname">新Cookie</div></dt><dd class="ck-list"><ul><li class="ck-item"> <label for="" class="c-black">name:</label><input type="text" value="" /><label for="" class="c-black">domain:</label><input type="text" value="" /></li><li class="ck-item"><label for="" class="c-black">value:</label><textarea rows="1"></textarea><label for="" class="c-black">expires:</label><input type="text" value="" /></li><li class="ck-item"> <label for="" class="c-black">hostOnly:</label><span class="c-blue"><input type="checkbox" /></span><label for="" class="c-black">httpOnly:</label><span class="c-blue"><input type="checkbox" /></span><label for="" class="c-black">secure:</label><span class="c-blue"><input type="checkbox" /></span><label for="" class="c-black">session:</label><span class="c-blue"><input type="checkbox" /></span><div class="buttons"><span class="status-msg Hide">添加成功</span><a class="button save-add">保存Cookie</a> <a class="button cancel-add">取消添加</a> </div> </li> </ul> </dd> </dl>');

				response.forEach(function(cookie, index){
                    html.push('<dl class="ck-wrap cookie clist"><dt class="clearfix ctitle line-style' + (index%2) + '">'+
                    	'<div class="ckname Hide">'+decodeURIComponent(cookie.name)+'</div>'+
							'<div class="content">'+
								'<label>'+decodeURIComponent(cookie.name)+'</label><span>'+decodeURIComponent(cookie.value)+'</span>'+
							'</div>'+
						'</dt>'+
						'<dd class="ck-list ccontent Hide">'+
							'<ul>'+
								'<li class="ck-item">'+
									'<label for="" class="c-black">name</label>'+
									'<input type="text" value="'+decodeURIComponent(cookie.name)+'" />'+
									'<label for="" class="c-black">domain</label>'+
									'<input type="text" disabled value="'+decodeURIComponent(cookie.domain)+'" />'+
								'</li>'+
								'<li class="ck-item">'+
									'<label for="" class="c-black">expires</label>'+
									'<input type="text" value="'+getDateStr(new Date(cookie.expirationDate*1000))+'" />'+
									'<label for="" class="c-black">path</label>'+
									'<input type="text" disabled value="'+decodeURIComponent(cookie.path)+'" />'+
								'</li>'+
								'<li class="ck-item">'+
									'<label for="" class="c-black">value</label>'+
									'<textarea rows="3">'+decodeURIComponent(cookie.value)+'</textarea>'+									
									'<label for="" class="c-black">hostOnly</label>'+
									'<span class="c-blue"><input type="checkbox" '+(cookie.hostOnly?'checked':'')+' /></span>'+
									'<label for="" class="c-black">httpOnly</label>'+
									'<span class="c-blue"><input type="checkbox" '+(cookie.httpOnly?'checked':'')+' /></span>'+
									'<label for="" class="c-black">secure</label>'+
									'<span class="c-blue"><input type="checkbox" '+(cookie.secure?'checked':'')+' /></span>'+
									'<label for="" class="c-black">session</label>'+
									'<span class="c-blue"><input type="checkbox" '+(cookie.session?'checked':'')+' /></span>'+
									'<span class="c-blue"><input type="hidden" value="'+cookie.storeId+'"/></span>'+
								'</li>'+
								'<li class="ck-item">'+
									'<a class="button save">保存修改</a>'+
									'<a class="button delete">删除Cookie</a>'+
									'<span class="status-msg Hide">修改成功</span>'+							
								'</li>'+																
							'</ul>'+
						'</dd></dl>');
				});
			}else{
				html.push('抱歉，没找到与本页匹配的Cookies!');
			}

			section.html(html.join(''));

			// some interaction
			var btnSave=section.find("a.save"),
				btnDelete=section.find("a.delete"),
				title=section.find("dt.ctitle"),
				content=section.find('dd.ccontent'),
				list=section.find("dl.clist");

			title.each(function(index){
				var _this=title.eq(index),
					_title=_this.find("div"),
					_content=content.eq(index);
				_this.click(function(){
					if(_content.hasClass("Hide")){_content.slideDown();}else{_content.slideUp();}
					_content.toggleClass("Hide");
					_title.eq(0).toggleClass("Hide");
					_title.eq(1).toggleClass("Hide");
				});
			});

			btnSave.each(function(index){
				var _this=btnSave.eq(index),
					_content=content.eq(index),
					_title=title.eq(index).find("div"),
					_inputs=_content.find("input"),
					_textarea=_content.find("textarea"),
					_status=_content.find(".status-msg");
				_this.click(function(){
					var date=Date.parse(_inputs.eq(2).val());
						cookieData={
							domain:_inputs.eq(1).val(),
							oldName:_title.eq(0).text(),
							name:_inputs.eq(0).val(),
							url:'',
							storeId:_inputs.eq(8).val(),
							value:_textarea.eq(0).val(),
							expirationDate:date>0?date/1000:0,
							path:_inputs.eq(3).val(),
							httpOnly:_inputs.eq(5).attr("checked")?true:false,
							secure:_inputs.eq(6).attr("checked")?true:false
						};

					chrome.extension.sendMessage(
						{
							from:'devtools',
							tabId:tabId,
							action:'set', 
							settingsConfig:{
								target:'cookie',
								data:cookieData
							}
						}, 
						function(response) {
							if(response==='setCookieOK'){
								_title.eq(0).text(_inputs.eq(0).val());
								_title.eq(1).html('<label>'+_inputs.eq(0).val()+':</label><span>'+_textarea.eq(0).val()+'</span>');
								_status.removeClass("Hide").text("修改成功");
								setTimeout(function(){_status.addClass("Hide")},2000);
								// getCookies(section,tabId);
							}
						}
					);
				});
			});

			btnDelete.each(function(index){
				btnDelete.eq(index).click(function(){
					chrome.extension.sendMessage(
						{
							from:'devtools',
							tabId:tabId,
							action:'clear', 
							clearConfig:{
								type:'cookie',
								data:{
									name:content.eq(index).find("input").eq(0).val()
								}
							}
						}, 
						function(response) {
							if(response==='removeCookieOK'){
								list.eq(index).remove();
							}							
						}
					);
				});
			});

			var newCookie=section.find('.new-cookie'),
				newCookieInputs=newCookie.find("input"),
				newCookieTextarea=newCookie.find("textarea"),
				newCookieStatus=newCookie.find(".status-msg");
			$('.button-cookie-add').eq(0).click(function(){
				if(newCookie.hasClass("Hide")){
					newCookie.slideDown();

					var d=new Date();
					d.setFullYear(d.getFullYear()+1);
					newCookieInputs.eq(1).val(cookieDomain);
					newCookieInputs.eq(2).val(getDateStr(d));
				}else{
					newCookie.slideUp();
				}
				newCookie.toggleClass("Hide");
			});

			section.find('.cancel-add').click(function(){
				newCookie.slideUp();
				newCookie.addClass("Hide");
			});

			section.find('.save-add').click(function(){
				var date=Date.parse(newCookieInputs.eq(2).val());
					cookieData={
						domain:newCookieInputs.eq(1).val(),
						name:newCookieInputs.eq(0).val(),
						url:'',
						value:newCookieTextarea.eq(0).val(),
						expirationDate:date>0?date/1000:0,
						httpOnly:newCookieInputs.eq(4).attr("checked")?true:false,
						secure:newCookieInputs.eq(5).attr("checked")?true:false
					};

					chrome.extension.sendMessage(
						{
							from:'devtools',
							tabId:tabId,
							action:'set', 
							settingsConfig:{
								target:'cookie',
								data:cookieData
							}
						}, 
						function(response) {
							if(response==='setCookieOK'){
								newCookieStatus.removeClass("Hide");
								setTimeout(function(){
									// getCookies(section,tabId);
									window.location.reload();
								},1000);
							}
						}
					);
			});
        });
	}else if(resourceType[0]==='ga'){
		// console.log('ga');
		var GAhtml=bgWin.contentData[tab.id].ga;
		section.html(GAhtml.join(''));
	}

	//buttons
	buttons.eq(2).click(function(){
		window.close();
	});

	_gaq.push(['_trackPageview','search']);
});