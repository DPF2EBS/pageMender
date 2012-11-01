//get requests
define(function(require, exports, module) {
	return function(win,index){
		var section=win.sections.eq(index);

        // 转化为汉字
        function transforHZ (E) {
            var HZ = '';
            switch (E) {
                case 'document':
                    HZ = '文档';
                    break;
                case 'script':
                    HZ = '脚本';
                    break;
                case 'stylesheet':
                    HZ = '样式';
                    break;
                case 'xhr':
                    HZ = '异步';
                    break;
                case 'image':
                    HZ = '图片';
                    break;
                case 'other':
                    HZ = '其它';
                    break;
            }
            return HZ;
        }

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
                    xhrHtml = '', xi = 0,
                    otherHtml = '', oi = 0,
                    imageHtml = '', ii = 0;

				for(var i=0;i<count;i++){
					R = resources[i];
					if (/^chrome/.test(R.url) || (R.url.indexOf(":") < 0 )) { continue; }
					!res[R.type] ? (res[R.type] = 1) : res[R.type]++;
                    switch(R.type) {
                        case 'document':
                            documentHtml += '<p><span class="index">(' + (++di) + ')</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                        case 'script':
                            scriptHtml += '<p><span class="index">(' + (++si) + ')</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                        case 'stylesheet':
                            styleHtml += '<p><span class="index">(' + (++sj) + ')</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                        case 'image':
                            imageHtml += '<p><span class="index">(' + (++ii) + ')</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                        case 'xhr':
                            xhrHtml += '<p><span class="index">(' + (++xi) + ')</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                        case 'other':
                            otherHtml += '<p><span class="index">(' + (++oi) + ')</span><a href="' + R.url + '" target="_blank">' + R.url + '</a></p>';
                            break;
                    }
				}

                // resource types and count
                html.push('<div class="center">');
                for(var key in res) {
                    if (key == 'script') {
                        html.push('<a title="点击查看' + key + '详情" class="button req-inner-link active ' + key + '><span class="b font14">' + res[key] + '</span>&nbsp;|&nbsp;<span class="'+ key +'">' + transforHZ(key) + '</span></a>');
                    } else {
                        html.push('<a title="点击查看' + key + '详情" class="button req-inner-link ' + key + '><span class="b font14">' + res[key] + '</span>&nbsp;|&nbsp;<span class="'+ key +'">' + transforHZ(key) + '</span></a>');
                    }
                }
                html.push('</div>');
                html.push(('<div class="com Hide">' + documentHtml + '</div>') || '');
                html.push(('<div class="com Hide">' + styleHtml + '</div>') || '');
                html.push(('<div class="com">' + scriptHtml + '</div>') || '');
                html.push(('<div class="com Hide">' + imageHtml + '</div>') || '');
                html.push(('<div class="com Hide">' + xhrHtml + '</div>') || '');
                html.push(('<div class="com Hide">' + otherHtml + '</div>') || '');


				html=["<h3 class='right-topic'>网络请求数：<strong>" + resources.length + '</strong>&nbsp;个</h3>'].concat(html);

				section.html(html.join(''));

			});
		});


	}
});