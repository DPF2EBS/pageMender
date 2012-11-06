//get standard validation
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'get',getContent:['tabURL']}, function(response) {
				var html=[];
                html.push('<h3 class="right-topic">表单清理<h3>');
				html.push('<p class="sv-link"><a class="button" href="#">清理Form表单</a></p>');
				html.push('<p class="sv-link"><a class="button" href="#">清理所有表单</a></p>');

				section.html(html.join(''));
			});		
		});
	}
});