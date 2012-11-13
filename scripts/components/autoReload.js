//cache control
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index),
			inputs=section.find("input"),
			buttons=section.find("button"),
			status=section.find("p.c-orange"),
			timer;

		buttons.eq(0).click(runReload);
		function runReload(){

			var interv=parseInt(inputs.eq(0).val(),10)||5,
				times=parseInt(inputs.eq(1).val(),10)||1;

			reload(interv,times);

			inputs.attr("disabled",true);

			buttons.eq(0).unbind().click(function(){
				clearTimeout(timer);
				buttons.eq(0).unbind().click(runReload).html('开始刷新');

				status.html("刷新已终止！");
				setTimeout(function(){status.html('');},2000);
				inputs.attr("disabled",false);
			}).html("停止刷新");
		};


		function reload(interv,times){
			chrome.extension.sendMessage(
				{
					from:'devtools',
					tabId:tabId,
					action:'reload', 
					reloadConfig:{
						useCache:true,
						needResponse:true
					}
				},
				function(response) {					
					if(response==='reloaded'){
						times--;
						if(times>=0){
							status.html("剩余"+(times+1)+"次");
							timer=setTimeout(function(){reload(interv,times);},interv*1000);
						}else{
							status.html("刷新完毕！");
							buttons.eq(0).unbind().click(runReload).html('开始刷新');
							setTimeout(function(){status.html('');},2000);
							inputs.attr("disabled",false);
						}
					}
				}
			);
		}
	}
});