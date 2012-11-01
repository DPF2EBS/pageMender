//cache control
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index),
			types=['javascript','styleSheets','images','cookies','notifications','popups','plugins'];

		chrome.extension.sendMessage(
			{
				from:'devtools',
				tabId:tabId,
				action:'contentSettings',
				settingsConfig:{
					method:'get',
					type:types,
					options:{primaryUrl:'http://*/*'}
				}
			}, 
			function(response) {
				var html=[],re;
                html.push('<h3 class="right-topic">脚本禁用<h3>');
				types.forEach(function(element,index){
					re=response[element]?response[element].setting:'unknown';
					index<4?html.push('<p class="button script-line"><input style="vertical-align: middle;" type="checkbox" '+(re==='allow'?'checked':'')+' value="'+element+'">&nbsp;<label style="vertical-align: middle;">'+element+'</label></p>'):html.push('<p class="button script-line"><label>'+element+'</label>:'+re+'</p>');
				});
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