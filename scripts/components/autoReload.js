//cache control
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index),
			types={
				'javascript':'脚本',
				'styleSheets':'样式',
				'images':'图片',
				'cookies':'cookies',
				'notifications':'通知',
				'popups':'弹出式窗口',
				'plugins':'插件',
				data:['javascript','styleSheets','images','cookies','notifications','popups','plugins']
			};

		chrome.extension.sendMessage(
			{
				from:'devtools',
				tabId:tabId,
				action:'contentSettings',
				settingsConfig:{
					method:'get',
					type:types.data,
					options:{primaryUrl:'http://*/*'}
				}
			}, 
			function(response) {
				var html=[],re;
                html.push('<div class="center">');
				types.data.forEach(function(element,index){
					re=response[element]?response[element].setting:'unknown';
					index<4?html.push('<p class="button script-line"><input style="vertical-align: middle;" type="checkbox" '+(re==='allow'?'checked':'')+' value="' + element +'">&nbsp;<label style="vertical-align: middle;">'+ types[element] +'</label></p>'):html.push('<p class="button script-line"><label>' + types[element] + '</label>:'+re+'</p>');
				});
                html.push('</div>');
				section.html(html.join(''));

				section.find("input:checkbox").change(function(){
					chrome.extension.sendMessage(
						{
							from:'devtools',
							tabId:tabId,
							action:'contentSettings',
							settingsConfig:{
								method:'set',
								type:[this.value],
								options:{'primaryPattern': '<all_urls>','setting': this.checked?'allow':'block'}
							}
						});
				});
			}
		);
	}
});