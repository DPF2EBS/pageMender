//get standard validation
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',action:'get',getContent:['tabURL']}, function(response) {
				var html=[];
                html.push('<h3 class="right-topic">脚本禁用<h3>');
				html.push('<p class="sv-link"><a class="btn orange" href="http://jigsaw.w3.org/css-validator/validator?profile=css3&warning=0&uri='+response.tabURL+'" target="_blank">CSS Validator</a></p>');
				html.push('<p class="sv-link"><a class="btn orange" href="http://validator.w3.org/check?uri='+response.tabURL+'" target="_blank">HTML Validator</a></p>');

				section.html(html.join(''));
			});		
		});
	}
});