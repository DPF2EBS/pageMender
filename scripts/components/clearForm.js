//get standard validation
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index)
			buttons=section.find('a.button');

		buttons.click(function(){
			chrome.extension.sendMessage(
				{
					from:'devtools',
					action:'clear',
					tabId:tabId,
					clearConfig:{
						type:'form',
						clearData:[this.rel]
            		}
            	},
            	function(response) {
					alert(response);
				}
			);			
		});
	}
});