//cache control
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index),
			links=section.find('a.link'),
			btn=section.find('a.btn'),
			status=section.find('p'),
			cleanTime=section.find('select').eq(0);

		links.each(function(i){
			var el=links.eq(i);
			el.click(function(e){
				e.preventDefault();
				chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'open',openConfig:{url:el.attr('href'), active:true}});
			});
		});

		btn.click(function(e){
			e.preventDefault();
	
			status.html('清理中，请耐心等待<img src="../icons/loader.gif" />');
			btn.attr("disabled",true);
			chrome.extension.sendMessage(
				{
					from:'devtools',
					action:'clear',
					tabId:tabId,
					clearConfig:{
						type:'cache',
						removeOptions: {
                			"since": new Date().getTime()-1000*60*60*parseInt(cleanTime.val(),10)
            			},
            			removeData:{
                			"cache": true
            			}
            		}
            	},
            	function(response) {
					if(response&&response==='finished'){
						btn.removeAttr("disabled");
						status.html('清理完成！');
						setTimeout(function(){status.html('');},2000);
					}
				}
			);		
		});
	}
});