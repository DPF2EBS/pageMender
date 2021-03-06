var config={	
	data:[
		//version 1.0 features
		{
			"name":"页面分析",
			"submenu":[
				{
					"name":"DOM节点",
					"module":"dom"
				},
				{
					"name":"页面资源",
					"module":"request"
				},
				{
					"name":"加载时间",
					"module":"loadTime"
				}
			]
		},
		{
			"name":"系统工具",
			"submenu":[
				{
					"name":"Cookies管理",
					"module":"cookies"
				},
				{
					"name":"缓存控制",
					"module":"cache",
					"contentHTML":'<div class="center">\
					<a class="button btn cache-link" href="#">清理所有缓存</a>\
					<a class="button link cache-link" href="chrome://cache" target="_blank">查看缓存</a>\
					<a class="button link cache-link" href="chrome://chrome/settings/clearBrowserData" target="_blank">更多选项</a>\
					<div class="cache-clear"><select name="" id="" class="Hide">\
						<option value="26280">所有</option>\
						<option value="1">过去一小时</option><option value="24">最近一天</option><option value="168">最近一周</option>\
						<option value="672">最近四周</option></select>\
						<button class="button cache-btn Hide">清理缓存</button>\
						<p class="c-orange" style="font-size:14px;"></p>\
					</div>\
					</div>'
				},
				{
					"name":"代理设置",
					"module":"proxy",
                    "contentHTML":'<h3 class="right-topic">代理设置</h3>'
				},
				{
					"name":"脚本禁用",
					"module":"contentSettings"
				},
				{
					"name":"系统资源",
					"module":"systemLink",
					"contentHTML":'<h3 class="right-topic">系统资源</h3><div class="center">\
						<p class="main-intro">\
							<a class="button" target="_blank" href="chrome://chrome/extensions/">扩展程序</a>\
							<a class="button" target="_blank" href="chrome://chrome/history/">历史记录</a>\
							<a class="button" target="_blank" href="chrome://downloads/">下载内容</a>\
							<a class="button" target="_blank" href="chrome://bookmarks/">书签管理</a>\
							<a class="button" target="_blank" href="chrome://chrome/settings/">系统设置</a>\
							<a class="button" target="_blank" href="chrome://net-internals/">网络信息</a>\
							<a class="button" target="_blank" href="chrome://memory-redirect/">内存信息</a>\
							<a class="button" target="_blank" href="chrome://dns/">路由信息</a>\
							<a class="button" target="_blank" href="chrome://plugins/">插件设置</a>\
							<a class="button" target="_blank" href="chrome://sync/">同步信息</a>\
							<a class="button" target="_blank" href="chrome://histograms/">直方图</a>\
							<a class="button" target="_blank" href="chrome://flags/">实验功能</a>\
							<a class="button" target="_blank" href="chrome://about/">关于</a>\
						</p>\
					</div>'
				}
			]
		},
		
		//version 2.0 features
		{
			"name":"测试工具",
			"submenu":[
				{
					"name":"Ajax测试",
					"module":"ajaxTester",
					"contentHTML":'<h3 class="right-topic">Ajax测试</h3>\
					<div class="ajax-wrap btns">\
						<ul class="ajax-list">\
							<li><label for="">传递数据:</label><textarea cols="60" rows="2" placeholder="JSON数据格式{\'key\':\'value\'}"></textarea></li>\
							<li><label for="">发送方式:</label><select><option value="GET">GET</option><option value="POST">POST</option></select>&nbsp;&nbsp;&nbsp;&nbsp;<label for="">URL地址:</label><input type="text" name="" id="" value="" placeholder="URL Address"/><button class="ajax-btn">加载数据</button><span class="c-orange" id="result-status"></span></li>\
							<li><label for="">请求结果:</label><textarea cols="60" rows="6" placeholder="Ajax请求结果"></textarea></li>\
						</ul>\
					</div>'
				},
				{
					"name":"标准验证",
					"module":"standardValidator"
				},
				{
					"name":"GA检查",
					"module":"GAValidator",
					"contentHTML":'<h3 class="right-topic">GA/Hippo统计代码</h3><br/><div class="com"><p><span class="index"></span>加载中...</p></div>'
				},
				{
					"name":"压缩检查",
					"module":"compressCheck"
				},
				{
					"name":"表单清除",
					"module":"clearForm",
					"contentHTML":'<h3 class="right-topic">表单清理</h3><div class="clear-form"><p class="sv-link"><a class="button" href="#" rel="formInput">清理Form表单</a></p><p class="sv-link"><a class="button" href="#" rel="allInput">清理所有表单</a></p></div>'
				}
			]
		},
		{
			"name":"自动工具",
			"submenu":[
				{
					"name":"自动刷新",
					"module":"autoReload",
					"contentHTML":'<div class="center">\
					<ul class="btns auto-reload">\
						<li><label for="">间隔时间:&nbsp;<input type="text" name="" id="" value="3"/>&nbsp;秒</label></li>\
						<li><label for="">循环次数:&nbsp;<input type="text" name="" id="" value="5"/>&nbsp;次</label></li>\
						<li><button class="button" style="margin:0px;">开始刷新</button></li>\
						<li class="last"><p class="c-orange" style="font-size:14px;"></p></li>\
					</ul></div>'

				}
			]
		},
		
		{
		  "name": "关于",
		  "submenu":[
			{
				"name":"插件简介",
				"contentHTML":'<h3 class="right-topic">插件简介</h3><div class="center info btns">\
					<p class="main-intro">PageMender由点评前端团队开发，它包含了一系列的页面分析和测试工具。功能选择主要面向[前端开发、QA、后端开发人员]，非常欢迎非技术人员也试用我们的插件。希望我们的努力能给您的工作提供方便，感谢您的支持！<br/>\
					</p></div>'
			},
			{
				"name":"联系我们",
				"contentHTML":'<h3 class="right-topic">联系我们</h3><div class="center"><br /><p class="main-intro">如果您在使用中有什么问题，可以通过Email与我们联系:<br /><a class="button" href="http://mail.google.com/mail/?view=cm&fs=1&to=xinwei.wang@dianping.com&su=pageMender-Bug&body=&ui=2" target="_blank">程序BUG(xinwei.wang@dianping.com)</a><br /><a class="button" href="http://mail.google.com/mail/?view=cm&fs=1&to=yongliang.li@dianping.com&su=pageMender-UI-Bug&body=&cc=xinwei.wang@diang.com&ui=2" target="_blank">UI界面问题(yongliang.li@dianping.com)</a></p></div>'
			},
			{
				"name":"前端资源",
				"contentHTML":'<h3 class="right-topic">前端资源</h3><div class="center">\
					<p class="main-intro">\
						<a class="button" target="_blank" href="http://f2e.dp/">F2E Wiki</a>\
						<a class="button" target="_blank" href="http://f2e.dp:8011/">NPW</a>\
						<a class="button" target="_blank" href="http://venus.dp/site/">Chart(Venus)</a>\
						<a class="button" target="_blank" href="http://f2e.dp/face">Face</a>\
						<a class="button" target="_blank" href="http://f2e.dp/blog/">Blog</a>\
						<a class="button" target="_blank" href="http://zuji.dianpingoa.com/">足迹</a>\
						<a class="button" target="_blank" href="http://f2e.dp/face/open">Lab</a>\
						<a class="button" target="_blank" href="http://jstest.dianpingoa.com/">TestSwarm</a>\
					</p>\
				</div>'
			}
		  ]
		},

		{
			"name":"其它[实验]",
			"dataType":1,
			"submenu":[
				{
					"name":"桌面提醒",
					"disabled":true
				},
				{
					"name":"语音功能",
					"disabled":true
				}
			]
		}
	],

	//get config data
	getData:function(){
		var d=JSON.parse(localStorage.pageMenderConfig||"{}"),
			result;

		if(!d.data){
			result=this.data;
		}else{
			result=d.data;
		}

		return result;
	},

	//set config data
	setData:function(data){
		var bg=chrome.extension.getBackgroundPage();

		localStorage.pageMenderConfig=JSON.stringify(data);
		var other=data.data[data.data.length-1].submenu;
		if(other[0].disabled===false){
			localStorage.pageMenderNotifications='open';
			bg.contentData.notice=true;
		}else{
			localStorage.removeItem("pageMenderNotifications");
			delete bg.contentData.notice;
		}

		if(other[1].disabled===false){
			localStorage.pageMenderVoice='open';
			bg.contentData.voice=true;
		}else{
			localStorage.removeItem("pageMenderVoice");
			delete bg.contentData.voice;
		}
    }
};