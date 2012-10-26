var contentData={};

function saveContentData(data){
    if(typeof data==='undefined'){return;}

    if(typeof data==='object'){
        for(var key in data){
            contentData[key]=data[key];
        }
    }
}

//check extension error
function checkExtensionError(){
    if (chrome.extension.lastError) {
        console.error('Error: ' + chrome.extension.lastError.message);
    }
}

/**communicate with other pages*/
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    //request from content script
    if(request.from==='contentscript'){
        saveContentData(request.data);
        // sendResponse({from: "background"});

    //request from devtools             
    }else if(request.from==='devtools'){
        var returnBack;
        switch(request.action){
            case 'get':
                returnBack=devtoolsAction.getContent(sendResponse,request.getContent);
            break;
            case 'clean':
                returnBack=devtoolsAction.cleanCache(sendResponse,request.cleanConfig);
            break;
            case 'open':
                returnBack=devtoolsAction.openURL(sendResponse,request.openConfig);
            break;
            case 'reload':
                returnBack=devtoolsAction.reload(sendResponse,request.reloadConfig);
            break;
            case 'contentSettings':
                returnBack=devtoolsAction.contentSet(sendResponse,request.settingsConfig);
            break;
        }

        if(returnBack===true){
            return true;
        }

    //others
    }else{
        sendResponse({from: "background"});
    } 
});

//devtools get content
var devtoolsAction={
    //get contents
    getContent:function(sendResponse,arrayGet){
        if(arrayGet&&arrayGet[0]==='cookies'){
            chrome.cookies.getAll({url:contentData.tabURL}, function (cookies) {
                console.log(cookies);
                sendResponse(cookies);
            });
            return true;
        }        

        if(contentData.tabURL!==contentData.dataURL){
            sendResponse({});
            return true;
        }
        
        var data={};
        arrayGet.forEach(function(element,index){
            data[element]=contentData[element];
        });
        sendResponse(data);
    },

    //clear cache
    cleanCache:function(sendResponse,objConfig){
        chrome.browsingData.remove(objConfig.removeOptions,objConfig.removeData,function(){
            checkExtensionError();
            sendResponse('finished');         
        });
        return true;
    },

    //open new tab
    openURL:function(sendResponse,objConfig){
        chrome.tabs.create(objConfig);
    },

    //contentSettings
    contentSet:function(sendResponse,settingsConfig){
        var settings={},
            method=settingsConfig.method,
            opt=settingsConfig.options,
            lastElement=settingsConfig.type.length-1;

        if(contentData['tabURL']){
            if(method==='get'){
                opt.primaryUrl=contentData['tabURL'];
            }          
        }

        // console.log(settingsConfig,opt.primaryUrl);
        settingsConfig.type.forEach(function(element,index){
            //styleSheets
            if(element==='styleSheets'){
                if(method==='get'){
                    settings[element]={setting:'allow'};
                }else if(method==='set'){
                    chrome.tabs.sendMessage(contentData.tab.tabId, {from:'background',action:'disable',value:opt.setting==='block'?true:false}, function(response){
                        // console.log(response);
                        checkExtensionError();
                    });
                }         
            }else{
                //['javascript','images','cookies','notifications','popups','plugins'];
                chrome.contentSettings[element][method](opt, function(result){
                    checkExtensionError();

                    settings[element]=result;
                    if(lastElement===index){
                        if(method==='get'){
                            sendResponse(settings);
                        }else if(method=='set'){
                            // sendResponse('set ok');
                            devtoolsAction.reload(sendResponse,{useCache:true});
                        }
                    }
                });
            }
        });
        return true;       
    },

    //reload page
    reload:function(sendResponse,reloadConfig){
        chrome.tabs.reload(contentData.tab.tabId,{bypassCache:reloadConfig.useCache},function(){
            checkExtensionError();

            reloadConfig.needResponse&&sendResponse('reloaded');
        });
        return true;
    }
};

chrome.tabs.onActivated.addListener(function(activeInfo) {
    contentData.tab=activeInfo;
    chrome.tabs.get(contentData.tab.tabId, function callback(tabInfo){
        checkExtensionError();

        contentData.tabURL=tabInfo.url;
    });
});