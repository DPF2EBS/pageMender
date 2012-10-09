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
					"contentHTML":'<a href="chrome://cache" target="_blank">查看缓存</a> | <a href="chrome://chrome/settings/clearBrowserData" target="_blank">更多选项</a><br/><br/> <select name="" id=""> <option value="1">过去一小时</option> <option value="24">最近一天</option> <option value="168">最近一周</option> <option value="672">最近四周</option> </select> <button>清理缓存</button> <p></p>'
				},
				{
					"name":"代理设置",
					"module":"proxy"
				},
				{
					"name":"脚本禁用",
					"module":"standardValidator"
				}
			]
		},

		//version 2.0 features
		{
			"name":"测试工具",
			"disabled":true,
			"submenu":[
				{
					"name":"Ajax测试"
				},
				{
					"name":"标准验证"
				},
				{
					"name":"统计检查"
				},
				{
					"name":"压缩检查"
				},
				{
					"name":"表单清除"
				}
			]
		},
		{
			"name":"自动工具",
			"disabled":true,
			"submenu":[
				{
					"name":"自动刷新"
				}
			]
		}
	],

	//get config data
	getData:function(){

	},

	//set config data
	setData:function(){

	}
};