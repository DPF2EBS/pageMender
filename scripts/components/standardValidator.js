//get standard validation
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',get:['tabURL']}, function(response) {	
				var html=[];
                html.push('<h3 class="right-topic">脚本禁用<h3>');
				html.push('<p>CSS Validator=&gt;<a href="http://jigsaw.w3.org/css-validator/validator?profile=css3&warning=0&uri='+response.tabURL+'" target="_blank">Click Here</a></p>');
				html.push('<p>HTML Validator=&gt;<a href="http://validator.w3.org/check?uri='+response.tabURL+'" target="_blank">Click Here</a></p>');

				section.html(html.join(''));
			});		
		});
	}
});