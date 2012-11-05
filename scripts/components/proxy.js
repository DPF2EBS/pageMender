//proxy setting
define(function(require, exports, module) {
	function setProxy(section,conf){
		var config={
			value:{
  				mode: "fixed_servers",
  				rules: {
    				singleProxy: {
      					scheme: "http",
      					host: "127.0.0.1",
      					port:80
    				},
    				bypassList: ["<local>"]
  				}
			}, 
			scope: 'regular'
		};

		if(conf.constructor===Object){
			config.value.rules=conf.rules;
		}

		chrome.extension.sendMessage({from:'devtools',action:'set', settingsConfig:{target:'proxy',options:config}}, function(response) {
			if(response&&response.proxySetting==='success'){
				section.find('#enable-proxy-result').html('代理设置成功!').fadeIn().delay(1000).fadeOut();
				section.find('h3>span').html('用户设置');
			};
		});
	}

	function getProxy(section){		
		chrome.extension.sendMessage({from:'devtools',action:'get', getContent:['proxy']}, function(response) {
			var html=[];
			if(response&&response.constructor===Object){
				var mode={
						'auto_detect':'自动检测',
						'direct':'不使用代理',
						'fixed_servers':'用户设置',
						'system':'系统设置',
						'pac_script':'PAC脚本'
					},
					schemes=['http','https','socks4','socks5'],
					t=response.value;

				if(t){
					html.push('<h3 class="right-topic">当前代理模式：<span class="c-orange">' + mode[t.mode] + '</span></h3>');
					
					html.push('<div class="button proxy-sel"><input type="checkbox" value="" id="enable-proxy" '+(t.mode==='system'?'':'checked')+' />&nbsp;自定义代理<span id="enable-proxy-result" class="status-msg"></span></div>');
					
					if(!t.rules){
						t.rules={
							singleProxy: {
      							scheme: "http",
      							host: "127.0.0.1",
      							port:80
    						},
    						bypassList: ["<local>"]
						};
					}
					html.push('<fieldset class="button field-set" style="display:'+(t.mode==='system'?'none':'block')+';"><legend>代理设置</legend>');
					var tt=t.rules,selects=[];
					//rules
					for(var k in tt){
						if(k==='bypassList'){continue;}
						html.push('<h4><input type="hidden" value="'+k+' name="proxyRule"/></h4><ul>');
						//Properties of ProxyRules
						selects=[];
						for(var sc=0,scL=schemes.length;sc<scL;sc++){
							selects.push('<option value="'+schemes[sc]+'" '+(tt[k]['scheme']===schemes[sc]?'selected':'')+'>'+schemes[sc]+'</option>');
						}						
						html.push('<li class="proxy-item"><label>协议:</label><select class="select-stl" name="scheme">'+selects.join('')+'</select></li>');
						html.push('<li class="proxy-item"><label>主机:</label><input name="host" type="text" value="'+tt[k]['host']+'" /></li>');
						html.push('<li class="proxy-item"><label>端口:</label><input name="port" type="text" value="'+tt[k]['port']+'" /></li>');
					}
					html.push('<li><label style="vertical-align: middle;">旁路:</label>&nbsp;<textarea cols="23" rows="2" name="bypassList" style="vertical-align: middle;margin-left:5px;">'+tt['bypassList']+'</textarea></li></ul>');
					html.push('<div class="proxy-btn"><button class="button" id="save-proxy">保存</button></div>');
					html.push('</fieldset>');		
				}
			}else{
				html.push('抱歉，无法读取代理设置!');
			}

			section.html(html.join(''));

			var enableProxy=section.find('#enable-proxy');

			enableProxy.change(function(){
				if(this.checked){
					// setProxy(section);
					section.find('#enable-proxy-result').html('设置您所希望的代理吧!').fadeIn().delay(1000).fadeOut();
					section.find('fieldset').slideDown();
				}else{
					resetProxy(section);
					section.find('fieldset').slideUp();
				};
			});

			section.find('#save-proxy').click(function(){
				var scheme=section.find('select'),
					input=section.find('input:text'),
					textarea=section.find('textarea'),
					config={
						rules:{}
					};

				config.rules.bypassList=[].concat(textarea.eq(0).val().split(','));
				config.rules.singleProxy={
					scheme: scheme.eq(0).val(),
      				host: input.eq(0).val(),
      				port:parseInt(input.eq(1).val(),10)
				};

				setProxy(section,config);
			});
		});			
	}

	function resetProxy(section){
		var config={
			value:{
  				mode: "system"  				
			}, 
			scope: 'regular'
		};
		chrome.extension.sendMessage({from:'devtools',action:'set', settingsConfig:{target:'proxy',options:config}}, function(response) {
			if(response&&response.proxySetting==='success'){				
				section.find('#enable-proxy-result').html('取消代理成功!').fadeIn().delay(1000).fadeOut();
				section.find('h3>span').html('系统设置');
			};
		});
	}

	return function(win,index,tabId){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			getProxy(section);
		});
	}
});