//get standard validation
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index);
						
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'get',getContent:['tabURL']}, function(response) {
				chrome.devtools.inspectedWindow.getResources(function(resources){
					var html=[],gaList={};
					html.push('<h3 class="right-topic">GA/Hippo统计代码<a class="button button-cookie-add search-ga" href="#">查找GA</a><a class="button button-cookie-add export-download" href="#">导出GA</a><h3>');

					//each resources
					resources.forEach(function(R){
						if((R.type==='document'&&response.tabURL.indexOf(R.url)!==-1)||(R.type==='script'&&/\w+\.\w+/.test(R.url)&&!/^chrome/.test(R.url))){
							R.getContent(function(content){
								var r=content.match(/pageTracker\._trackPageview\(.+?\)/g), //GA normal
									r2=content.match(/track=".+?"/g), //GA attribute

									r3=content.match(/try\{(document\.)?hippo((\.\w+)?\(.+?\))\}/g),	//Hippo in header
									r4=content.match(/(document\.)?hippo((\.\w+)?\(.+?\))+/g); //Hippo normal

								if((r&&r.length>0)||(r2&&r2.length>0)||(r3&&r3.length>0)||(r4&&r4.length>0)){
									if(r2&&r2.length>0){r=r.concat(r2);}
									if(r3&&r3.length>0){
										r=r.concat(r3);

										//remove duplicated matches
										r3.forEach(function(){
											r4.shift();
										});
									}
									if(r4&&r4.length>0){r=r.concat(r4);}
									gaList[R.url]=r;

									html.push('<br/><div class="com"><p><span class="index">[URL]</span>&nbsp;<a href="'+R.url+'" target="_blank">'+R.url+'</a></p>');
									r.forEach(function(re,index){
										//re.replace(/pageTracker\._trackPageview\('|'\)/g,'');
										html.push('<p class="ga-item"><span class="index">('+(index+1)+')</span>'+re+'</p>');
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

						section.find('.search-ga').unbind().click(function(e){
							e.preventDefault();
							chrome.extension.sendMessage({from:'devtools',tabId:tabId,action:'set',settingsConfig:{
								target:'ga',
								data:{'ga':html}
							}});
						});

						//export GA and Hippo
						window.URL = window.webkitURL || window.URL;
						window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
						var bb = new BlobBuilder();
			        		bb.append(JSON.stringify(gaList));
						section.find('.export-download').attr('download',"GA-"+tabId+'.txt').attr('href',window.URL.createObjectURL(bb.getBlob('text/plain')));
					},500);
				});
			});
		});
	}
});