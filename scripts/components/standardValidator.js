//get standard validation
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'get',getContent:['tabURL']}, function(response) {
				var html=[];
                html.push('<h3 class="right-topic">标准验证<h3>');
				html.push('<div class="standard-validator"><p class="sv-link"><a class="button" href="http://jigsaw.w3.org/css-validator/validator?profile=css3&warning=0&uri='+response.tabURL+'" target="_blank">CSS&nbsp;验证</a></p>');
				html.push('<p class="sv-link"><a class="button" href="http://validator.w3.org/check?uri='+response.tabURL+'" target="_blank">HTML&nbsp;验证</a></p></div>');

				section.html(html.join(''));
			});		
		});
	}
});