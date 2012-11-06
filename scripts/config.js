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
					"name":"请求数",
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
					"module":"ajaxTester"
				},
				{
					"name":"标准验证",
					"module":"standardValidator"
				},
				{
					"name":"统计检查",
					"module":"GAValidator"
				},
				{
					"name":"压缩检查",
					"module":"compressCheck"
				},
				{
					"name":"表单清除",
					"module":"clearForm"
				}
			]
		},
		{
			"name":"自动工具",
			"submenu":[
				{
					"name":"自动刷新",
					"module":"autoReload"
				}
			]
		},
		
		{
		  "name": "关于",
		  "submenu":[
			{
				"name":"插件简介",
				"contentHTML":'<p class="main-title">欢迎您使用PageMender 1.1版本!</p><p class="main-intro">项目一期主要包含页面分析工具和系统工具，您可以利用它分析页面的一些基本特征，<br/>并且可以更加便捷地操作Chrome浏览器的一些默认设置，方便我们的测试和工作。<br/></p>'
			},
			{
				"name":"联系我们",
				"contentHTML":'<p class="main-title">开发者：王鑫威（主开发），李永亮（UI设计）</p><p class="main-intro">可以通过Email与我们联系:<br /><a href="mailto:wxwdesign@dianping.com">程序BUG</a><br /><a href="mailto:yongliang.li@dianping.com">UI问题</a></p>'
			}
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