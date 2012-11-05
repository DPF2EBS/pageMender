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
				var count=resources.length,
                    resourcesCount=0,
                    R,
                    res={},
                    html=[]
                    htmlCom=[];

				for(var i=0;i<count;i++){
					R = resources[i];
					if (/^chrome/.test(R.url) || (R.url.indexOf(":") < 0 )) { continue; }
                    resourcesCount++;

                    if(!res[R.type]){
                    	res[R.type] = 1;
                    	resData[R.type].html=[];
                    }else{
                    	res[R.type]++;
                    }
					resData[R.type].html.push('<p><span class="index">('+res[R.type]+')</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>');
				}

				html.push("<h3 class='right-topic'>网络请求数：<strong>" + resourcesCount + '</strong>&nbsp;个</h3>');
                html.push('<div class="center">');
                html.push('<a title="点击查看全部详情" class="button req-inner-link"><span class="b font14">' + resourcesCount + '</span>&nbsp;|&nbsp;<span>所有</span></a>');
                for(var key in resData) {
                	if(!res[key]){continue;}
                	
                    html.push('<a title="点击查看' + key + '详情" class="button req-inner-link"><span class="b font14">' + res[key] + '</span>&nbsp;|&nbsp;<span class="'+ key +'">' + resData[key].name + '</span></a>');
                	
                	htmlCom.push('<div class="com">' + resData[key].html.join('') + '</div>');
                }
                html.push('</div>');
                html=html.concat(htmlCom);			

				section.html(html.join(''));

                var com=section.find("div.com"),
                    tabs=section.find("a.req-inner-link");
                tabs.each(function(index){
                    tabs.eq(index).click(function(){
                        if(index===0){
                            com.show();
                        }else{
                            com.hide();
                            com.eq(index-1).show();
                        }
                    });                    
                });
			});
		});
	}
});