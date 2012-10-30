//get requests
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);
		win.subMenu.eq(index).click(function(e){
		e.preventDefault();

			chrome.devtools.inspectedWindow.getResources(function(resources){						
				var count=resources.length,
                    R,
                    res={},
                    html=[],
                    documentHtml = '', di = 0,
                    scriptHtml = '', si = 0,
                    styleHtml = '', sj = 0,
                    otherHtml = '', oi = 0,
                    imageHtml = '', ii = 0,
                    resHTML=[];
				for(var i=0;i<count;i++){
					R = resources[i];
					if (/^chrome/.test(R.url) || (R.url.indexOf(":") < 0 )) { continue; }
					!res[R.type] ? (res[R.type] = 1) : res[R.type]++;
                    switch(R.type) {
                        case 'document':
                            documentHtml += '<p><span class="index">(' + (++di) + ')</span><span class="document">[document]</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                        case 'script':
                            scriptHtml += '<p><span class="index">(' + (++si) + ')</span><span class="script">[script]</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                        case 'stylesheet':
                            styleHtml += '<p><span class="index">(' + (++sj) + ')</span><span class="stylesheet">[stylesheet]</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                        case 'image':
                            imageHtml += '<p><span class="index">(' + (++ii) + ')</span><span class="image">[image]</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                        case 'other':
                            otherHtml += '<p><span class="index">(' + (++oi) + ')</span><span class="other">[other]</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                    }
				}
                html.push(('<div class="com document-block">' + documentHtml + '</div>') || '');
                html.push(('<div class="com css-block">' + styleHtml + '</div>') || '');
                html.push(('<div class="com js-block">' + scriptHtml + '</div>') || '');
                html.push(('<div class="com img-block">' + imageHtml + '</div>') || '');
                html.push(('<div class="com other-block">' + otherHtml + '</div>') || '');

				// resource types and count
				for(var key in res){
					resHTML.push('<span class="b">' + res[key] + '</span>～<span class="'+ key +'">' + key + '</span>');
				}

				html=["<h3 class='right-topic'>网络请求数：" + resources.length + '个&nbsp;&nbsp;「' + resHTML.join('， ') + '」</h3>'].concat(html);

				section.html(html.join(''));
			});
		});
	}
});