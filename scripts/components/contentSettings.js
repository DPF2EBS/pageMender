//cache control
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index),
			types=['javascript','styleSheets','images','cookies','notifications','popups','plugins'];

        function transforHZ(str) {
            switch(str) {
                case 'javascript':
                    str = '脚本';
                    break;
                case 'styleSheets':
                    str = '样式';
                    break;
                case 'images':
                    str = '图片';
                    break;
                case 'notifications':
                    str = '通知';
                    break;
                case 'popups':
                    str = '弹出式窗口';
                    break;
                case 'plugins':
                    str = '插件';
                    break;
                default:
                    str = str;
            }
            return str;
        }

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
                html.push('<div class="center">');
				types.forEach(function(element,index){
					re=response[element]?response[element].setting:'unknown';
                    element = transforHZ(element);
					index<4?html.push('<p class="button script-line"><input style="vertical-align: middle;" type="checkbox" '+(re==='allow'?'checked':'')+' value="' + transforHZ(element) +'">&nbsp;<label style="vertical-align: middle;">'+ transforHZ(element) +'</label></p>'):html.push('<p class="button script-line"><label>' + transforHZ(element) + '</label>:'+re+'</p>');
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