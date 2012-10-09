var contentData={},k=0;

function saveContentData(data){
    if(typeof data==='undefined'){return;}

    if(typeof data==='object'){
        for(var key in data){
            contentData[key]=data[key];
        }
    }
}

/**communicate with other pages*/
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.from==='contentscript'){
        saveContentData(request.data);
        sendResponse({from: "background.js"});        
    }else if(request.from==='devtools'){
        var data={};

        if(request.get[0]==='cookies'){
            chrome.cookies.getAll({'domain':contentData['domain']}, function (cookies) {
                sendResponse(cookies);
            });

            return true;
        }else if(request.clean){
            chrome.browsingData.remove(
                {
                    "since": request.since
                }, 
                {
                    "cache": true
                }, 
                function(){
                    sendResponse('finished');            
                }
            );            
            return true;
        }else if(request.open){
            chrome.tabs.create({url:request.open[0],active:true});
            return true;
        }      

        for(var i=0,L=request.get.length;i<L;i++){
            data[request.get[i]]=contentData[request.get[i]];
        }

        sendResponse(data);
    }else{
        sendResponse({from: "background.js"});
    } 
});