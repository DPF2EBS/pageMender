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
					<a class="button link cache-link" href="chrome://cache" target="_blank">查看缓存</a>\
					<a class="button link cache-link" href="chrome://chrome/settings/clearBrowserData" target="_blank">更多选项</a>\
					<a class="button btn cache-link" href="#">清理缓存</a>\
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
					<div class="ajax-wrap">\
						<ul class="ajax-list">\
							<li><label for="">传递数据:</label><textarea cols="60" rows="2" placeholder="JSON数据格式{\'key\':\'value\'}"></textarea></li>\
							<li><label for="">发送方式:</label><select><option value="GET">GET</option><option value="POST">POST</option></select>&nbsp;&nbsp;&nbsp;&nbsp;<label for="">URL地址:</label><input type="text" name="" id="" value="" placeholder="URL Address"/><button class="ajax-btn">加载数据</button></li>\
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
					"contentHTML":'<h3 class="right-topic">GA统计代码<h3><br/><div class="com"><p><span class="index"></span>加载中...</p></div>'
				},
				// {
				// 	"name":"压缩检查",
				// 	"disabled":true,
				// 	"module":"compressCheck"
				// },
				{
					"name":"表单清除",
					"module":"clearForm",
					"contentHTML":'<h3 class="right-topic">表单清理<h3><div class="clear-form"><p class="sv-link"><a class="button" href="#" rel="formInput">清理Form表单</a></p><p class="sv-link"><a class="button" href="#" rel="allInput">清理所有表单</a></p></div>'
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
						<li><button class="button cache-btn">开始刷新</button></li>\
						<li><p class="c-orange" style="font-size:14px;"></p></li>\
					</ul></div>'

				}
			]
		},
		
		{
		  "name": "关于",
		  "submenu":[
			{
				"name":"插件简介",
				"contentHTML":'<div class="center"><br/><p class="main-title">欢迎您使用PageMender 1.1版本!</p><p class="main-intro">PageMender由点评前端团队开发，它包含了一系列的页面分析和测试工具。<br/>功能选择主要面向[前端开发、QA、后端开发人员]，非常欢迎非技术人员也试用我们的插件。<br/>希望我们的努力能给您的工作提供方便，感谢您的支持！<br/><br/></p></div>'
			},
			{
				"name":"联系我们",
				"contentHTML":'<div class="center"><br /><p class="main-intro">如果您在使用中有什么问题，可以通过Email与我们联系:<br /><a class="btns" href="http://mail.google.com/mail/?view=cm&fs=1&to=xinwei.wang@dianping.com&su=pageMender-Bug&body=&ui=2" target="_blank">程序BUG(wxwdesign@dianping.com)</a><br /><a class="btns" href="http://mail.google.com/mail/?view=cm&fs=1&to=yongliang.li@dianping.com&su=pageMender-UI-Bug&body=&cc=xinwei.wang@diang.com&ui=2" target="_blank">UI界面问题(yongliang.li@dianping.com)</a></p></div>'
			},
			{
				"name":"前端资源",
				"contentHTML":'<div>\
					<p class="main-intro">\
						<a class="btns" href="http://f2e.dp/">F2E Wiki</a>\
						<a class="btns" target="_blank" href="http://f2e.dp:8011/">NPW</a>\
						<a class="btns" target="_blank" href="http://f2e.dp/face">Face</a>\
						<a class="btns" target="_blank" href="http://f2e.dp/blog/">Blog</a>\
						<a class="btns" target="_blank" href="http://zuji.dianpingoa.com/">足迹</a>\
						<a class="btns" target="_blank" href="http://f2e.dp/face/open">Lib</a>\
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