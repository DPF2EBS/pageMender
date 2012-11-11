//get standard validation
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index),
			buttons,inputs,selects,textarea,
			init=false,
			ajaxLoading=false;

		
		win.subMenu.eq(index).click(function(){
			if(!init){
				buttons=section.find('button');
				inputs=section.find('input');
				selects=section.find('select');
				textarea=section.find('textarea');

				buttons.eq(0).click(function(){
					if(ajaxLoading){return false;}

					var d={},
						url=inputs.eq(0).val();
					if(!/\w+\.\w+/.test(url)){
						textarea.eq(1).val("请填写正确的URL地址");
						inputs.eq(0).focus();
						return false;
					}else if(!/^(http:\/\/|https:\/\/)/.test(url)){
						inputs.eq(0).val('http://'+url);
					}

					if(textarea.eq(0).val()!==''){
						try{
							d=JSON.parse(textarea.eq(0).val());

							for(var key in d){
								d[key]=encodeURIComponent(d[key]);
							}
						}catch(err){
							textarea.eq(1).val("JSON数据填写不正确");
							textarea.eq(0).focus();
							return false;
						}
					}

					buttons.eq(0).attr('disabled',true);
					textarea.eq(1).val('数据加载中...');
					ajaxLoading=true;

					chrome.extension.sendMessage(
						{
							from:'devtools',
							action:'ajax',
							ajaxConfig:{
				            	url:inputs.eq(0).val(),
				            	method:selects.eq(0).val(),
				            	data:d,
				            	sync:true
				        	}
		            	},
		            	function(response) {
		            		ajaxLoading=false;
							textarea.eq(1).val(response);
							buttons.eq(0).attr('disabled',false);
						}
					);
				});
			}
		});
	}
});