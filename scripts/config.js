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
					"contentHTML":'<div class="center"> <ul class="cache-clear"> <li> <label for="">URL地址：<input type="text" name="" id="" value="http://www.baidu.com/"/></label> <label for="">发送方式：<select><option value="GET">GET</option><option value="POST">POST</option></select></label> </li> <li> <label for="">数据：<input type="text" name="" id="" value="name=\"abc\""/></label><button class="button cache-btn">加载</button> </li> <li>请求结果：</li> <li><p>这里是结果</p><textarea>Http Response</textarea></li> </ul> </div>'
				},
				{
					"name":"标准验证",
					"module":"standardValidator"
				},
				{
					"name":"统计检查",
					"module":"GAValidator",
					"contentHTML":'<dl> <dt>GA</dt> <dd> <p>GA_POST_OK</p> <p>GA_GET_OK</p> <p>GA_test</p> <p>GA_waiting</p> </dd> <dt>Hippo</dt> <dd> <p>HI_POST_OK</p> <p>HI_GET_OK</p> <p>HI_test</p> <p>HI_waiting</p> </dd> </dl>'
				},
				{
					"name":"压缩检查",
					"disabled":true,
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
				"contentHTML":'<div class="center"><br/><p class="main-title">欢迎您使用PageMender 1.1版本!</p><p class="main-intro">项目一期主要包含页面分析工具和系统工具，您可以利用它分析页面的一些基本特征，<br/>并且可以更加便捷地操作Chrome浏览器的一些默认设置，方便我们的测试和工作。<br/></p></div>'
			},
			{
				"name":"联系我们",
				"contentHTML":'<div class="center"><br /><p class="main-intro">可以通过Email与我们联系:<br /><a href="mailto:wxwdesign@dianping.com">程序BUG(wxwdesign@dianping.com)</a><br /><a href="mailto:yongliang.li@dianping.com">UI问题(yongliang.li@dianping.com)</a></p></div>'
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