//cache control
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index),
			links=section.find('a.button');

		links.each(function(i){
			var el=links.eq(i);
			el.click(function(e){
				e.preventDefault();
				chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'open',openConfig:{url:el.attr('href'), active:true}});
			});
		});
	}
});