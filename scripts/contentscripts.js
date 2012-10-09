(function(){
	var pageLoadTime={
			'domStart':0,
			'domReady':0,		
			'loaded':0	
		},
		allElements;
	pageLoadTime["domStart"]=new Date().getTime();

	//reset page info
	sendMessage({
		'from':'contentscript',
		'data':{
			'domReadyTime':0,
    		'loadTime':0,
			'nodeTags':0,
			'nodeLength':0,
			'tabURL':window.location.href,
			'domain':window.location.host
		}
	});	

	window.document.addEventListener('DOMContentLoaded',function(){
		pageLoadTime["domReady"]=new Date().getTime();

		allElements=document.getElementsByTagName('*');

		sendMessage({
			'from':'contentscript',
			'data':{
				'domReadyTime':(pageLoadTime["domReady"]-pageLoadTime["domStart"])/1000,
				'nodeTags':getDomNodes(),
				'nodeLength':allElements.length
			}
		});
	});

	window.addEventListener('load',function(){
		pageLoadTime.loaded=new Date().getTime();

		sendMessage({
			'from':'contentscript',
			'data':{
				'loadTime':(pageLoadTime["loaded"]-pageLoadTime["domStart"])/1000
			}
		});
	});

	function sendMessage(message){
		chrome.extension.sendMessage(message/*, function(response) {
  			// console.log('response from->', response.from);
		}*/);
	}


	function getDomNodes(){
		var nodeTag={},
			nodeTagArray=[],
			tagResult={};

		// console.log('DOM节点总数：', allElements.length);

		//count all tag numbers
		for(var i=0,L=allElements.length;i<L;i++){
			if(nodeTag[allElements[i].tagName]){
				nodeTag[allElements[i].tagName]++;
			}else{
				nodeTag[allElements[i].tagName]=1;
				nodeTagArray.push(allElements[i].tagName);
			}
		}

		//show tagName and count
		nodeTagArray.sort();
		for(var i=0,L=nodeTagArray.length;i<L;i++){
			// console.log(nodeTagArray[i], nodeTag[nodeTagArray[i]]);
			tagResult[nodeTagArray[i].toLowerCase()]=nodeTag[nodeTagArray[i]];
		}

		return tagResult;
	}
})();