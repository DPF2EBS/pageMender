//get dom nodes
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index),
			reloaded=0;
		win.subMenu.eq(index).click(function(){
			chrome.extension.sendMessage({from:'devtools', tabId:tabId,action:'get', getContent:['nodeTags','nodeLength']}, function(response) {
				var html=[],
					nodeData={
						'tagName':response.nodeTags
					};
				
				//get dom node success
				if(typeof response['nodeLength']!=='undefined'){
					html.push('<h3 class="right-topic">节点数共计：<strong>'+(response['nodeLength']||'waiting...')+'</strong>&nbsp;个 <select id="dom-order"><option value="tagName">节点名称排序</option><option value="tagNumber">节点数量排序</option></select></h3><div class="cont-wrap">');

					for(var key in response['nodeTags']){
						html.push('<a class="btns dom-tags"><span class="red-dot">' + response['nodeTags'][key] + '</span>' + key + '</a>');
					}

					html.push('</div>');
				//get no dom node
				}else{
					//refresh dom node data from background
					if(reloaded<1){
						html.push('<h3 class="right-topic">统计中...</h3>');
						reloaded++;
						setTimeout(function(){win.subMenu.eq(index).click();},1000);
					}else{
						html.push('<h3 class="right-topic">获取DOM节点失败！</h3>');
					}
				}
	
				section.html(html.join(''));

				section.find('#dom-order').change(function(){
					var orderHTML=[],
						data=nodeData.tagName;

					if(this.value==='tagNumber'){
						if(!nodeData.tagNumber){
							var keys=[],result={},dataTemp={};
							for(var k in data){
								if(result[data[k]]){
									result[data[k]].push(k);
								}else{
									keys.push(data[k]);
									result[data[k]]=[k];
								}
							}

							keys.sort(function(a,b){return a-b;});

							for(var i=0,L=keys.length;i<L;i++){
								dataTemp[keys[i]]=result[keys[i]];
							}
							nodeData.tagNumber=dataTemp;
						}

						data=nodeData.tagNumber;	
					}

					for(var key in data){
						if(this.value!=='tagNumber'){
							orderHTML.push('<a class="btns dom-tags"><span class="red-dot">' + data[key] + '</span>' + key + '</a>');
						}else{
							data[key].forEach(function(item){
								orderHTML.push('<a class="btns dom-tags"><span class="red-dot">' + key + '</span>' + item + '</a>');
							});
						}					
					}

					section.find('div.cont-wrap').html(orderHTML.join(''));
				});
			});
		});
	}
});