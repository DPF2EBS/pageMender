(function(){
	if(!chrome.devtools||!chrome.devtools.panels){
		alert("Sorry, pageMender cann't run in your browser!");
		return false;
	}

	if(config.debug){
		localStorage.pageMenderDebug=1;
	}else{
		localStorage.pageMenderDebug=0;
	}

	//create "PageMender" panel
	chrome.devtools.panels.create("PageMender", "icons/DPTools-dev.png", "pages/devtoolPanel.html", function(panel, info) {
		//bind events handler
		panel.onShown.addListener(function(win) {
			//get current tabId
			var tabId=chrome.devtools.inspectedWindow.tabId;
					
			//create menu
			var menuData=config.data;
			if(!menuData||menuData.constructor!==Array){return false;}

			var menuHTML=['<dl class="item-lists">'],sectionHTML=[],subM,components=[];
			for(var i=0,L=menuData.length;i<L;i++){
				if(!menuData[i]["disabled"]){
					menuHTML.push('<dt><i class="arrow-right"></i>'+menuData[i]["name"]+'</dt><dd><ul>');
					subM=menuData[i]["submenu"];
					if(subM&&subM.constructor===Array){
						for(var j=0,LL=subM.length;j<LL;j++){
							if(!subM[j]["disabled"]){
								subM[j]["module"]&&components.push(subM[j]["module"]);
								menuHTML.push('<li><a href="#">'+subM[j]["name"]+'</a></li>');
								sectionHTML.push('<section>'+(subM[j]["contentHTML"]||subM[j]["name"])+'</section>');
							}
						}
					}
					menuHTML.push('</ul></dd>');
				}
			}
			menuHTML.push('</dl>');
			win.jQuery('aside').eq(0).html(menuHTML.join(''));
			win.introPage.after(sectionHTML.join(''));

			win.bindEvents();

			seajs.config({
				base:'../scripts/components/'
			});

			seajs.use(components, function(){
				for(var i=0,L=arguments.length;i<L;i++){
					if(arguments[i].constructor===Function){
						arguments[i](win,i,tabId);
					}					
				}
			});
		});
	});
})();