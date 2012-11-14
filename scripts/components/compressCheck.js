//get requests
define(function(require, exports, module) {
	return function(win,index,tabId){
		var section=win.sections.eq(index),
			resData={
				'document':{
					name:'文档'
				},
				'stylesheet':{
					name:'样式'
				},
				'script':{
					name:'脚本'
				},
				'image':{
					name:'图片'
				},			
				'xhr':{
					name:'异步'
				},				
				'other':{
					name:'其它'
				}
			};

		win.subMenu.eq(index).click(function(e){
		    e.preventDefault();

			chrome.devtools.inspectedWindow.getResources(function(resources){				
				var resourcesCount=0,
                    res={},
                    html=[]
                    htmlCom=[],
                    keyDom={};

                resources.forEach(function(R,index){
					if (/^chrome/.test(R.url) || (R.url.indexOf(":") < 0 ) || 'document|stylesheet|script'.indexOf(R.type)<0) {
						return false;
					}
                    resourcesCount++;

                    if(!res[R.type]){
                    	res[R.type] = 1;
                    	// resData[R.type].html=[];
                    }else{
                    	res[R.type]++;
                    }

                    R.getContent(function(content){
                    	// resData[R.type].html.push('<p><span class="index">('+res[R.type]+')</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>');
                    	com.eq(keyDom[R.type]).append('<p><span class="b '+(checkCompressed(content)?'c-green" >&nbsp;&radic;':'c-red" >&nbsp;&times;')+'</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>');
                    });
                });
						
				html.push("<h3 class='right-topic'>代码压缩检查</h3>");
	            html.push('<div class="center">');
	            html.push('<a title="点击查看全部详情" class="button req-inner-link"><span class="b font14">' + resourcesCount + '</span>&nbsp;|&nbsp;<span>所有</span></a>');
	            var currentKeyIndex=0;
	            for(var key in resData) {
	            	if(!res[key]){continue;}
	            	keyDom[key]=currentKeyIndex++;
	            	
	                html.push('<a title="点击查看' + key + '详情" class="button req-inner-link"><span class="b font14">' + res[key] + '</span>&nbsp;|&nbsp;<span class="'+ key +'">' + resData[key].name + '</span></a>');
	            	
	            	htmlCom.push('<div class="com"></div>');
	            }
	            html.push('</div>');
	            html=html.concat(htmlCom);

	            html.push('<p class="bottom-tips c-gray">&radic;:已压缩，&times;未压缩。本功能为实验项目，检查结果仅供参考。</p>');
				section.html(html.join(''));
	            var com=section.find("div.com"),
	                tabs=section.find("a.req-inner-link");
	            tabs.each(function(index){
	                tabs.eq(index).click(function(){
	                    if(index===0){
	                        com.slideDown();
	                    }else{
	                        com.slideUp();
	                        com.eq(index-1).slideDown();
	                    }
	                });
	            });
			});
		});
	}

	function checkCompressed(content){
		//newlines>2&&text.length/newlines>156 or newlines<2
		if(typeof content==='string'){
			var r=content.match(/[\r\n]/g),
				compressed=true;
			if(r&&r.length>2){
				compressed=content.length/r.length>150;
			}

			return compressed;
		}else{
			return false;
		}
	}
});