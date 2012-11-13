//cookies manage
define(function(require, exports, module) {
	function getCookies(section,tabId){
		chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'get', getContent:['cookies']}, function(response) {
			var cookieDomain=response.domain,
				// cookiesKey=['domain','name','value','expirationDate','path','hostOnly','httpOnly','secure','session','storeId'];
				html=[];
			var oddOrEven = function (i) {
				return i%2;
			};
			if(response&&response.data&&response.data.constructor===Array&&response.data.length>0){
				html.push('<h3 class="right-topic">Cookies管理 <a class="button button-cookie-add" href="#">添加Cookie</a><h3>');
				html.push('<dl class="ck-wrap cookie Hide new-cookie"><dt class="clearfix"><div class="ckname">New Cookie</div></dt><dd class="ck-list"><ul><li class="ck-item"> <label for="" class="c-black">name:</label><input type="text" value="" /><label for="" class="c-black">domain:</label><input type="text" value="" /></li><li class="ck-item"><label for="" class="c-black">value:</label><textarea rows="1"></textarea><label for="" class="c-black">expires:</label><input type="text" value="" /></li><li class="ck-item"> <label for="" class="c-black">hostOnly:</label><span class="c-blue"><input type="checkbox" /></span><label for="" class="c-black">httpOnly:</label><span class="c-blue"><input type="checkbox" /></span><label for="" class="c-black">secure:</label><span class="c-blue"><input type="checkbox" /></span><label for="" class="c-black">session:</label><span class="c-blue"><input type="checkbox" /></span><div class="buttons"><span class="status-msg Hide">添加成功</span><a class="button save-add">保存Cookie</a> <a class="button cancel-add">取消添加</a> </div> </li> </ul> </dd> </dl>');

				response.data.forEach(function(cookie, index){
					var lineColor = oddOrEven(index);
                    html.push('<dl class="ck-wrap cookie clist"><dt class="clearfix ctitle line-style' + lineColor + '">'+
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
			section.find('.button-cookie-add').click(function(){
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
									getCookies(section,tabId);
								},1000);
							}
						}
					);
			});
		});
	}

	function getDateStr(d){
		if(!d.getFullYear()){return '';}
		return d.getFullYear()+'-'+format(d.getMonth()+1)+'-'+format(d.getDate())+' '+format(d.getHours())+':'+format(d.getMinutes())+':'+format(d.getSeconds());
	}
	function format(n){
		return n<10?'0'+n:n;
	}

	return function(win,index,tabId){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			getCookies(section,tabId);
		});
	}
});