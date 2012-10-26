//cache control
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index),
			types=['javascript','styleSheets','images','cookies','notifications','popups','plugins'];

		chrome.extension.sendMessage(
			{
				from:'devtools',
				action:'contentSettings',
				settingsConfig:{
					method:'get',
					type:types,
					options:{primaryUrl:'http://*/*'}
				}
			}, 
			function(response) {
				var html=[],re;
				types.forEach(function(element,index){
					re=response[element]?response[element].setting:'unknown';
					index<4?html.push('<p><label>'+element+'</label>:<input type="checkbox" '+(re==='allow'?'checked':'')+' value="'+element+'"></p>'):html.push('<p><label>'+element+'</label>:'+re+'</p>');
				});
				section.html(html.join(''));

				section.find("input:checkbox").change(function(){
					chrome.extension.sendMessage(
						{
							from:'devtools',
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