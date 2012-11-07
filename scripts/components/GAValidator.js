//get standard validation
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index);
						
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'get',getContent:['tabURL']}, function(response) {
				chrome.devtools.inspectedWindow.getResources(function(resources){
					var html=[];
					html.push('<h3 class="right-topic">GA统计代码<h3>');

					//each resources
					resources.forEach(function(R){
						if((R.type==='document'&&response.tabURL.indexOf(R.url)!==-1)||(R.type==='script'&&/\w+\.\w+/.test(R.url)&&!/^chrome/.test(R.url))){
							R.getContent(function(content){
								var r=content.match(/pageTracker\._trackPageview\(.+?\)/g);
								if(r&&r.length>0){
									html.push('<br/><div class="com"><p><span class="index">[URL]</span><a href="'+R.url+'" target="_blank">'+R.url+'</a></p>');
									r.forEach(function(re,index){
										//re.replace(/pageTracker\._trackPageview\('|'\)/g,'');
										html.push('<p><span class="index">('+(index+1)+')</span>'+re+'</p>');
									});
									html.push("</div>");
								}
							});
						}
					});

					setTimeout(function(){
						if(html.length<2){
							html.push('<br/><div class="com"><p><span class="index"></span>没有找到GA统计代码</p></div>');
						}
						section.html(html.join(''));
					},500);
				});
			});
		});
	}
});