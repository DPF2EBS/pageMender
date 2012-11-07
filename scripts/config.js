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
					"contentHTML":'<div class="center"><a class="button cache-link" href="chrome://cache" target="_blank">查看缓存</a><a class="button cache-link" href="chrome://chrome/settings/clearBrowserData" target="_blank">更多选项</a><div class="cache-clear"><select name="" id=""> <option value="1">过去一小时</option> <option value="24">最近一天</option> <option value="168">最近一周</option> <option value="672">最近四周</option> </select> <button class="button cache-btn">清理缓存</button><p class="c-orange" style="font-size:14px;"></p></div></div>'
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
					<div class="btns ajax-wrap">\
						<ul class="ajax-list">\
							<li><label for="">发送方式:</label><select><option value="GET">GET</option><option value="POST">POST</option></select></li>\
							<li><label for="">URL地址:</label><input type="text" name="" id="" value="" placeholder="http://www.baidu.com"/></li>\
							<li><label for="">传递数据:</label><textarea cols="30" rows="4" placeholder="JSON Data eg:{key:value}"></textarea></li>\
							<li><button>加载数据</button></li>\
							<li><label for="">请求结果:</label><textarea cols="30" rows="4" placeholder="Ajax Response"></textarea></li>\
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
				{
					"name":"压缩检查",
					"disabled":true,
					"module":"compressCheck"
				},
				{
					"name":"表单清除",
					"module":"clearForm",
					"contentHTML":'<h3 class="right-topic">表单清理<h3><p class="sv-link"><a class="button" href="#" rel="formInput">清理Form表单</a></p><p class="sv-link"><a class="button" href="#" rel="allInput">清理所有表单</a></p>'
				}
			]
		},
		{
			"name":"自动工具",
			"submenu":[
				{
					"name":"自动刷新",
					"module":"autoReload",
					"contentHTML":'<div class="center"> <div class="cache-clear"><label for="">间隔时间：<input type="text" name="" id="" value="5"/>秒</label> <label for="">循环次数：<input type="text" name="" id="" value="10"/>次</label> <button class="button cache-btn">开始刷新</button> <p class="c-orange" style="font-size:14px;">已刷新0次</p> </div> </div>'

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
				"contentHTML":'<div class="center"><br /><p class="main-intro">如果您在使用中有什么问题，可以通过Email与我们联系:<br /><a href="mailto:wxwdesign@dianping.com">程序BUG(wxwdesign@dianping.com)</a><br /><a href="mailto:yongliang.li@dianping.com">UI界面问题(yongliang.li@dianping.com)</a></p></div>'
			},
		  ]
		},

		{
			"name":"其它",
			"dataType":1,
			"submenu":[
				{
					"name":"桌面提醒"
				},
				{
					"name":"语音功能"
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
		localStorage.pageMenderConfig=JSON.stringify(data);
	}
};