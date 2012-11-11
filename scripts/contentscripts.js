(function(){
	var pageLoadTime={},
		allElements;

	pageLoadTime.domStart=new Date().getTime();

	window.document.addEventListener('DOMContentLoaded',function(){
		pageLoadTime.domReady=new Date().getTime();

		allElements=document.getElementsByTagName('*');

		sendMessage({
			'from':'contentscript',
			'data':{
				'domain':window.location.host,
				'domReadyTime':(pageLoadTime.domReady-pageLoadTime.domStart)/1000,
				'nodeTags':getDomNodes(allElements),
				'nodeLength':allElements.length
			}
		});
	});

	window.addEventListener('load',function(){
		pageLoadTime.loaded=new Date().getTime();

		sendMessage({
			'from':'contentscript',
			'data':{
				'loadTime':(pageLoadTime.loaded-pageLoadTime.domStart)/1000
			}
		});
	});

	function sendMessage(message){
		chrome.extension.sendMessage(message, function(response) {
  			// console.log('response from->', response.from);
  			if (chrome.extension.lastError) {
        		console.log('Error: ' + chrome.extension.lastError.message);
      		}
		});
	}
})();

function getDomNodes(allElements){
		var nodeTag={},
			nodeTagArray=[],
			tagResult={};

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
			tagResult[nodeTagArray[i].toLowerCase()]=nodeTag[nodeTagArray[i]];
		}

		return tagResult;
}


//content process
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(request);
	if(request.from==='background'){
        var returnBack;
        switch(request.action){
            case 'disable':
                returnBack=contentAction.disable(sendResponse,{value:request.value});
            break;
            case 'get':
            	returnBack=contentAction.getContent(sendResponse,request.getContent);
            break;
            case 'clear':
            	returnBack=contentAction.clearContent(sendResponse,request.clearContent);
            break;
        }

        if(returnBack===true){
            return true;
        }
    }
});

var contentAction={
	disable:function(sendResponse,disableConfig){
		var styles=document.styleSheets;
		for(var i=0,L=styles.length;i<L;i++){
			styles[i].disabled=disableConfig.value;
		}
		sendResponse({disabled:true});
	},
	getContent:function(sendResponse,arrayGet){
		if(arrayGet[0]==='dom'){
			var allElements=document.getElementsByTagName('*');
			sendResponse({
				'from':'contentscript',
				'data':{
					'nodeTags':getDomNodes(allElements),
					'nodeLength':allElements.length
				}
			});
			return true;
		}
	},
	clearContent:function(sendResponse,arrayClear){
		switch(arrayClear[0]){
			case 'allInput':
				var	i=document.getElementsByTagName("input"),
					t=document.getElementsByTagName("textarea");
				Array.prototype.forEach.call(i,function(element){
					if(element.type==='text'||element.type==='password'){
						element.value='';
					}
				});
				Array.prototype.forEach.call(t,function(element){
					element.value='';
				});
			break;
			case 'formInput':
				var f=document.getElementsByTagName("form"),
					i,t;
				Array.prototype.forEach.call(f,function(ef){
					i=ef.getElementsByTagName("input"),
					t=ef.getElementsByTagName("textarea");
					Array.prototype.forEach.call(i,function(element){
						if(element.type==='text'||element.type==='password'){
							element.value='';
						}
					});
					Array.prototype.forEach.call(t,function(element){
						element.value='';
					});
				});
			break;
		}
	}
};