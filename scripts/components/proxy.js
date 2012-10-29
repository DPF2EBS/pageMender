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
				section.find('#enable-proxy-result').html('代理设置成功!').fadeIn().delay(2000).fadeOut();
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
					html.push('<h3 class="right-topic">当前代理模式：「<span class="c-red">' + mode[t.mode] + '</span>」</h3>');
					
					html.push('<div><input type="checkbox" value="" id="enable-proxy" '+(t.mode==='system'?'':'checked')+' />自定义代理<span id="enable-proxy-result" style="color:red;text-indent:2em;"></span></div>');									
					
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

					html.push('<fieldset style="display:'+(t.mode==='system'?'none':'block')+';"><legend>Proxy Setting</legend>');
					var tt=t.rules,selects=[];
					//rules
					for(var k in tt){
						if(k==='bypassList'){continue;}
						html.push('<h4>'+k+'<input type="hidden" value="'+k+' name="proxyRule"/></h4><ul>');
						//Properties of ProxyRules
						selects=[];
						for(var sc=0,scL=schemes.length;sc<scL;sc++){
							selects.push('<option value="'+schemes[sc]+'" '+(tt[k]['scheme']===schemes[sc]?'selected':'')+'>'+schemes[sc]+'</option>');
						}						
						html.push('<li class="ck-item"><label class="c-gray">Scheme<select name="scheme">'+selects.join('')+'</select></label></li>');
						html.push('<li class="ck-item"><label class="c-gray">Host<input name="host" type="text" value="'+tt[k]['host']+'" /></label></li>');
						html.push('<li class="ck-item"><label class="c-gray">Port<input name="port" type="text" value="'+tt[k]['port']+'" /></label></li>');
						html.push('</ul>');
					}
					html.push('<div class="ck-item"><label class="c-gray">bypassList<textarea name="bypassList">'+tt['bypassList']+'</textarea></label></div>');
					html.push('<div class="ck-item"><button id="save-proxy">Save</button></div>');
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
					section.find('fieldset').show();
				}else{
					resetProxy(section);
					section.find('fieldset').hide();
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
				section.find('#enable-proxy-result').html('取消代理成功!').fadeIn().delay(2000).fadeOut();
			};
		});
	}

	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			getProxy(section);
		});
	}
});