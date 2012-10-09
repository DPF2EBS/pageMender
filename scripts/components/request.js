//get requests
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(e){
		e.preventDefault();

			chrome.devtools.inspectedWindow.getResources(function(resources){						
				var count=resources.length,R,res={},html=[],resHTML=[];					

				for(var i=0;i<count;i++){
					R=resources[i];
					if(/^chrome/.test(R.url)||R.url.indexOf(":")<0){continue;}
					if(!res[R.type]){res[R.type]=1;}else{res[R.type]++;}
					html.push('<p>'+(i+1)+":", '<span class="'+R.type+'">['+R.type+']</span>=><a href="'+R.url+'" target="_blank">'+R.url+'</a></p>');
	
					/*if(R.type=='document'){
						R.getContent(function(re){
							alert(re.constructor);
							// string html content
						});
					}*/
				}

				//resource types and count
				for(var key in res){
					resHTML.push('<span class="'+key+'">'+key+'</span>:<span class="b">'+res[key]+'</span>');
				}

				html=["<h3>网络请求数："+resources.length+'('+resHTML.join(', ')+')</h3>'].concat(html);

				section.html(html.join(''));
			});
		});
	}
});