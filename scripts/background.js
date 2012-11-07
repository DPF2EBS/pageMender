var contentData={
    /*tabId:{
        domReady:Number,
        onload:Number,
        dataURL:String(URL),
        //domain:String(Domain),
        nodeTags:Object(JSON),
        nodeLength:Number,
    }*/
},

debugMode=true;
// localStorage.pageMenderDebug;



function saveContentData(tabId, data){
    if(typeof data==='undefined'||tabId.constructor!==Number){return;}

    var d;
    if(typeof contentData[tabId]!=='object'){
        contentData[tabId]={};
    };
    d=contentData[tabId];

    if(typeof data==='object'){
        for(var key in data){
            d[key]=data[key];
        }
    }

    if(debugMode&&data.domReadyTime){
        console.log('contentData:', 'tabId:', tabId,contentData);
    }
}

//check extension error
function checkExtensionError(){
    if (debugMode&&chrome.extension.lastError) {
        console.error('Error: ' + chrome.extension.lastError.message);
    }
}

/**communicate with other pages*/
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    //request from content script
    if(request.from==='contentscript'){
        //set windowId and tabURL
        request.data.windowId=sender.tab.windowId;
        request.data.tabURL=sender.tab.url;

        saveContentData(sender.tab.id, request.data);

        // sendResponse({from: "background"});

    //request from devtools             
    }else if(request.from==='devtools'){
        if(debugMode){
            console.log('data from devtools:', request);
        }

        //get tab info
        if(request.tabId&&!contentData[request.tabId]){
            chrome.tabs.get(request.tabId, function(tabInfo){
                if(debugMode){
                    console.log('chrome.tabs.get(tabId)===>',tabInfo);
                }

                contentData[request.tabId]={
                    tabURL:tabInfo.url,
                    windowId:tabInfo.windowId
                };
            });
        }        

        var returnBack;
        switch(request.action){
            case 'get':
                returnBack=devtoolsAction.getContent(sendResponse,request.getContent,request.tabId);
            break;
            case 'set':
                returnBack=devtoolsAction.setContent(sendResponse,request.settingsConfig);
            break;
            case 'clear':
                returnBack=devtoolsAction.clearContent(sendResponse,request.clearConfig,request.tabId);
            break;
            case 'open':
                returnBack=devtoolsAction.openURL(sendResponse,request.openConfig);
            break;
            case 'reload':
                returnBack=devtoolsAction.reload(sendResponse,request.reloadConfig,request.tabId);
            break;
            case 'contentSettings':
                returnBack=devtoolsAction.contentSet(sendResponse,request.settingsConfig,request.tabId);
            break;
            case 'ajax':
                returnBack=devtoolsAction.ajaxTest(sendResponse,request.ajaxConfig);
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
    getContent:function(sendResponse,arrayGet,tabId){
        if(arrayGet&&arrayGet[0]==='cookies'){
            chrome.cookies.getAll({url:contentData[tabId].tabURL}, function (cookies) {
                // console.log(cookies);
                sendResponse(cookies);
            });
            return true;
        }

        if(arrayGet&&arrayGet[0]==='proxy'){
            chrome.proxy.settings.get(
                {
                    'incognito' : false
                },
                function (config) {
                    sendResponse(config);
                    // console.log(config);
                }
            );
            return true;
        }

        if(arrayGet[0]==='nodeTags'&&!contentData[tabId].nodeTags){
            chrome.tabs.sendMessage(tabId, {from:'background',action:'get',getContent:['dom']}, function(response){
                // console.log('dom from cotent:',response);
                saveContentData(tabId, response.data);
                checkExtensionError();
            });
        }   
        
        if(typeof contentData[tabId]!=='object'){
            sendResponse({});
            return true;
        }

        var data={};
        arrayGet.forEach(function(element,index){
            data[element]=contentData[tabId][element];
        });     
        sendResponse(data);
    },

    //set content
    setContent:function(sendResponse,settingsConfig){
        switch(settingsConfig.target){
            case 'proxy':
                // console.log('proxySetting',settingsConfig.options);
                
                chrome.proxy.settings.set(
                    settingsConfig.options,
                    function() {
                        sendResponse({proxySetting:'success'});
                    }
                );
                return true;
            break;
        }
    },

    //clear cache
    clearContent:function(sendResponse,objConfig,tabId){
        switch(objConfig.type){
            case 'cache':
                chrome.browsingData.remove(objConfig.removeOptions,objConfig.removeData,function(){
                    checkExtensionError();
                    sendResponse('finished');         
                });
            break;
            case 'form':
                chrome.tabs.sendMessage(tabId, {from:'background',action:'clear',clearContent:objConfig.clearData}, function(response){                  
                    checkExtensionError();
                    // sendResponse('clear form message send');
                });
            break;
        }        
        return true;
    },

    //get ajax
    ajaxTest:function(sendResponse,ajaxConfig){
        var data='',timer;
        for(var key in ajaxConfig.data){
            data=data+'&'+key+'='+ajaxConfig.data[key];
        }

        if(ajaxConfig.method==='GET'&&data){
            ajaxConfig.url+=(ajaxConfig.url.indexOf('?')<0?'?':'')+data;
        }

        console.log(ajaxConfig, data);

        var xhr = new XMLHttpRequest();
        xhr.open(ajaxConfig.method, ajaxConfig.url, ajaxConfig.sync);

        if(ajaxConfig.method==='POST'){
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                clearTimeout(timer);

                // console.log(xhr);
                sendResponse(xhr.response);                
            }
        }

        xhr.onerror=function(){
            clearTimeout(timer);

            // console.log('error', xhr);
            sendResponse('加载失败[连接超时!]');
        }

        if(data&&ajaxConfig.method==='POST'){
            console.log(data);
            xhr.send(data);
        }else{
            xhr.send();
        }

        //set time out
        timer=setTimeout(function(){
            sendResponse('请求已取消[连接时间太长!]');
            xhr.abort();
        },5*1000);
        
        return true;
    },

    //open new tab
    openURL:function(sendResponse,objConfig){
        chrome.tabs.create(objConfig);
    },

    //contentSettings
    contentSet:function(sendResponse,settingsConfig,tabId){
        var settings={},
            method=settingsConfig.method,
            opt=settingsConfig.options,
            lastElement=settingsConfig.type.length-1;

        if(contentData[tabId]&&contentData[tabId].tabURL){
            if(method==='get'){
                opt.primaryUrl=contentData[tabId].tabURL;
            }          
        }

        // console.log(settingsConfig,opt.primaryUrl);
        settingsConfig.type.forEach(function(element,index){
            //styleSheets
            if(element==='styleSheets'){
                if(method==='get'){
                    settings[element]={setting:'allow'};
                }else if(method==='set'){
                    chrome.tabs.sendMessage(tabId, {from:'background',action:'disable',value:opt.setting==='block'?true:false}, function(response){
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
    reload:function(sendResponse,reloadConfig,tabId){
        chrome.tabs.reload(tabId,{bypassCache:reloadConfig.useCache},function(){
            checkExtensionError();

            reloadConfig.needResponse&&sendResponse('reloaded');
        });
        return true;
    }
};

//tab page update
/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    //tab.id and tab.windowId will not change
    contentData.tabURL=tab.url;
});

//tab page active
chrome.tabs.onActivated.addListener(function(activeInfo) {
    contentData.tab=activeInfo;
    chrome.tabs.get(contentData.tab.tabId, function callback(tabInfo){
        checkExtensionError();

        contentData.tabURL=tabInfo.url;
    });
});*/

//tab page remove
chrome.tabs.onRemoved.addListener(function(tabId,removeInfo) {
    //remove contentData tab info
    delete contentData[tabId];
});

//window foucs changed
/*chrome.windows.onFocusChanged.addListener(function(windowId) {
    console.log(windowId);
});*/